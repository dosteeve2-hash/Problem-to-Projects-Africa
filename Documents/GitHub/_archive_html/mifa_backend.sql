-- ============================================================
-- MIFA LIFE — BACKEND SÉCURISÉ
-- Script complet à exécuter dans Supabase > SQL Editor
-- Ordre d'exécution : de haut en bas, une seule fois
-- ============================================================


-- ============================================================
-- PARTIE 1 : TABLE PROFILES (11 fondateurs)
-- ============================================================

-- Table profiles liée à Supabase Auth (auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  full_name   TEXT,
  role        TEXT NOT NULL DEFAULT 'viewer'
                CHECK (role IN ('admin', 'founder', 'viewer')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour accélérer les lookups par rôle
CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles(role);

-- Trigger : crée automatiquement un profil à chaque inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger : met à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS sur profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Chaque utilisateur voit uniquement son propre profil
CREATE POLICY "Utilisateur voit son propre profil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Chaque utilisateur modifie uniquement son propre profil
CREATE POLICY "Utilisateur modifie son propre profil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Les admins voient tous les profils
CREATE POLICY "Admin voit tous les profils"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'founder')
    )
  );


-- ============================================================
-- PARTIE 2 : TABLE PRODUCTS — COLONNES + RLS
-- ============================================================

-- Ajouter les colonnes manquantes si nécessaires
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS image_url    TEXT,
  ADD COLUMN IF NOT EXISTS stock        INTEGER NOT NULL DEFAULT 0
                                          CHECK (stock >= 0),
  ADD COLUMN IF NOT EXISTS category     TEXT,
  ADD COLUMN IF NOT EXISTS description  TEXT,
  ADD COLUMN IF NOT EXISTS active       BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_by   UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS created_at   TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at   TIMESTAMPTZ DEFAULT NOW();

-- Index utiles
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products(category);
CREATE INDEX IF NOT EXISTS products_active_idx   ON public.products(active);
CREATE INDEX IF NOT EXISTS products_stock_idx    ON public.products(stock);

-- Trigger updated_at sur products
DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Activer RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "Lecture publique" ON public.products;
DROP POLICY IF EXISTS "Admin insert"     ON public.products;
DROP POLICY IF EXISTS "Admin update"     ON public.products;
DROP POLICY IF EXISTS "Admin delete"     ON public.products;

-- LECTURE : tout le monde voit les produits actifs
CREATE POLICY "Lecture publique"
  ON public.products FOR SELECT
  USING (active = true);

-- Les admins voient aussi les produits inactifs
CREATE POLICY "Admin voit tout"
  ON public.products FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'founder')
    )
  );

-- INSERTION : uniquement admin/founder
CREATE POLICY "Admin insert"
  ON public.products FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'founder')
    )
  );

-- MODIFICATION : uniquement admin/founder
CREATE POLICY "Admin update"
  ON public.products FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'founder')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'founder')
    )
  );

-- SUPPRESSION : uniquement admin
CREATE POLICY "Admin delete"
  ON public.products FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );


-- ============================================================
-- PARTIE 3 : TABLE ORDERS (commandes)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.orders (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id),
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  total_cfa   INTEGER NOT NULL CHECK (total_cfa >= 0),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id  INTEGER NOT NULL REFERENCES public.products(id),
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  price_cfa   INTEGER NOT NULL CHECK (price_cfa >= 0),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS order_items_order_idx   ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS order_items_product_idx ON public.order_items(product_id);

-- RLS orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Utilisateur voit ses commandes"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin voit toutes les commandes"
  ON public.orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'founder')
    )
  );

CREATE POLICY "Utilisateur crée ses commandes"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin modifie les commandes"
  ON public.orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'founder')
    )
  );

CREATE POLICY "Utilisateur voit ses items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admin voit tous les items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'founder')
    )
  );


-- ============================================================
-- PARTIE 4 : FONCTION DÉCRÉMENTATION STOCK (atomique)
-- ============================================================

-- Fonction appelée par la Server Action — exécution atomique
-- Empêche les race conditions sur le stock
CREATE OR REPLACE FUNCTION public.decrement_stock(
  p_product_id INTEGER,
  p_quantity   INTEGER
)
RETURNS TABLE (
  success     BOOLEAN,
  new_stock   INTEGER,
  error_msg   TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_stock INTEGER;
  v_product_name  TEXT;
BEGIN
  -- Verrouiller la ligne pour éviter les race conditions
  SELECT stock, name
  INTO v_current_stock, v_product_name
  FROM public.products
  WHERE id = p_product_id
  FOR UPDATE;

  -- Produit inexistant
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 0, 'Produit introuvable (id: ' || p_product_id || ')';
    RETURN;
  END IF;

  -- Stock insuffisant
  IF v_current_stock < p_quantity THEN
    RETURN QUERY SELECT
      false,
      v_current_stock,
      'Stock insuffisant pour "' || v_product_name || '" : ' ||
      v_current_stock || ' disponible(s), ' || p_quantity || ' demandé(s)';
    RETURN;
  END IF;

  -- Stock épuisé
  IF v_current_stock = 0 THEN
    RETURN QUERY SELECT
      false,
      0,
      '"' || v_product_name || '" est en rupture de stock';
    RETURN;
  END IF;

  -- Mise à jour du stock
  UPDATE public.products
  SET
    stock      = stock - p_quantity,
    updated_at = NOW()
  WHERE id = p_product_id;

  RETURN QUERY SELECT true, (v_current_stock - p_quantity)::INTEGER, NULL::TEXT;
END;
$$;


-- ============================================================
-- PARTIE 5 : STORAGE — bucket product-images
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5 Mo max
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit     = 5242880,
  allowed_mime_types  = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Lecture publique
DROP POLICY IF EXISTS "Lecture publique images" ON storage.objects;
CREATE POLICY "Lecture publique images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Upload : uniquement admin/founder authentifiés
DROP POLICY IF EXISTS "Admin upload images" ON storage.objects;
CREATE POLICY "Admin upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'founder')
    )
  );

-- Suppression : uniquement admin
DROP POLICY IF EXISTS "Admin delete images" ON storage.objects;
CREATE POLICY "Admin delete images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );


-- ============================================================
-- PARTIE 6 : DASHBOARD ANALYTICS
-- ============================================================

-- Vue : chiffre d'affaires potentiel par catégorie
CREATE OR REPLACE VIEW public.analytics_revenue AS
SELECT
  COALESCE(category, 'Non catégorisé')          AS category,
  COUNT(*)                                        AS product_count,
  SUM(stock)                                      AS total_stock,
  SUM(price_cfa * stock)                          AS revenue_potential_cfa,
  AVG(price_cfa)::INTEGER                         AS avg_price_cfa,
  MIN(price_cfa)                                  AS min_price_cfa,
  MAX(price_cfa)                                  AS max_price_cfa
FROM public.products
WHERE active = true
GROUP BY category
ORDER BY revenue_potential_cfa DESC;

-- Vue globale (une seule ligne)
CREATE OR REPLACE VIEW public.analytics_summary AS
SELECT
  COUNT(*)                          AS total_products,
  COUNT(*) FILTER (WHERE stock > 0) AS products_in_stock,
  COUNT(*) FILTER (WHERE stock = 0) AS products_out_of_stock,
  SUM(stock)                        AS total_units,
  SUM(price_cfa * stock)            AS total_revenue_potential_cfa,
  AVG(price_cfa)::INTEGER           AS avg_price_cfa
FROM public.products
WHERE active = true;


-- ============================================================
-- PARTIE 7 : DROITS DES 11 FONDATEURS
-- ============================================================
-- À exécuter APRÈS que chaque fondateur se soit inscrit.
-- Remplacez les emails par les vrais emails de votre équipe.

-- Exemple : promouvoir un utilisateur en admin
-- UPDATE public.profiles SET role = 'admin'   WHERE email = 'fondateur1@example.com';
-- UPDATE public.profiles SET role = 'founder' WHERE email = 'fondateur2@example.com';
-- UPDATE public.profiles SET role = 'founder' WHERE email = 'fondateur3@example.com';
-- ... (répéter pour les 11 fondateurs)


-- ============================================================
-- VÉRIFICATION FINALE
-- ============================================================

SELECT tablename, policyname, cmd, qual
FROM pg_policies
WHERE tablename IN ('products', 'profiles', 'orders', 'order_items')
ORDER BY tablename, cmd;
