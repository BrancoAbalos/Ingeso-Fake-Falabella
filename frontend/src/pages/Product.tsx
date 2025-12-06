import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { formatCurrency } from '../utils/format'
import QuantitySelector from '../components/ui/QuantitySelector'

type ProductType = { id: string; title?: string; name?: string; price: number; img?: string; description?: string; isFeatured?: boolean }

type ProductProps = {
  onAddToCart?: (productId: string, count?: number) => void
}

export default function Product({ onAddToCart }: ProductProps){
  const { id } = useParams<{id: string}>()
  const [product, setProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [featured, setFeatured] = useState<ProductType[]>([])
  const [quantity, setQuantity] = useState<number>(0)

  useEffect(() => {
    let mounted = true
    const API_BASE = ((import.meta as any).env?.VITE_API_BASE as string) || 'http://localhost:3001'

    fetch(`${API_BASE}/api/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found')
        return r.json()
      })
      .then((data) => {
        if (!mounted) return
        const prod = (data && data.product) ? data.product as ProductType : null
        if (prod) {
          setProduct(prod)
          // load other featured products via products list
          fetch(`${API_BASE}/api/products`).then(r => r.json()).then(d => {
            if (!mounted) return
            const all: ProductType[] = d.products || []
            const featuredList = all.filter((p) => p.isFeatured && String(p.id) !== String(id))
            setFeatured(featuredList)
          }).catch(() => {})
        } else {
          // fallback to local file
          fetch('/products.json').then(r => r.json()).then((data) => {
            if (!mounted) return
            const all: ProductType[] = data.products || []
            const found = all.find(p => String(p.id) === String(id))
            if (found) setProduct(found)
            else setProduct(null)
            const featuredList = all.filter((p) => p.isFeatured && String(p.id) !== String(id))
            setFeatured(featuredList)
          }).catch(err => { if (mounted) setError(String(err)) })
        }
      })
      .catch(() => {
        // backend request failed -> fallback to local
        fetch('/products.json')
          .then(r => r.json())
          .then((data) => {
            if (!mounted) return
            const all: ProductType[] = data.products || []
            const found = all.find(p => String(p.id) === String(id))
            if (found) setProduct(found)
            else setProduct(null)
            const featuredList = all.filter((p) => p.isFeatured && String(p.id) !== String(id))
            setFeatured(featuredList)
          })
          .catch((err) => { if (!mounted) return; setError(String(err)) })
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [id])

  if (loading) return <div>Cargando producto...</div>
  if (error) return <div className="text-red-600">Error: {error}</div>
  if (!product) return <div>Producto no encontrado</div>

  return (
    <div className="product-page max-w-screen-2xl mx-auto bg-white/5 p-6 rounded-lg shadow-md text-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* recomendaciones del lado izquierdo left left  */}
        <aside className="hidden md:block">
          <div className="bg-white/6 p-4 rounded-2xl shadow-lg border border-white/5 sticky top-24">
            <h3 className="text-gray-700 font-bold mb-4">Recomendados</h3>
            <div className="flex flex-col gap-4">
              {featured.length === 0 && <div className="text-gray-500 text-sm">No hay recomendaciones</div>}
              {featured.map(f => (
                <Link key={f.id} to={`/product/${f.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 bg-white/10 rounded-md flex items-center justify-center overflow-hidden">
                    <img src={f.img} alt={f.name ?? f.title} className="object-contain h-full" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{f.name ?? f.title}</div>
                    <div className="text-xs text-gray-500">{formatCurrency(f.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* producto main*/}
        <div className="md:col-span-2">
          <div className="flex items-center justify-center bg-white/10 rounded-lg p-4 mb-6">
            {product.img ? (
              <img src={product.img} alt={product.name ?? product.title} className="max-h-96 object-contain" />
            ) : (
              <div className="w-full h-64 bg-gray-200" />
            )}
          </div>

          <div>
            <h2 className='text-2xl font-bold mb-3'>{product.title ?? product.name}</h2>
            <p className='text-xl text-gray-800 font-semibold mb-4'>{formatCurrency(product.price)}</p>
            {product.description && (
              <div className='mb-6'>
                <h3 className='font-semibold mb-2'>Descripción</h3>
                <p className='text-gray-700 mb-4'>{product.description}</p>
              </div>
            )}

            <div className="flex items-center gap-3">
              <QuantitySelector value={quantity} onChange={(n) => setQuantity(n)} />
              <button onClick={(e) => {
                e.preventDefault();
                if (!product) return
                const qty = Number(quantity ?? 0)
                if (qty <= 0) return // don't add when quantity is 0
                onAddToCart && onAddToCart(product.id, qty)
              }} className="bg-[#2D2D2D] hover:bg-black text-white text-sm font-medium py-2 px-4 rounded-full shadow-lg transition-all active:scale-95">
                + Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}