import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Settings from './pages/Settings'
import Home from './pages/Home'
import LogoPanel from './components/LogoPanel'
import SettingsIcon from './components/icons/SettingsIcon'
import CartIcon from './components/icons/CartIcon'

export default function App() {
  const [cartCount, setCartCount] = React.useState(0)

  const handleAddToCart = React.useCallback(() => {
    setCartCount(count => count + 1)
  }, [])

  const handleRemoveFromCart = React.useCallback(() => {
    setCartCount(count => (count > 0 ? count - 1 : 0))
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <div className="left-area">
            <LogoPanel />
          </div>

          <div className="search-wrap">
            <input className="search" placeholder="Buscar productos, marcas o categorías..." />
          </div>

          <div className="right-area">
            <Link to="/checkout" aria-label="Checkout"><CartIcon size={28} count={cartCount} /></Link>
            <Link to="/settings" aria-label="Settings"><SettingsIcon size={28} /></Link>
          </div>
        </header>

        <main className="content">
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Home onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
