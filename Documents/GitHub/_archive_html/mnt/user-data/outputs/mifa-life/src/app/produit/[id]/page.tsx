import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AddToCartButton from '@/components/AddToCartButton';

type Product = {
  id: number;
  name: string;
  price_cfa: number;
  image_url: string | null;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabase
    .from('products')
    .select('name, price_cfa')
    .eq('id', id)
    .single();
  if (!data) return { title: 'Produit introuvable — Mifa Life' };
  return {
    title: `${data.name} — Mifa Life`,
    description: `${data.name} pour ${new Intl.NumberFormat('fr-FR').format(data.price_cfa)} FCFA.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: product, error } = await supabase
    .from('products')
    .select('id, name, price_cfa, image_url')
    .eq('id', id)
    .single();

  if (error || !product) notFound();

  const formattedPrice = new Intl.NumberFormat('fr-FR').format((product as Product).price_cfa);

  return (
    <main className="product-page-main">
      <Link href="/" className="product-back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Retour au catalogue
      </Link>

      <div className="product-page-layout">
        <div className="product-page-img-wrap">
          {(product as Product).image_url ? (
            <Image
              src={(product as Product).image_url!}
              alt={(product as Product).name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', borderRadius: '14px' }}
            />
          ) : (
            <div className="product-page-img-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>Aucune image</span>
            </div>
          )}
        </div>

        <div className="product-page-info">
          <div className="mali-bar" style={{ marginBottom: '1.25rem' }}>
            <span style={{ background: 'var(--mg)' }} />
            <span style={{ background: 'var(--my)' }} />
            <span style={{ background: 'var(--mr)' }} />
          </div>

          <h1 className="product-page-name">{(product as Product).name}</h1>

          <div className="product-page-price-row">
            <span className="product-page-price">{formattedPrice}</span>
            <span className="product-page-currency">FCFA</span>
          </div>

          <div className="product-page-shipping">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="1" y="3" width="15" height="13" />
              <path d="M16 8h4l3 5v4h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            Livraison estimée : 7 – 14 jours
          </div>

          <div className="product-page-pay-row">
            <span className="product-page-pay-label">Paiement :</span>
            <div className="product-page-pay-chips">
              <span className="pay-chip" style={{ background: '#FF6600' }}>Orange Money</span>
              <span className="pay-chip" style={{ background: '#00AAFF' }}>Wave</span>
              <span className="pay-chip" style={{ background: '#0099CC' }}>Moov</span>
            </div>
          </div>

          <div className="product-page-divider" />

          <div className="product-page-actions">
            <AddToCartButton product={product as Product} />
          </div>

          <div className="product-page-guarantee">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--mg)" strokeWidth="1.8">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Paiement sécurisé — remboursé si non conforme
          </div>
        </div>
      </div>
    </main>
  );
}
