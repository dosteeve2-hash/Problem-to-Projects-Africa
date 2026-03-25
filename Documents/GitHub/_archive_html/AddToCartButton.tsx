'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

type Product = {
  id: number;
  name: string;
  price_cfa: number;
  image_url: string | null;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      className="btn-buy"
      onClick={handleAdd}
      style={{
        background: added ? '#007a2e' : undefined,
        transition: 'background 0.2s ease',
      }}
    >
      {added ? '✓ Ajouté !' : 'Ajouter au panier'}
    </button>
  );
}
