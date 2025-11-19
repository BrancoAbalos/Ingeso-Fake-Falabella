import React from 'react'
import { products } from '../seed/products'
import ProductCard from '../components/ProductCard'

type HomeProps = {
  onAddToCart: () => void
  onRemoveFromCart: () => void
}

export default function Home({ onAddToCart, onRemoveFromCart }: HomeProps) {
  return (
    <div>
      <h1>Tienda demo</h1>
      <div className="grid">
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={onAddToCart}
            onRemove={onRemoveFromCart}
          />
        ))}
      </div>
    </div>
  )
}
