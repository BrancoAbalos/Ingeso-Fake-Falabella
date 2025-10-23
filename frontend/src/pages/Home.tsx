import React from 'react'
import { products } from '../seed/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
  return (
    <div>
      <h1>Tienda demo</h1>
      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
