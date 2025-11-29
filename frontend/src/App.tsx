import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Settings from './pages/Settings'
import Login from './pages/Login';
import Home from './pages/Home'
import LogoPanel from './components/LogoPanel'
import { RESOURCES, ROUTES } from './utils/constants';

export default function App() {
  const [cartCount, setCartCount] = React.useState(0)

  const handleAddToCart = React.useCallback(() => {
    setCartCount(count => count + 1)
  }, [])

  const handleRemoveFromCart = React.useCallback(() => {
    setCartCount(count => (count > 0 ? count - 1 : 0))
  }, [])

  const [open, setOpen] = useState(false);
  const SettingComponent = RESOURCES.SettingIcon;
  const ShoppingCart = RESOURCES.ShoppingCart;

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
      <div className="app">
        <header className="headerArriba">
          <div className="left-area">
            <LogoPanel />
          </div>
          <div className="search-wrap">
            <input className="searchBarra" placeholder="Buscar productos..." />
          </div>

          <div className="right-area flex items-center gap-4"> 
            
            <Link to={ROUTES.CHECKOUT} title="Checkout">
              <ShoppingCart
                  id="view cart"
                  className='w-8 h-8 cursor-pointer hover:shadow-lg transition-shadow duration-200 text-white'
                />
            </Link>

            <div className="relative" ref={menuRef}>
                
                {/* Icono de settings */}
                <SettingComponent
                  id="showInfo"
                  onClick={() => setOpen(!open)}
                  className="w-8 h-8 cursor-pointer hover:shadow-lg transition-shadow duration-200 text-white"
                  title="Config"
                />

                {/* Dropdown */}
                {open && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-md shadow-lg py-2 w-40 z-50 border border-gray-200">
                      <Link
                        to={ROUTES.LOGIN}
                        className="w-full text-left px-4 py-2 text-red-700 hover:bg-gray-100 block"
                        onClick={() => setOpen(false)}
                      >
                        <p className ='text-gray-900'> Login</p>
                      </Link>
                      <Link
                        to={ROUTES.SETTINGS}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 block"
                        onClick={() => setOpen(false)}
                      >
                        <p className ='text-gray-900'> Settings</p>
                      </Link>
                    </div>
                  )}
            </div>
          </div>
        </header>

        <main className="content">
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Home onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
