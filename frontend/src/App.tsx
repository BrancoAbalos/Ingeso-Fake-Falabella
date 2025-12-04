import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import SettingRoute from './pages/Settings'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import LogoPanel from './components/LogoPanel'
import { RESOURCES, ROUTES } from './utils/constants';
import { ShoppingCart, Settings, User, Search, Menu, X, ChevronRight } from 'lucide-react';

export default function App() {
  const [cartCount, setCartCount] = React.useState(0)

  const handleAddToCart = React.useCallback((productId: string, n = 1) => {
    const qty = Number.isFinite(Number(n)) ? Number(n) : 1
    if (qty <= 0) return
    setCartCount(count => count + qty)
  }, [])

  const handleRemoveFromCart = React.useCallback(() => {
    setCartCount(count => (count > 0 ? count - 1 : 0))
  }, [])

  const [open, setOpen] = useState(false);

  //Referencia para el contenedor del menú
  const menuRef = useRef<HTMLDivElement>(null);
  //Efecto para detectar clicks fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <BrowserRouter>
      <div className="app min-h-screen bg-gray-200 font-sans selection:bg-yellow-200">
        
        {/* HEADER */}
        <header className="headerArriba bg-[#3E2723] text-white p-4 shadow-lg flex justify-between items-center sticky top-0 z-50 border-b border-white/10">
          <div className="left-area hover:opacity-80 transition-opacity">
            <Link to={ROUTES.HOME}><LogoPanel /></Link>
          </div>
          
          <div className="search-wrap flex-1 max-w-xl mx-4 hidden md:block group">
            <div className="relative">
              <input 
                className="w-full pl-10 pr-4 py-2.5 rounded-full text-gray-800 bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all" 
                placeholder="Buscar licores, cervezas..." 
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 group-focus-within:text-yellow-600" />
            </div>
          </div>

          <div className="right-area flex items-center gap-4 md:gap-6"> 
            
            <Link to={ROUTES.CHECKOUT} title="Checkout" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
              <ShoppingCart className='w-6 h-6' />
              <span className={`absolute top-0 right-0 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm ${cartCount > 0 ? 'bg-red-500 animate-bounce' : 'bg-gray-500 opacity-70'}`}>
                {cartCount}
              </span>
            </Link>

            {/* Menu Dropdown */}
            <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setOpen(!open)}
                  className={`p-2 rounded-full transition-all duration-200 ${open ? 'bg-white text-[#3E2723] rotate-90' : 'hover:bg-white/10 text-white'}`}
                  title="Configuración"
                >
                  {open ? <X className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
                </button>

                {open && (
                    <div className="absolute right-0 top-full mt-3 bg-white rounded-2xl shadow-2xl py-2 w-56 z-50 overflow-hidden border border-gray-100 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-3 border-b border-gray-100 mb-1">
                        <p className="text-xs font-bold text-gray-400 uppercase">Mi Cuenta</p>
                      </div>
                      
                      <Link
                        to={ROUTES.LOGIN}
                        className="w-full px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#3E2723] flex items-center justify-between group transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <span className="font-medium text-gray-900">Iniciar Sesión</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#3E2723]" />
                      </Link>
                      
                      <Link
                        to={ROUTES.SETTINGS}
                        className="w-full px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#3E2723] flex items-center justify-between group transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <span className="font-medium text-gray-900">Configuración</span>
                        <Settings className="w-4 h-4 text-gray-300 group-hover:text-[#3E2723]" />
                      </Link>

                      <div className="px-4 py-2 mt-1 border-t border-gray-100 bg-gray-50">
                        <p className="text-[10px] text-center text-gray-400">Versión del papu</p>
                      </div>
                    </div>
                  )}
            </div>
          </div>
        </header>

        <main className="content">
          <Routes>
            <Route path="/settings" element={<SettingRoute />} />
            <Route path="/" element={<Home onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />} />
            <Route path="/product/:id" element={<Product onAddToCart={handleAddToCart} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
