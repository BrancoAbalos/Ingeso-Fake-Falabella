import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen flex items-start justify-center pt-20 bg-gray-200">
      
      {/* Caja princial */}
      <div className="bg-[#8B6E5F] w-full max-w-4xl px-8 py-10 rounded-3xl shadow-lg flex flex-col items-center text-center">
        
        {/* Icono */}
        <div className="mb-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-16 h-16 text-gray-800 opacity-80"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-white mb-8 tracking-wide">
          Bienvenid@
        </h2>

        <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8 text-left">
          
          {/* Formularios */}
          <input 
            type="text" 
            placeholder="Nombre" 
            className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input 
            type="text" 
            placeholder="Apellidos" 
            className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <input 
            type="password" 
            placeholder="Contraseña" 
            className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input 
            type="password" 
            placeholder="Confirmar contraseña" 
            className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <input 
            type="text" 
            placeholder="Nombre de usuario" 
            className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input 
            type="email" 
            placeholder="Correo" 
            className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <input 
            type="text" 
            placeholder="Dirección" 
            className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input 
            type="tel" 
            placeholder="Celular" 
            className="w-full px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </form>

        <button className="bg-[#2D2D2D] hover:bg-black text-white px-12 py-3 rounded-full mb-6 transition-colors duration-300 shadow-md font-semibold text-lg">
          Registrarse
        </button>

        <div className="text-white text-sm">
          <p className="opacity-90">Ya tienes una cuenta?</p>
          <Link to="/login" className="underline hover:text-gray-200 font-bold mt-1 inline-block">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}