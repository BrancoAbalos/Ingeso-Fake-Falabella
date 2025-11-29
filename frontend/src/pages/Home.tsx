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
  { id: 104, name: 'Eristoff Black', price: 4990, img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSb09R-6vgFOaH06b_hKUMyUpFQbzI6BcdJpQEhStxMKctveEKbvgkZDNrTnavi3iB9ZUXedAiobylta4qsozHG9neSWEJHOV2xYDwQ5w' },
  { id: 105, name: 'Absolut Colors', price: 25990, img: 'https://img.thewhiskyexchange.com/540/vodka_abs75.jpg' },
];

interface HomeProps {
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}

export default function Home({ onAddToCart }: HomeProps) {
  return (
    <div className="w-full pb-20 fade-in">
      <section className="py-5 px-4">
        <h2 className="text-gray-900 font-bold text-lg mb-6 ml-4 md:ml-12 uppercase tracking-wide opacity-90">Destacados</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {TOP_PICKS.map((item) => (
            <div key={item.id} className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${'bg-gray-400'} shadow-inner flex items-center justify-center relative overflow-visible mb-4 ring-4 ring-white`}>
                <img src={item.img} alt={item.name} className="h-40 md:h-52 object-contain -mt-8 drop-shadow-2xl transition-all group-hover:-mt-12 filter hover:brightness-110" />
                {item.label && <span className="absolute top-0 right-0 bg-yellow-400 text-black font-bold px-2 py-1 rounded-full text-xs shadow-md border-2 border-white">{item.label}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-400 backdrop-blur-md mx-4 md:mx-12 rounded-3xl p-6 md:p-8 shadow-inner">
        <h2 className="text-gray-700 font-bold text-2xl mb-6 drop-shadow-sm">Catálogo</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PRODUCTS.map((prod) => (
            <div key={prod.id} className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/80 transition-all duration-300 flex flex-col items-center text-center shadow-sm hover:shadow-xl group relative">
              <div className="h-32 w-full flex items-center justify-center mb-3">
                <img src={prod.img} alt={prod.name} className="h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{prod.name}</h3>
              <p className="text-lg text-gray-900 font-bold mb-3">{prod.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
              <button onClick={onAddToCart} className="bg-[#2D2D2D] hover:bg-black text-white text-xs md:text-sm font-medium py-2 px-4 rounded-full shadow-lg transition-all active:scale-95 w-full flex items-center justify-center gap-2">
                <span>+</span> Añadir
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
