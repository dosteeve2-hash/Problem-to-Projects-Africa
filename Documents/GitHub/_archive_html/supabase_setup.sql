-- ============================================
-- MIFA LIFE — SUPABASE SETUP COMPLET
-- Copiez dans Supabase > SQL Editor > Run
-- ============================================

-- 1. Ajouter image_url si pas encore fait
ALTER TABLE products
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2. Ajouter created_at si pas encore fait
ALTER TABLE products
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Activer RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 4. Lecture publique (tout le monde peut voir les produits)
DROP POLICY IF EXISTS "Lecture publique" ON products;
CREATE POLICY "Lecture publique"
ON products FOR SELECT
USING (true);

-- 5. Écriture bloquée par défaut via clé anon
-- (INSERT/UPDATE/DELETE sont bloqués sans policy explicite)

-- 6. Bucket Storage pour les images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Lecture publique des images
DROP POLICY IF EXISTS "Lecture publique images" ON storage.objects;
CREATE POLICY "Lecture publique images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- 8. Upload autorisé
DROP POLICY IF EXISTS "Upload autorisé" ON storage.objects;
CREATE POLICY "Upload autorisé"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- Vérification
SELECT tablename, policyname, cmd FROM pg_policies WHERE tablename = 'products';
