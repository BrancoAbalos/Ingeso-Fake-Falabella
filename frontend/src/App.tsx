import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, Settings, Search, X, ChevronRight } from 'lucide-react';

// Importaciones
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import SettingsPage from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/Product';
import LogoPanel from './components/LogoPanel';
import Payment from './pages/Payment';
import { ROUTES } from './utils/constants';

// Tipos compartidos
export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Agrega producto completo (intenta persistir en backend)
  const handleAddToCart = async (product: Product) => {
    const API_BASE = ((import.meta as any).env?.VITE_API_BASE as string) || 'http://localhost:3001'
    try {
      // Call backend to add to cart (quantity 1)
      const res = await fetch(`${API_BASE}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      })

      if (!res.ok) {
        // fallback to local behavior
        setCart((prevCart) => {
          const exists = prevCart.find((item) => item.product.id === product.id);
          if (exists) {
            return prevCart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prevCart, { product, quantity: 1 }];
        });
        return
      }

      const data = await res.json()
      // data.item: { product, quantity }
      const added = data.item
      if (added && added.product) {
        setCart((prev) => {
          const exists = prev.find(i => i.product.id === added.product.id)
          if (exists) {
            return prev.map(i => i.product.id === added.product.id ? { ...i, quantity: added.quantity } : i)
          }
          return [...prev, { product: added.product, quantity: added.quantity }]
        })
      }
    } catch (e) {
      // network or other error: fallback to local
      setCart((prevCart) => {
        const exists = prevCart.find((item) => item.product.id === product.id);
        if (exists) {
          return prevCart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { product, quantity: 1 }];
      });
    }
  };

  const handleRemoveOne = async (id: string) => {
    const API_BASE = ((import.meta as any).env?.VITE_API_BASE as string) || 'http://localhost:3001'
    try {
      const res = await fetch(`${API_BASE}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, quantity: -1 })
      })

      if (res.ok) {
        const data = await res.json()
        const item = data.item
        setCart((prev) => {
          if (!item || !item.product) {
            // if backend returned no item, remove locally
            return prev.filter(i => i.product.id !== id)
          }
          const qty = Number(item.quantity || 0)
          if (qty <= 0) return prev.filter(i => i.product.id !== id)
          return prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i)
        })
        return
      }
    } catch (e) {
      // fallback to local
    }

    // Local fallback
    setCart((prev) => prev.map(item => item.product.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(i => i.quantity > 0));
  };

  const handleAddOne = async (id: string) => {
    const API_BASE = ((import.meta as any).env?.VITE_API_BASE as string) || 'http://localhost:3001'
    try {
      const res = await fetch(`${API_BASE}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, quantity: 1 })
      })

      if (res.ok) {
        const data = await res.json()
        const item = data.item
        setCart((prev) => {
          if (!item || !item.product) return prev
          const qty = Number(item.quantity || 0)
          const exists = prev.find(i => i.product.id === item.product.id)
          if (exists) {
            return prev.map(i => i.product.id === item.product.id ? { ...i, quantity: qty } : i)
          }
          return [...prev, { product: item.product, quantity: qty }]
        })
        return
      }
    } catch (e) {
      // fallback local
    }

    setCart((prev) => prev.map(item => item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleClearCart = async () => {
    const API_BASE = ((import.meta as any).env?.VITE_API_BASE as string) || 'http://localhost:3001'
    let deletedOnServer = false
    try {
      const res = await fetch(`${API_BASE}/api/cart`, { method: 'DELETE' })
      deletedOnServer = res.ok
    } catch (e) {
      deletedOnServer = false
    }

    if (!deletedOnServer) {
      // fallback: send negative deltas for each item to ensure server removes them
      await Promise.all(cart.map(async (item) => {
        try {
          await fetch(`${API_BASE}/api/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: item.product.id, quantity: -Math.max(1, item.quantity) })
          })
        } catch (e) {
          // ignore individual failures
        }
      }))
    }

    // Clear local state regardless
    setCart([])
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Añadir por id + cantidad (usado por Product page)
  const addToCartById = async (productId: string, quantity: number = 1) => {
    const API_BASE = ((import.meta as any).env?.VITE_API_BASE as string) || 'http://localhost:3001'

    // Intento persistir en backend
    try {
      const res = await fetch(`${API_BASE}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
      })

      if (res.ok) {
        const data = await res.json()
        const added = data.item
        if (added && added.product) {
          setCart((prev) => {
            const exists = prev.find(i => i.product.id === added.product.id)
            if (exists) {
              return prev.map(i => i.product.id === added.product.id ? { ...i, quantity: added.quantity } : i)
            }
            return [...prev, { product: added.product, quantity: added.quantity }]
          })
          return
        }
      }
    } catch (err) {
      // si falla, continuamos al fallback local
    }

    // Fallback: intentar obtener producto desde API o desde el JSON local
    let product: Product | null = null
    try {
      const pRes = await fetch(`${API_BASE}/api/products/${productId}`)
      if (pRes.ok) {
        const pd = await pRes.json()
        const prod = pd.product
        if (prod) product = { id: prod.id, name: prod.name ?? prod.title ?? 'Producto', price: prod.price ?? 0, img: prod.img ?? prod.image ?? '' }
      }
    } catch (e) {
      // ignore
    }

    if (!product) {
      try {
        const local = await fetch('/products.json')
        if (local.ok) {
          const localData = await local.json()
          const found = (localData.products || []).find((p: any) => String(p.id) === String(productId))
          if (found) product = { id: found.id, name: found.name || found.title || 'Producto', price: found.price || 0, img: found.img || found.image || '' }
        }
      } catch (e) {
        // no-op
      }
    }

    if (!product) return

    // Actualizar carrito local
    setCart((prev) => {
      const exists = prev.find(i => i.product.id === product!.id)
      if (exists) {
        return prev.map(i => i.product.id === product!.id ? { ...i, quantity: i.quantity + quantity } : i)
      }
      return [...prev, { product: product!, quantity }]
    })
  }


  return (
    <BrowserRouter>
      <div className="app min-h-screen bg-gray-200 font-sans print:bg-white">
        <header className="bg-[#3E2723] text-white p-4 shadow-lg flex justify-between items-center sticky top-0 z-50 print:hidden">
          <Link to={ROUTES.HOME} onClick={() => setSearchTerm("")}><LogoPanel /></Link>
          <div className="hidden md:block flex-1 max-w-xl mx-4 relative">
              <input 
                className="w-full pl-10 pr-4 py-2.5 rounded-full text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                placeholder="Buscar licores, cervezas..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center gap-4">
            <Link to={ROUTES.CHECKOUT} className="relative p-2 hover:bg-white/10 rounded-full">
              <ShoppingCart className='w-6 h-6' />
                <span className={`absolute top-0 right-0 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm ${cartCount > 0 ? 'bg-red-500 animate-bounce' : 'bg-gray-500 opacity-70'}`}>
                {cartCount}
                </span>            
              </Link>
            <div className="relative" ref={menuRef}>
                <button onClick={() => setOpen(!open)} className="p-2 hover:bg-white/10 rounded-full">
                  {open ? <X className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
                </button>
                {open && (
                    <div className="absolute right-0 top-full mt-3 bg-white rounded-2xl shadow-xl py-2 w-56 z-50 text-gray-800 overflow-hidden">
                      <Link to={ROUTES.LOGIN} onClick={() => setOpen(false)} className="px-6 py-3 hover:bg-gray-50 flex items-center justify-between"><span>Login</span><ChevronRight size={16}/></Link>
                      <Link to={ROUTES.SETTINGS} onClick={() => setOpen(false)} className="px-6 py-3 hover:bg-gray-50 flex items-center justify-between"><span>Config</span><Settings size={16}/></Link>
                    </div>
                )}
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} searchTerm={searchTerm} />} /> 
            <Route path="/checkout" element={<Checkout cart={cart} onAddOne={handleAddOne} onRemoveOne={handleRemoveOne} onClear={handleClearCart} />} />
            <Route path="/payment" element={<Payment cart={cart} onClear={handleClearCart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCartById} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}