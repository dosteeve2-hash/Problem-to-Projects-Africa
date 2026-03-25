import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import AddToCartButton from '@/components/AddToCartButton';

type Product = {
  id: number;
  name: string;
  price_cfa: number;
  image_url: string | null;
  created_at: string;
};

export default async function HomePage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, price_cfa, image_url, created_at')
    .order('created_at', { ascending: false });

  if (error) console.error('Erreur Supabase:', error.message);

  return (
    <main className="home-main">
      <section className="home-hero">
        <p className="home-hero-sub">Produits disponibles</p>
        <h1 className="home-hero-title">Notre catalogue</h1>
        <div className="mali-bar">
          <span style={{ background: 'var(--mg)' }} />
          <span style={{ background: 'var(--my)' }} />
          <span style={{ background: 'var(--mr)' }} />
        </div>
      </section>

      {!products || products.length === 0 ? (
        <div className="home-empty">
          <p>Aucun produit pour l&apos;instant.</p>
          <Link href="/add-product" className="btn-add-first">
            Ajouter le premier produit
          </Link>
        </div>
      ) : (
        <section className="products-grid">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat('fr-FR').format(product.price_cfa);

  return (
    <article className="product-card">
      <Link href={`/produit/${product.id}`} className="product-card-link">
        <div className="product-card-img">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="product-card-img-placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>
        <div className="product-card-body">
          <h2 className="product-card-name">{product.name}</h2>
          <p className="product-card-price">
            {formattedPrice} <span className="product-card-currency">FCFA</span>
          </p>
        </div>
      </Link>
      <div className="product-card-footer">
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
