import React from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../seed/products'
import { formatCurrency } from '../utils/format'

export default function Product(){
  const { id } = useParams<{id: string}>()
  const product = products.find(p => p.id === id)

  if(!product) return <div>Producto no encontrado</div>

  return (
    <div className="product-page bg-[#000152] p-6 rounded-lg shadow-md">
      <h2 className='text-white'>{product.title}</h2>
      <p className='text-white'>{formatCurrency(product.price)}</p>
    </div>
  )
}
