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
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Agrega producto completo
  const handleAddToCart = (product: Product) => {
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
  };

  const handleRemoveOne = (id: string) => {
    setCart((prev) => prev.map(item => item.product.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(i => i.quantity > 0));
  };

  const handleAddOne = (id: string) => {
    setCart((prev) => prev.map(item => item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleClearCart = () => setCart([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <BrowserRouter>
      <div className="app min-h-screen bg-gray-200 font-sans">
        <header className="bg-[#3E2723] text-white p-4 shadow-lg flex justify-between items-center sticky top-0 z-50">
          <Link to={ROUTES.HOME}><LogoPanel /></Link>
          <div className="hidden md:block flex-1 max-w-xl mx-4 relative">
            <input className="w-full pl-10 pr-4 py-2.5 rounded-full text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Buscar..." />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center gap-4">
            <Link to={ROUTES.CHECKOUT} title="Checkout" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
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
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} onAddOne={handleAddOne} onRemoveOne={handleRemoveOne} onClear={handleClearCart} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}