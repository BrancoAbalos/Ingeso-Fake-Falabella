import React from 'react'
import { products } from '../seed/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
  return (
    
    <div>
      <section className="mb-8">
        <div className="w-full h-64 rounded-xl bg-brand-navy flex items-center justify-center text-brand-gold text-xl font-semibold">
          Destacados (próximamente)
        </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-square rounded-lg bg-white shadow flex items-center justify-center text-sm text-slate-500">
              Slot {i}
            </div>
          ))}
        </div>
      </section>

      <h1 className='font-bold text-2xl'>Categorías</h1>
      <br/>
      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
