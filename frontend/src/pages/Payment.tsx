import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, CheckCircle, ShoppingBag } from 'lucide-react';
import { CartItem } from '../App';
import { ROUTES } from '../utils/constants';

interface PaymentProps {
    cart: CartItem[];
    onClear: () => void;
}

export default function Payment({ cart, onClear }: PaymentProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

  // Estados del formulario
    const [formData, setFormData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: ''
    });

  // Calculamos total
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const envio = subtotal > 20000 ? 0 : 2500;
    const total = subtotal + envio;

    const isFormValid = formData.name.length > 3 && 
    formData.number.length >= 16 && 
    formData.expiry.length >= 4 && 
    formData.cvc.length >= 3;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        onClear(); 
        setTimeout(() => {
        navigate(ROUTES.HOME);
        }, 3000);
        }, 2000);
    };

    useEffect(() => {
        if (cart.length === 0 && !success) {
        navigate(ROUTES.HOME);
        }
    }, [cart, navigate, success]);

    if (success) {
        return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4 fade-in">
            <CheckCircle className="text-green-500 w-24 h-24 mb-4 animate-bounce" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Pago Exitoso!</h1>
            <p className="text-gray-600 mb-8">Gracias por tu compra.</p>
        </div>
        );
    }

    return (
        <div className="w-full pt-10 pb-20 px-4 md:px-10 max-w-5xl mx-auto fade-in">
        <Link to={ROUTES.CHECKOUT} className="inline-flex items-center text-gray-600 hover:text-[#3E2723] mb-6 font-medium">
            <ArrowLeft size={20} className="mr-2" /> Volver al Carrito
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Formulario */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-100 rounded-full text-yellow-700">
                    <CreditCard size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Datos de Pago</h2>
            </div>

            <form onSubmit={handlePay} className="space-y-5">
                <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre en la tarjeta</label>
                <input 
                    name="name"
                    type="text" 
                    placeholder="Ej: Juan Pérez" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3E2723] transition-all"
                />
                </div>

                <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Número de tarjeta</label>
                <input 
                    name="number"
                    type="text" 
                    maxLength={16}
                    placeholder="0000 0000 0000 0000" 
                    value={formData.number}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3E2723] transition-all font-mono"
                />
                </div>

                <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiración</label>
                <input 
                    name="expiry"
                    type="text" 
                    maxLength={5}
                    placeholder="MM/YY" 
                    value={formData.expiry}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3E2723] transition-all text-center"
                    />
                </div>
                <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVC</label>
                <div className="relative">
                <input 
                    name="cvc"
                    type="password" 
                    maxLength={3}
                    placeholder="123" 
                    value={formData.cvc}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3E2723] transition-all text-center"
                    />
                    <Lock size={14} className="absolute right-3 top-4 text-gray-400" />
                </div>
                </div>
            </div>

            <button 
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all mt-6
                    ${isFormValid && !loading 
                    ? 'bg-[#3E2723] text-white hover:bg-[#5D4037] active:scale-95' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                {loading ? 'Procesando...' : `Pagar ${total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}`}
            </button>
            
                <div className="flex justify-center gap-2 mt-4 opacity-50">
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                </div>
            </form>
            </div>

        {/* Resumen Extendido */}
        <div className="hidden md:block order-1 md:order-2 h-auto min-h-full">
            <div className="bg-[#3E2723] text-white p-8 rounded-3xl shadow-xl h-full flex flex-col relative overflow-hidden">
                {/* Decoración de fondo */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="flex items-center gap-2 mb-6 opacity-90">
                    <ShoppingBag size={20} />
                    <span className="font-semibold">Resumen de compra</span>
                </div>

                {/* Lista de productos */}
                <div className="space-y-4 mb-8 flex-1">
                    {cart.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-4 bg-white/10 p-3 rounded-xl border border-white/5">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shrink-0">
                                <img src={item.product.img} alt="" className="h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">{item.product.name}</p>
                                <p className="text-xs opacity-70">Cantidad: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-bold whitespace-nowrap">
                                {(item.product.price * item.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div className="mt-auto border-t border-white/10 pt-6">
                    <div className="flex justify-between text-sm opacity-80 mb-2">
                        <span>Subtotal</span>
                        <span>{subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
                    </div>
                    <div className="flex justify-between text-sm opacity-80 mb-4">
                        <span>Envío</span>
                        <span>{envio === 0 ? 'Gratis' : envio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-lg font-light opacity-90">Total a pagar</span>
                        <span className="text-4xl font-bold">{total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
                    </div>
                </div>
            </div>
        </div>

        </div>
    </div>
    );
}