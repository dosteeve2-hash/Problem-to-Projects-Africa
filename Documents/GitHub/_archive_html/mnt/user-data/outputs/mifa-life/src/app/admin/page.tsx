'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface Product {
  id: number;
  name: string;
  price_cfa: number;
  created_at: string;
}

type SortOrder = 'desc' | 'asc';

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingPrice, setEditingPrice] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [saveError, setSaveError] = useState<string | null>(null);

  const SECRET_CODE = 'Mifa2026';

  // Vérifier si déjà autorisé via sessionStorage
  useEffect(() => {
    const auth = sessionStorage.getItem('mifa_admin');
    if (auth === 'true') {
      setAuthorized(true);
      fetchProducts();
    }
    setChecking(false);
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    const diff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    return sortOrder === 'desc' ? -diff : diff;
  });

  const checkPassword = () => {
    if (password === SECRET_CODE) {
      sessionStorage.setItem('mifa_admin', 'true');
      setAuthorized(true);
      fetchProducts();
    } else {
      alert('Code incorrect !');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('mifa_admin');
    setAuthorized(false);
    setProducts([]);
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('id, name, price_cfa, created_at')
      .order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  const deleteProduct = async (id: number) => {
    if (!confirm('Supprimer ce produit définitivement ?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchProducts();
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditingPrice(String(product.price_cfa));
    setSaveError(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingPrice('');
    setSaveError(null);
  };

  const savePrice = async (id: number) => {
    const newPrice = parseInt(editingPrice, 10);
    if (isNaN(newPrice) || newPrice <= 0) {
      setSaveError('Prix invalide.');
      return;
    }
    const { error } = await supabase
      .from('products').update({ price_cfa: newPrice }).eq('id', id);
    if (error) { setSaveError(error.message); return; }
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price_cfa: newPrice } : p))
    );
    cancelEditing();
  };

  if (checking) return null;

  // ── CONNEXION ──
  if (!authorized) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="mali-bar" style={{ marginBottom: '1.5rem' }}>
            <span style={{ background: 'var(--mg)' }} />
            <span style={{ background: 'var(--my)' }} />
            <span style={{ background: 'var(--mr)' }} />
          </div>
          <h2 className="admin-login-title">Accès Administrateur</h2>
          <p className="admin-login-sub">Mifa Life · Fondateurs uniquement</p>
          <div className="form-field" style={{ marginBottom: '1rem' }}>
            <label className="form-label" htmlFor="admin-pass">Code secret</label>
            <input
              id="admin-pass" type="password" placeholder="••••••••"
              className="form-input" value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
            />
          </div>
          <button className="btn-submit" style={{ width: '100%' }} onClick={checkPassword}>
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  // ── TABLEAU ──
  return (
    <div className="admin-main">
      <div className="admin-header">
        <div>
          <div className="mali-bar" style={{ marginBottom: '0.75rem' }}>
            <span style={{ background: 'var(--mg)' }} />
            <span style={{ background: 'var(--my)' }} />
            <span style={{ background: 'var(--mr)' }} />
          </div>
          <h1 className="admin-title">Gestion des produits</h1>
          <p className="admin-sub">{products.length} produit{products.length > 1 ? 's' : ''}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a href="/add-product" className="btn-add-first">+ Ajouter</a>
          <button onClick={logout} className="admin-btn admin-btn-delete">Déconnexion</button>
        </div>
      </div>

      {saveError && <div className="form-error" style={{ marginBottom: '1rem' }}>{saveError}</div>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom du produit</th>
              <th>Prix</th>
              <th>
                <button className="admin-sort-btn" onClick={() => setSortOrder(s => s === 'desc' ? 'asc' : 'desc')}>
                  Date d&apos;ajout
                  <span className="admin-sort-icon">{sortOrder === 'desc' ? '↓' : '↑'}</span>
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((p) => (
              <tr key={p.id}>
                <td className="admin-td-name">{p.name}</td>
                <td className="admin-td-price">
                  {editingId === p.id ? (
                    <div className="admin-edit-price-wrap">
                      <input
                        type="number" className="form-input admin-price-input"
                        value={editingPrice} onChange={(e) => setEditingPrice(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') savePrice(p.id); if (e.key === 'Escape') cancelEditing(); }}
                        autoFocus min="1"
                      />
                      <span style={{ fontSize: '0.75rem', color: 'var(--t4)', fontWeight: 700 }}>FCFA</span>
                    </div>
                  ) : (
                    <span className="admin-price">
                      {new Intl.NumberFormat('fr-FR').format(p.price_cfa)} FCFA
                    </span>
                  )}
                </td>
                <td className="admin-td-date">
                  <span className="admin-date">
                    {new Date(p.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="admin-time">
                    {new Date(p.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </td>
                <td className="admin-td-actions">
                  {editingId === p.id ? (
                    <>
                      <button className="admin-btn admin-btn-save" onClick={() => savePrice(p.id)}>✓ Sauvegarder</button>
                      <button className="admin-btn admin-btn-cancel" onClick={cancelEditing}>Annuler</button>
                    </>
                  ) : (
                    <>
                      <button className="admin-btn admin-btn-edit" onClick={() => startEditing(p)}>✎ Modifier</button>
                      <button className="admin-btn admin-btn-delete" onClick={() => deleteProduct(p.id)}>Supprimer</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="admin-empty">
                  Aucun produit. <a href="/add-product">Ajouter le premier</a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
