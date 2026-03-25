'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="nv">
      <Link href="/" className="logo-text">
        MIFA LIFE
        <span className="logo-tag">Marketplace · Mali</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/catalogue" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--t3)' }}>
          Catalogue
        </Link>

        <Link href="/panier" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--t2)" strokeWidth="1.8">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'var(--mr)',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '0.6875rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {totalItems}
            </span>
          )}
        </Link>

        <Link href="/auth" className="btn-buy" style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
          Connexion
        </Link>
      </div>
    </nav>
  );
}
