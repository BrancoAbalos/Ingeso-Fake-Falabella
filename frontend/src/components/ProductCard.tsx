import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../types'
import { formatCurrency } from '../utils/format'
import Button from './ui/Button'

export default function ProductCard({ product }: { product: Product }){
  return (
    <div className="card">
      <div className="product-thumb" title={product.title}>
        {product.image ? (
          <img
            className="product-img"
            src={product.image}
            alt={product.title}
            loading="lazy"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              console.warn('Image failed to load (kept src):', img.src)
              img.style.opacity = '0'
              img.dataset.fallback = '1'
            }}
            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', backgroundColor: '#eee', border: '4px solid rgba(255,255,255,0.85)' }}
          />
        ) : (
          <img className="product-img" src="/placeholder.svg" alt="placeholder" style={{ width: 120, height: 120, borderRadius: '50%', backgroundColor: '#eee', border: '4px solid rgba(255,255,255,0.85)' }} />
        )}
      </div>
      <p className="price">{formatCurrency(product.price)}</p>
      <div className="actions">
        <Link to={`/product/${product.id}`}>
          <Button variant="secondary">Ver</Button>
        </Link>
      </div>
    </div>
  )
}
