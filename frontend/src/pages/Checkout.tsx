import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, CreditCard, Shield, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '../App';
import { ROUTES } from '../utils/constants';

interface CheckoutProps {
  cart: CartItem[];
  onAddOne: (id: string) => void;
  onRemoveOne: (id: string) => void;
  onClear: () => void;
}

export default function Checkout({ cart, onAddOne, onRemoveOne, onClear }: CheckoutProps) {
  const navigate = useNavigate();
  
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const envio = subtotal > 20000 ? 0 : 2500;
  const total = subtotal + envio;

  const handleGoToPayment = () => {
    if(cart.length === 0) return;
    navigate(ROUTES.PAYMENT);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-gray-300 p-6 rounded-full shadow-lg mb-6"><ShoppingCart size={64} className="text-gray-600" /></div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Tu carrito está vacío</h2>
        <Link to={ROUTES.HOME} className="bg-[#3E2723] text-white px-8 py-3 rounded-full font-bold hover:bg-[#5D4037] mt-4 inline-block">Ir a Comprar</Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-10 pb-20 px-4 md:px-10 max-w-6xl mx-auto">
      <Link to={ROUTES.HOME} className="inline-flex items-center text-gray-600 hover:text-[#3E2723] mb-6 font-medium">
        <ArrowLeft size={20} className="mr-2" /> Volver a la tienda
      </Link>
      <h1 className="text-3xl font-bold text-[#3E2723] mb-8">Tu Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                <img src={item.product.img} alt={item.product.name} className="h-full w-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.product.name}</h3>
                <p className="text-gray-500 text-sm">{item.product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })} c/u</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                <button onClick={() => onRemoveOne(item.product.id)} className="p-1 hover:bg-white rounded-full"><Minus size={16} /></button>
                <span className="font-bold text-gray-800 w-6 text-center">{item.quantity}</span>
                <button onClick={() => onAddOne(item.product.id)} className="p-1 hover:bg-white rounded-full"><Plus size={16} /></button>
              </div>
              <div className="text-right font-bold text-[#3E2723] min-w-[80px]">
                {(item.product.price * item.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
              </div>
            </div>
          ))}
          <button onClick={onClear} className="text-red-500 font-medium hover:underline flex items-center gap-2 mt-4 ml-2"><Trash2 size={16} /> Vaciar Carrito</button>
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-24 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Resumen</h3>
            <div className="space-y-3 border-b border-gray-100 pb-6 mb-6">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span></div>
              <div className="flex justify-between text-gray-600"><span>Envío</span><span>{envio === 0 ? 'GRATIS' : envio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span></div>
            </div>
            <div className="flex justify-between items-center mb-8"><span className="text-2xl font-bold text-gray-800">Total</span><span className="text-2xl font-bold text-[#3E2723]">{total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span></div>
            <button onClick={handleGoToPayment} className="w-full bg-[#3E2723] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#5D4037] flex items-center justify-center gap-2"><CreditCard size={20} /> Ir a Pagar</button>
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs"><Shield size={12} /><span>Pago 100% Seguro</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}