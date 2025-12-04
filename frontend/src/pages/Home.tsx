import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type TopPick = { id: string; name: string; productId?: string; img: string; label?: string }
type Product = { id: string; name?: string; title?: string; price: number; img: string; isFeatured?: boolean }

// Load products from static mock JSON served in /public
const useMockProducts = () => {
  const [topPicks, setTopPicks] = useState<TopPick[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    fetch('/products.json')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        const loadedProducts: Product[] = data.products || []
        // If the JSON provides explicit topPicks, use them; otherwise derive featured items from products.isFeatured
        if (data.topPicks && Array.isArray(data.topPicks) && data.topPicks.length > 0) {
          setTopPicks(data.topPicks)
        } else {
          // Derive topPicks from products with isFeatured flag
          const derived: TopPick[] = (loadedProducts.filter((p: Product) => p.isFeatured) as Product[])
            .map((p) => ({ id: p.id, name: p.name ?? p.title ?? '', productId: p.id, img: p.img }))
          setTopPicks(derived)
        }
        setProducts(loadedProducts)
      })
      .catch((err) => {
        if (!mounted) return
        setError(String(err))
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  return { topPicks, products, loading, error }
}

interface HomeProps {
  onAddToCart: (productId: string, count?: number) => void;
  onRemoveFromCart: () => void;
}

export default function Home({ onAddToCart }: HomeProps) {
  const { topPicks, products, loading, error } = useMockProducts()

  return (
    <div className="w-full pb-20 fade-in">
      <section className="py-5 px-4">
        <h2 className="text-gray-900 font-bold text-lg mb-6 ml-4 md:ml-12 uppercase tracking-wide opacity-90">Destacados</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {topPicks.map((item) => {
            // Prefer explicit productId mapping; fallback to name/title match for compatibility
            let matched = null as Product | null
            if (item.productId) matched = products.find(p => p.id === item.productId) || null
            if (!matched) matched = products.find(p => (p.name && p.name === item.name) || (p.title && p.title === item.name)) || null
            const content = (
              <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${'bg-gray-400'} shadow-inner flex items-center justify-center relative overflow-visible mb-4 ring-4 ring-white`}>
                  <img src={item.img} alt={item.name} className="h-40 md:h-52 object-contain -mt-8 drop-shadow-2xl transition-all group-hover:-mt-12 filter hover:brightness-110" />
                  {item.label && <span className="absolute top-0 right-0 bg-yellow-400 text-black font-bold px-2 py-1 rounded-full text-xs shadow-md border-2 border-white">{item.label}</span>}
                </div>
              </div>
            )

            return matched ? (
              <Link key={item.id} to={`/product/${matched.id}`}>{content}</Link>
            ) : (
              <div key={item.id}>{content}</div>
            )
          })}
        </div>
      </section>

      <section className="bg-gray-400 backdrop-blur-md mx-4 md:mx-12 rounded-3xl p-6 md:p-8 shadow-inner">
        <h2 className="text-gray-700 font-bold text-2xl mb-6 drop-shadow-sm">Catálogo</h2>

        {loading && <div className="text-center">Cargando productos...</div>}
        {error && <div className="text-center text-red-600">Error cargando productos: {error}</div>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((prod) => (
            <Link key={prod.id} to={`/product/${prod.id}`} className="group">
              <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/80 transition-all duration-300 flex flex-col items-center text-center shadow-sm hover:shadow-xl relative">
                <div className="h-32 w-full flex items-center justify-center mb-3">
                  <img src={prod.img} alt={prod.name ?? prod.title} className="h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{prod.name ?? prod.title}</h3>
                <p className="text-lg text-gray-900 font-bold mb-3">{prod.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); onAddToCart(prod.id, 1) }} className="bg-[#2D2D2D] hover:bg-black text-white text-xs md:text-sm font-medium py-2 px-4 rounded-full shadow-lg transition-all active:scale-95 w-full flex items-center justify-center gap-2">
                  <span>+</span> Añadir
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
