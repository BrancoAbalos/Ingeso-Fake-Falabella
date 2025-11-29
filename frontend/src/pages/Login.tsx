import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    // Contenedor principal
    <div className="min-h-screen flex items-start justify-center pt-20 bg-gray-200">
      
      {/* Tarjeta de Login */}
      <div className="bg-[#8B6E5F] w-full max-w-sm px-8 py-8 rounded-3xl shadow-lg flex flex-col items-center text-center">
        
        {/* Icono de Usuario */}
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

        {/* Título */}
        <h2 className="text-3xl font-bold text-white mb-8 tracking-wide">
          Bienvenid@
        </h2>

        {/* Formulario */}
        <form className="w-full flex flex-col gap-5 mb-8">
          <input 
            type="text" 
            placeholder="Nombre de usuario" 
            className="w-full px-4 py-2.5 rounded-3xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="w-full px-4 py-2.5 rounded-3xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </form>

        {/* Botón Ingresar */}
        <button className="bg-[#2D2D2D] hover:bg-black text-white px-10 py-2 rounded-full mb-8 transition-colors duration-300 shadow-md">
          Ingresar
        </button>

        {/* Links de pie de página */}
        <div className="text-white text-sm space-y-4">
          <div>
            <p className="opacity-90">Nuevo aquí?</p>
            <Link to="/register" className="underline hover:text-gray-200 font-medium">
              Registrarse
            </Link>
          </div>
          
          <div className="mt-4">
            <p className="opacity-90 font-bold">Olvidaste tu contraseña?</p>
            <Link to="/recover" className="underline hover:text-gray-200 font-medium">
              Recuperar
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}