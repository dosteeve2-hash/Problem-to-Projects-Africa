'use server';

import { createServerSupabaseClient } from '@/lib/supabase';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type AnalyticsSummary = {
  totalProducts:         number;
  productsInStock:       number;
  productsOutOfStock:    number;
  totalUnits:            number;
  totalRevenuePotential: number; // en FCFA
  avgPriceCfa:           number;
};

export type CategoryRevenue = {
  category:             string;
  productCount:         number;
  totalStock:           number;
  revenuePotentialCfa:  number;
  avgPriceCfa:          number;
  minPriceCfa:          number;
  maxPriceCfa:          number;
};

export type DashboardData = {
  summary:    AnalyticsSummary;
  byCategory: CategoryRevenue[];
  topProducts: {
    id:        number;
    name:      string;
    stock:     number;
    priceCfa:  number;
    potential: number;
  }[];
};

// ─────────────────────────────────────────────
// SERVER ACTION : Données du dashboard
// ─────────────────────────────────────────────

export async function getDashboardData(): Promise<DashboardData | null> {
  const supabase = await createServerSupabaseClient();

  // Vérification admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || !['admin', 'founder'].includes(profile.role)) return null;

  // 1. Résumé global via la vue SQL
  const { data: summaryData } = await supabase
    .from('analytics_summary')
    .select('*')
    .single();

  // 2. Répartition par catégorie
  const { data: categoryData } = await supabase
    .from('analytics_revenue')
    .select('*');

  // 3. Top 5 produits par valeur potentielle
  const { data: topProductsData } = await supabase
    .from('products')
    .select('id, name, stock, price_cfa')
    .eq('active', true)
    .gt('stock', 0)
    .order('price_cfa', { ascending: false })
    .limit(5);

  if (!summaryData || !categoryData || !topProductsData) return null;

  return {
    summary: {
      totalProducts:         summaryData.total_products         ?? 0,
      productsInStock:       summaryData.products_in_stock      ?? 0,
      productsOutOfStock:    summaryData.products_out_of_stock  ?? 0,
      totalUnits:            summaryData.total_units            ?? 0,
      totalRevenuePotential: summaryData.total_revenue_potential_cfa ?? 0,
      avgPriceCfa:           summaryData.avg_price_cfa          ?? 0,
    },
    byCategory: categoryData.map((c) => ({
      category:            c.category,
      productCount:        c.product_count,
      totalStock:          c.total_stock,
      revenuePotentialCfa: c.revenue_potential_cfa,
      avgPriceCfa:         c.avg_price_cfa,
      minPriceCfa:         c.min_price_cfa,
      maxPriceCfa:         c.max_price_cfa,
    })),
    topProducts: topProductsData.map((p) => ({
      id:        p.id,
      name:      p.name,
      stock:     p.stock,
      priceCfa:  p.price_cfa,
      potential: p.price_cfa * p.stock,
    })),
  };
}

// ─────────────────────────────────────────────
// REQUÊTES SQL DIRECTES (référence)
-- Ces requêtes peuvent être copiées dans Supabase SQL Editor
-- pour des analyses ponctuelles.
-- ─────────────────────────────────────────────

/*

-- 1. Chiffre d'affaires potentiel total
SELECT
  SUM(price_cfa * stock) AS revenue_potential_cfa,
  SUM(stock)             AS total_units,
  COUNT(*)               AS total_products
FROM products
WHERE active = true;


-- 2. Par catégorie
SELECT
  COALESCE(category, 'Non catégorisé') AS category,
  COUNT(*)                              AS products,
  SUM(stock)                            AS units,
  SUM(price_cfa * stock)                AS potential_cfa
FROM products
WHERE active = true
GROUP BY category
ORDER BY potential_cfa DESC;


-- 3. Produits en rupture de stock
SELECT id, name, price_cfa, category
FROM products
WHERE stock = 0 AND active = true
ORDER BY name;


-- 4. Top 10 produits par valeur potentielle
SELECT
  name,
  price_cfa,
  stock,
  (price_cfa * stock) AS potential_cfa
FROM products
WHERE active = true AND stock > 0
ORDER BY potential_cfa DESC
LIMIT 10;


-- 5. Commandes par statut
SELECT
  status,
  COUNT(*)           AS count,
  SUM(total_cfa)     AS revenue_cfa
FROM orders
GROUP BY status
ORDER BY count DESC;

*/
