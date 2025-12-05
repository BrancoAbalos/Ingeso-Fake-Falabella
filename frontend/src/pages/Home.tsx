import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product as AppProduct } from '../App';

// Json
type TopPick = { id: string; name: string; productId?: string; img: string; label?: string }
type JsonProduct = { id: string; name?: string; title?: string; price: number; img: string; isFeatured?: boolean; description?: string }

// Cargar papu datos
const useMockProducts = () => {
  const [topPicks, setTopPicks] = useState<TopPick[]>([])
  const [products, setProducts] = useState<JsonProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    fetch('/products.json')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        const loadedProducts: JsonProduct[] = data.products || []
        
        if (data.topPicks && Array.isArray(data.topPicks) && data.topPicks.length > 0) {
          setTopPicks(data.topPicks)
        } else {
          // Si no hay topPicks explícitos, derivamos de los destacados
          const derived: TopPick[] = (loadedProducts.filter((p: JsonProduct) => p.isFeatured))
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
  onAddToCart: (product: AppProduct) => void;
}

export default function Home({ onAddToCart }: HomeProps) {
  const { topPicks, products, loading, error } = useMockProducts()

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
      
      {/* SECCIÓN DESTACADOS */}
      <section className="py-8 px-4">
        <h2 className="text-gray-900 font-bold text-lg mb-6 ml-4 md:ml-12 uppercase tracking-wide opacity-90">Destacados</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {topPicks.map((item) => {
            // producto real
            let matched = products.find(p => p.id === item.productId) || products.find(p => (p.name === item.name) || (p.title === item.name));
            
            const content = (
              <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-400 shadow-inner flex items-center justify-center relative overflow-visible mb-4 ring-4 ring-white`}>
                  <img src={item.img} alt={item.name} className="h-40 md:h-52 object-contain -mt-8 drop-shadow-2xl transition-all group-hover:-mt-12 filter hover:brightness-110" />
                  {item.label && <span className="absolute top-0 right-0 bg-yellow-400 text-black font-bold px-2 py-1 rounded-full text-xs shadow-md border-2 border-white">{item.label}</span>}
                </div>
              </div>
            );

            return matched ? (
              <Link key={item.id} to={`/product/${matched.id}`}>{content}</Link>
            ) : (
              <div key={item.id}>{content}</div>
            );
          })}
        </div>
      </section>

      {/* SECCIÓN CATÁLOGO */}
      <section className="bg-gray-400/30 backdrop-blur-md mx-4 md:mx-12 rounded-3xl p-6 md:p-8 shadow-inner mt-4">
        <h2 className="text-gray-700 font-bold text-2xl mb-6 drop-shadow-sm">Catálogo</h2>

        {loading && <div className="text-center py-10 font-bold text-gray-600">Cargando productos...</div>}
        {error && <div className="text-center text-red-600 py-10">Error cargando productos: {error}</div>}

        {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((prod) => (
                <Link key={prod.id} to={`/product/${prod.id}`} className="group">
                <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/80 transition-all duration-300 flex flex-col items-center text-center shadow-sm hover:shadow-xl relative h-full">
                    <div className="h-32 w-full flex items-center justify-center mb-3">
                    <img src={prod.img} alt={prod.name ?? prod.title} className="h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 min-h-[40px] flex items-center justify-center line-clamp-2">
                        {prod.name ?? prod.title}
                    </h3>
                    <p className="text-lg text-gray-900 font-bold mb-3">{prod.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                    <button 
                        onClick={(e) => handleAddClick(e, prod)} 
                        className="mt-auto bg-[#2D2D2D] hover:bg-black text-white text-xs md:text-sm font-medium py-2 px-4 rounded-full shadow-lg transition-all active:scale-95 w-full flex items-center justify-center gap-2"
                    >
                    <span>+</span> Añadir
                    </button>
                </div>
                </Link>
            ))}
            </div>
        )}
      </section>
    </div>
  );
}