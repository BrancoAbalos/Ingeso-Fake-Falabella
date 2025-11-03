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
  return (
    <BrowserRouter>
      <div className="app">
        <header className="headerArriba">
          <div className="left-area">
            <LogoPanel />
          </div>

          <div className="search-wrap">
            <input className="searchBarra" placeholder="Buscar productos, marcas o categorías..." />
          </div>

          <div className="right-area">
            <Link to="/checkout" aria-label="Checkout" className='text-white'><CartIcon size={28} /></Link>
            <Link to="/settings" aria-label="Settings" className='text-white'><SettingsIcon size={28} /></Link>
          </div>
        </header>

        <main className="content">
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
