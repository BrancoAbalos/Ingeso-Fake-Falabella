import React from 'react';
import { Link } from 'react-router-dom';

// Datos falsos para simular
const TOP_PICKS = [
  { id: 1, name: 'Corona', img: 'https://static.vecteezy.com/system/resources/previews/037/751/355/non_2x/corona-extra-beer-bottle-isolated-on-a-transparent-background-free-png.png', label: 'x6' },
  { id: 2, name: 'Alto del Carmen', img: 'https://www.distribuidoralamartina.cl/wp-content/uploads/2021/04/alto-del-carmen-35-1lt.png' },
  { id: 3, name: 'Vino Selecto Frutal', img: 'https://storage.googleapis.com/liquidos-public/products/large/1453005.png' },
  { id: 4, name: 'Fireball', img: 'https://www.fireballwhisky.com/content/dam/sazerac/final/north-america/shooters/fireball/archived-do-not-use/bottle/Fireball_Whisky_Bottle_Transparent_Background.png' },
  { id: 5, name: 'Jack Daniels Honey', img: 'https://cdnx.jumpseller.com/glops/image/37723937/resize/719/719?1733415383' },
];

const PRODUCTS = [
  { id: 101, name: 'Eristoff', price: 5990, img: 'https://storage.googleapis.com/liquidos-public/products/large/1334068.png' },
  { id: 102, name: 'Absolut Blue', price: 11990, img: 'https://i0.wp.com/8barrelsclub.com/wp-content/uploads/2021/06/Absolut-Blue-70cl-2-1.png?fit=1000%2C1000&ssl=1' },
  { id: 103, name: 'Absolut Rasp', price: 12990, img: 'https://storage.googleapis.com/liquidos-public/products/large/1334058_lg.png' },
  { id: 104, name: 'Eristoff Black', price: 4990, img: 'https://www.petitceller.com/media/catalog/product/c/c/cccbbcd5a271b908c38b893a64b47bb8380c1e4309c55c41dc6709c9ddf00a55.jpeg' },
  { id: 105, name: 'Absolut Colors', price: 25990, img: 'https://img.thewhiskyexchange.com/540/vodka_abs75.jpg' },
];

interface HomeProps {
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}

export default function Home({ onAddToCart }: HomeProps) {
  return (
    <div className="w-full pb-20">
      
      {/* Flex container centrado con gap */}
      <section className="py-12 px-4 flex flex-wrap justify-center gap-8 md:gap-12">
        {TOP_PICKS.map((item) => (
          <div key={item.id} className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
            {/* El círculo gris de fondo */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gray-400 shadow-inner flex items-center justify-center relative overflow-visible mb-4">
              {/* Imagen de la botella */}
              <img 
                src={item.img} 
                alt={item.name} 
                className="h-56 md:h-64 object-contain -mt-10 drop-shadow-xl transition-all group-hover:-mt-14"
              />
              
              {/* Etiqueta amarilla [x6]) toma nota mario hugo*/}
              {item.label && (
                <span className="absolute top-4 right-2 bg-yellow-400 text-black font-bold px-2 py-1 rounded text-xs shadow-sm">
                  {item.label}
                </span>
              )}
            </div>
            {/* Nombre opcional debajo */}
            <p className="font-semibold text-gray-700">{item.name}</p>
          </div>
        ))}
      </section>

      {/* Grilla de Productos */}
      <section className="bg-gray-400 backdrop-blur-sm mx-4 md:mx-12 rounded-3xl p-8 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {PRODUCTS.map((prod) => (
            <div key={prod.id} className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-white/40 transition-colors">
              
              {/* Imagen Producto */}
              <div className="h-48 w-full flex items-center justify-center mb-4">
                <img 
                  src={prod.img} 
                  alt={prod.name} 
                  className="h-full object-contain drop-shadow-md"
                />
              </div>

              {/* Precio */}
              <p className="text-xl text-white font-light mb-4 drop-shadow-md">
                {prod.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
              </p>

              {/* Botón Añadir */}
              <button 
                onClick={onAddToCart}
                className="bg-[#2D2D2D] hover:bg-black text-white text-sm font-medium py-2 px-6 rounded shadow-md transition-all hover:shadow-lg active:scale-95"
              >
                Añadir al Carro
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}