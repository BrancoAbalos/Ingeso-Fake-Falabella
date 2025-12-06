import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product as AppProduct } from '../App';

// Json
type TopPick = { id: string; name: string; productId?: string; img: string; label?: string }
type JsonProduct = { id: string; name?: string; title?: string; price: number; img: string; isFeatured?: boolean; description?: string; categoria?: string }

// Cargar papu datos
const useMockProducts = () => {
  const [topPicks, setTopPicks] = useState<TopPick[]>([])
  const [products, setProducts] = useState<JsonProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const API_BASE = ((import.meta as any).env?.VITE_API_BASE as string) || 'http://localhost:3001'

    ;(async () => {
      try {
        // Try backend
        const res = await fetch(`${API_BASE}/api/products`)
        if (res.ok) {
          const data = await res.json()
          if (!mounted) return
          const prods: JsonProduct[] = data.products || []
          if (data.topPicks && Array.isArray(data.topPicks) && data.topPicks.length > 0) {
            setTopPicks(data.topPicks)
          } else {
            const derived: TopPick[] = prods.filter((p) => p.isFeatured).map((p) => ({ id: p.id, name: p.name ?? p.title ?? '', productId: p.id, img: p.img }))
            setTopPicks(derived)
          }
          setProducts(prods)
          return
        }

        // Fallback to local file
        const local = await fetch('/products.json')
        const localData = await local.json()
        if (!mounted) return
        const prodsLocal: JsonProduct[] = localData.products || []
        if (localData.topPicks && Array.isArray(localData.topPicks) && localData.topPicks.length > 0) {
          setTopPicks(localData.topPicks)
        } else {
          const derived: TopPick[] = prodsLocal.filter((p) => p.isFeatured).map((p) => ({ id: p.id, name: p.name ?? p.title ?? '', productId: p.id, img: p.img }))
          setTopPicks(derived)
        }
        setProducts(prodsLocal)
      } catch (err) {
        if (!mounted) return
        setError(String(err))
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => { mounted = false }
  }, [])

  return { topPicks, products, loading, error }
}


interface HomeProps {
  onAddToCart: (product: AppProduct) => void;
  searchTerm: string;
}

export default function Home({ onAddToCart, searchTerm }: HomeProps) {
  const { topPicks, products, loading, error } = useMockProducts()

  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')

  // derive categories from products
  const categories = React.useMemo(() => {
    const set = new Set<string>()
    products.forEach(p => { if (p.categoria) set.add(p.categoria) })
    return Array.from(set)
  }, [products])

  const filteredProducts = products
    .filter(product => product.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => selectedCategory === 'all' ? true : (product.categoria ?? '').toLowerCase() === selectedCategory.toLowerCase())

  // Función para normalizar y agregar al carrito
  const handleAddClick = (e: React.MouseEvent, item: JsonProduct) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Json a objeto de la app
    const productToSend: AppProduct = {
        id: item.id,
        name: item.name || item.title || 'Producto sin nombre',
        price: item.price,
        img: item.img
    };

    onAddToCart(productToSend);
  };

    return (
    <div className="w-full pb-20 fade-in">
      {/* Solo mostramos destacados si NO hay búsqueda activa */}
      {!searchTerm && (
        <section className="py-8 px-4">
          <h2 className="text-gray-900 font-bold text-lg mb-6 ml-4 md:ml-12 uppercase tracking-wide opacity-90">Destacados</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {topPicks.map((item) => {
              let matched = products.find(p => p.id === item.productId) || products.find(p => p.name === item.name)
              if (!matched) return null;
              return (
                <Link key={item.id} to={`/product/${matched.id}`} className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-400 shadow-inner flex items-center justify-center relative overflow-visible mb-4 ring-4 ring-white">
                    <img src={item.img} alt={item.name} className="h-40 md:h-52 object-contain -mt-8 drop-shadow-2xl transition-all group-hover:-mt-12 filter hover:brightness-110" />
                    {item.label && <span className="absolute top-0 right-0 bg-yellow-400 text-black font-bold px-2 py-1 rounded-full text-xs shadow-md border-2 border-white">{item.label}</span>}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <section className="bg-gray-400/30 backdrop-blur-md mx-4 md:mx-12 rounded-3xl p-6 md:p-8 shadow-inner mt-4">
        <h2 className="text-gray-700 font-bold text-2xl mb-6 drop-shadow-sm">
            {searchTerm ? `Resultados de "${searchTerm}"` : 'Catálogo'}
        </h2>
        {/* Category filters */}
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <button onClick={() => setSelectedCategory('all')} className={`px-3 py-1 rounded-full ${selectedCategory === 'all' ? 'bg-[#3E2723] text-white' : 'bg-white/50 text-gray-800'}`}>Todos</button>
          {categories.map((c) => (
            <button key={c} onClick={() => setSelectedCategory(c)} className={`px-3 py-1 rounded-full ${selectedCategory === c ? 'bg-[#3E2723] text-white' : 'bg-white/50 text-gray-800'}`}>
              {c}
            </button>
          ))}
          {selectedCategory !== 'all' && (
            <button onClick={() => setSelectedCategory('all')} className="ml-2 text-sm text-gray-600 underline">Limpiar</button>
          )}
        </div>
        
        {loading && <div className="text-center py-10 font-bold text-gray-600">Cargando productos...</div>}
        {error && <div className="text-center text-red-600 py-10">{error}</div>}
        
        {/* Mensaje de no encontrado */}
        {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-10 text-gray-500">
                <p>No se encontraron productos.</p>
            </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts.map((prod) => (
            <Link key={prod.id} to={`/product/${prod.id}`} className="group">
              <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/80 transition-all duration-300 flex flex-col items-center text-center shadow-sm hover:shadow-xl relative h-full">
                <div className="h-32 w-full flex items-center justify-center mb-3">
                  <img src={prod.img} alt={prod.name} className="h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1 min-h-[40px] flex items-center justify-center line-clamp-2">{prod.name}</h3>
                <p className="text-lg text-gray-900 font-bold mb-3">{prod.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                <button onClick={(e) => handleAddClick(e, prod)} className="mt-auto bg-[#2D2D2D] hover:bg-black text-white text-xs md:text-sm font-medium py-2 px-4 rounded-full shadow-lg transition-all active:scale-95 w-full flex items-center justify-center gap-2">
                  <span>+</span> Añadir
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}