'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Image trop lourde — maximum 5 Mo.');
      return;
    }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) { setError('Le nom est requis.'); return; }
    const priceNum = parseInt(price, 10);
    if (isNaN(priceNum) || priceNum <= 0) { setError('Le prix doit être un nombre positif.'); return; }

    setLoading(true);

    try {
      let image_url: string | null = null;

      if (imageFile) {
        const ext = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, imageFile, { upsert: false });
        if (uploadError) throw new Error(`Upload : ${uploadError.message}`);
        const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
        image_url = urlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from('products')
        .insert({ name: name.trim(), price_cfa: priceNum, image_url });

      if (insertError) throw new Error(insertError.message);

      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="add-product-main">
      <div className="add-product-card">
        <div className="add-product-header">
          <div className="mali-bar">
            <span style={{ background: 'var(--mg)' }} />
            <span style={{ background: 'var(--my)' }} />
            <span style={{ background: 'var(--mr)' }} />
          </div>
          <h1 className="add-product-title">Ajouter un produit</h1>
        </div>

        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-field">
            <label htmlFor="name" className="form-label">
              Nom du produit <span className="form-required">*</span>
            </label>
            <input
              id="name" type="text" value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex : Casque Bluetooth" className="form-input" disabled={loading}
            />
          </div>

          <div className="form-field">
            <label htmlFor="price" className="form-label">
              Prix <span className="form-required">*</span>
            </label>
            <div className="form-input-suffix-wrap">
              <input
                id="price" type="number" value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="15000" min="1"
                className="form-input form-input-suffix" disabled={loading}
              />
              <span className="form-suffix">FCFA</span>
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Photo du produit</label>
            <label className="upload-zone" htmlFor="image-upload">
              {preview ? (
                <div className="upload-preview">
                  <Image src={preview} alt="Aperçu" fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
                  <div className="upload-preview-overlay">Changer la photo</div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="upload-placeholder-text">Cliquer pour choisir</span>
                  <span className="upload-placeholder-sub">JPG, PNG, WebP — max 5 Mo</span>
                </div>
              )}
            </label>
            <input id="image-upload" type="file" accept="image/*"
              onChange={handleImageChange} style={{ display: 'none' }} disabled={loading} />
          </div>

          {error && <div className="form-error" role="alert">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={() => router.back()} className="btn-cancel" disabled={loading}>
              Annuler
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                <><span className="btn-spinner" />Enregistrement…</>
              ) : 'Ajouter le produit'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
