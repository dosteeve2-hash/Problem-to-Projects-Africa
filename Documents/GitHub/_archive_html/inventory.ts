'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/supabase';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type ActionResult<T = null> =
  | { success: true;  data: T;     error?: never }
  | { success: false; data?: never; error: string };

export type StockUpdateResult = {
  productId:   number;
  productName: string;
  newStock:    number;
};

export type CartItem = {
  productId: number;
  quantity:  number;
};

// ─────────────────────────────────────────────
// 1. DÉCRÉMENTATION STOCK APRÈS UNE VENTE
// ─────────────────────────────────────────────

/**
 * Décrémente le stock d'un produit après achat.
 * Utilise une fonction SQL atomique pour éviter les race conditions.
 */
export async function decrementStock(
  productId: number,
  quantity: number = 1
): Promise<ActionResult<StockUpdateResult>> {
  // Validation des entrées
  if (!Number.isInteger(productId) || productId <= 0) {
    return { success: false, error: 'ID produit invalide.' };
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return { success: false, error: 'La quantité doit être un entier positif.' };
  }

  const supabase = await createServerSupabaseClient();

  // Vérifier que l'utilisateur est connecté
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: 'Vous devez être connecté pour effectuer un achat.' };
  }

  // Appel à la fonction SQL atomique (définie dans mifa_backend.sql)
  const { data, error } = await supabase
    .rpc('decrement_stock', {
      p_product_id: productId,
      p_quantity:   quantity,
    });

  if (error) {
    console.error('[decrementStock] Erreur RPC:', error);
    return { success: false, error: 'Erreur serveur lors de la mise à jour du stock.' };
  }

  const result = data?.[0];

  if (!result?.success) {
    return { success: false, error: result?.error_msg ?? 'Erreur inconnue.' };
  }

  // Rafraîchir les pages qui affichent ce produit
  revalidatePath('/');
  revalidatePath(`/produit/${productId}`);
  revalidatePath('/admin');

  return {
    success: true,
    data: {
      productId,
      productName: '',
      newStock: result.new_stock,
    },
  };
}

// ─────────────────────────────────────────────
// 2. TRAITEMENT D'UNE COMMANDE COMPLÈTE
// ─────────────────────────────────────────────

/**
 * Traite une commande : crée la commande + décrémente le stock
 * de chaque article dans une transaction logique.
 */
export async function processOrder(
  items: CartItem[],
  totalCfa: number
): Promise<ActionResult<{ orderId: string }>> {
  if (!items.length) {
    return { success: false, error: 'Le panier est vide.' };
  }
  if (totalCfa <= 0) {
    return { success: false, error: 'Total de commande invalide.' };
  }

  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: 'Vous devez être connecté pour commander.' };
  }

  // Étape 1 : Vérifier le stock de tous les articles AVANT de créer la commande
  const stockChecks = await Promise.all(
    items.map(async (item) => {
      const { data } = await supabase
        .from('products')
        .select('id, name, stock')
        .eq('id', item.productId)
        .single();
      return { item, product: data };
    })
  );

  // Identifier les articles en rupture
  const outOfStock = stockChecks.filter(
    ({ item, product }) => !product || product.stock < item.quantity
  );

  if (outOfStock.length > 0) {
    const names = outOfStock
      .map(({ product, item }) =>
        product
          ? `"${product.name}" (stock: ${product.stock}, demandé: ${item.quantity})`
          : `Produit ID ${item.productId} introuvable`
      )
      .join(', ');
    return {
      success: false,
      error: `Stock insuffisant pour : ${names}`,
    };
  }

  // Étape 2 : Créer la commande
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({ user_id: user.id, total_cfa: totalCfa, status: 'confirmed' })
    .select('id')
    .single();

  if (orderError || !order) {
    console.error('[processOrder] Erreur création commande:', orderError);
    return { success: false, error: 'Impossible de créer la commande.' };
  }

  // Étape 3 : Insérer les lignes de commande
  const orderItems = stockChecks.map(({ item, product }) => ({
    order_id:   order.id,
    product_id: item.productId,
    quantity:   item.quantity,
    price_cfa:  product!.price_cfa,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('[processOrder] Erreur insertion items:', itemsError);
    // Annuler la commande si les items n'ont pas pu être insérés
    await supabase.from('orders').delete().eq('id', order.id);
    return { success: false, error: 'Erreur lors de l\'enregistrement des articles.' };
  }

  // Étape 4 : Décrémenter le stock de chaque article
  const stockUpdates = await Promise.all(
    items.map((item) => decrementStock(item.productId, item.quantity))
  );

  const failedUpdates = stockUpdates.filter((r) => !r.success);
  if (failedUpdates.length > 0) {
    console.error('[processOrder] Certains stocks n\'ont pas pu être mis à jour:', failedUpdates);
    // La commande est créée mais on logue l'erreur pour correction manuelle
  }

  revalidatePath('/');
  revalidatePath('/admin');

  return { success: true, data: { orderId: order.id } };
}

// ─────────────────────────────────────────────
// 3. MISE À JOUR MANUELLE DU STOCK (Admin)
// ─────────────────────────────────────────────

/**
 * Permet à un admin de corriger manuellement le stock d'un produit.
 */
export async function setStock(
  productId: number,
  newStock: number
): Promise<ActionResult<{ newStock: number }>> {
  if (newStock < 0) {
    return { success: false, error: 'Le stock ne peut pas être négatif.' };
  }

  const supabase = await createServerSupabaseClient();

  // Vérifier que l'utilisateur est admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: 'Non authentifié.' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || !['admin', 'founder'].includes(profile.role)) {
    return { success: false, error: 'Accès refusé — réservé aux administrateurs.' };
  }

  const { error } = await supabase
    .from('products')
    .update({ stock: newStock, updated_at: new Date().toISOString() })
    .eq('id', productId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath(`/produit/${productId}`);

  return { success: true, data: { newStock } };
}
