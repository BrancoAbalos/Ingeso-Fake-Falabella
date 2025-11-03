import React, {useState} from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Settings from './pages/Settings'
import Home from './pages/Home'
import LogoPanel from './components/LogoPanel'
import SettingsIcon from './components/icons/SettingsIcon'
import CartIcon from './components/icons/CartIcon'
import { FiSettings } from 'react-icons/fi';
import { RESOURCES, ROUTES } from './utils/constants';

export default function App() {
  const [open, setOpen] = useState(false);
  const SettingComponent = RESOURCES.SettingIcon;
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
            {/*Icono de settings*/}
            <SettingComponent
              id="showInfo"
              onClick={() => setOpen(!open)}
              className="w-8 h-8 cursor-pointer hover:shadow-lg transition-shadow duration-200 text-white"
              title="Configuracion"
            />
            {/*Dropdown*/}
            {open && (
                <div className="absolute right-0 top-12 bg-white rounded-md shadow-lg py-2 w-40 z-50">
                  <Link
                    to={ROUTES.LOGIN}
                    className="w-full text-left px-4 py-2 text-red-700 hover:bg-gray-100 block"
                  >
                    <p className ='text-gray-900'> Login</p>
                  </Link>
                  <Link
                    to={ROUTES.SETTINGS}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 block"
                  >
                    <p className ='text-gray-900'> Settings</p>
                  </Link>
                </div>
              )}
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
