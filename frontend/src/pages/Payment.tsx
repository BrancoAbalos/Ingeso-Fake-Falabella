import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, CheckCircle, ShoppingBag, Printer, Home } from 'lucide-react';
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

  // Guardamos los datos de la orden para la boleta
    const [orderReceipt, setOrderReceipt] = useState<{
        items: CartItem[];
        subtotal: number;
        envio: number;
        total: number;
        date: string;
        orderId: string;
    } | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        number: '',
        expiry: '',
        cvc: ''
    });

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
    
    // Capturamos los datos para la boleta antes de limpiar el carrito
        const receiptData = {
            items: [...cart],
            subtotal,
            envio,
            total,
            date: new Date().toLocaleString('es-CL'),
            orderId: Math.floor(100000 + Math.random() * 900000).toString()
        };

        setTimeout(() => {
            setOrderReceipt(receiptData);
            setLoading(false);
            setSuccess(true);
            onClear(); 
        }, 2000);
    };

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        if (cart.length === 0 && !success) {
            navigate(ROUTES.HOME);
        }
    }, [cart, navigate, success]);

  // VISTA DE BOLETA
    if (success && orderReceipt) {
        return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 animate-in fade-in zoom-in duration-500">
        
        {/* Contenedor NO IMPRIMIBLE (Botones y feedback visual) */}
        <div className="w-full max-w-md print:hidden flex flex-col gap-6">
            <div className="text-center">
                <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-4 animate-bounce" />
                <h1 className="text-3xl font-bold text-gray-800">¡Pago Exitoso!</h1>
                <p className="text-gray-600">Tu pedido ha sido confirmado.</p>
            </div>

            {/* VISTA PREVIA DE LA BOLETA */}
            <div className="bg-white p-6 shadow-xl relative overflow-hidden" style={{ filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))' }}>
                <div className="absolute top-0 left-0 w-full h-2 bg-[radial-gradient(circle,transparent_50%,#fff_50%)] bg-[length:10px_10px] rotate-180"></div>
                {/* Datos hardcodeados hasta tener conectada la papu base e datos */}
                <div className="text-center border-b-2 border-dashed border-gray-200 pb-4 mb-4 mt-2">
                    <h2 className="font-bold text-xl uppercase tracking-widest text-gray-800">BOTILLERÍA APP</h2>
                    <p className="text-xs text-gray-500">RUT: 76.123.456-K</p>
                    <p className="text-xs text-gray-500">Av. Siempre Viva 742, Santiago</p>
                    <p className="text-xs text-gray-500 mt-2">Orden #{orderReceipt.orderId}</p>
                    <p className="text-xs text-gray-400">{orderReceipt.date}</p>
                </div>

                <div className="space-y-2 text-sm mb-4 font-mono">
                    {orderReceipt.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                            <span>{item.quantity} x {item.product.name.substring(0, 15)}...</span>
                            <span>{(item.product.price * item.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t-2 border-dashed border-gray-200 pt-4 space-y-1 text-sm">
                    <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{orderReceipt.subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span></div>
                    <div className="flex justify-between text-gray-500"><span>Envío</span><span>{orderReceipt.envio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span></div>
                    <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-100">
                        <span>TOTAL</span>
                        <span>{orderReceipt.total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
                    </div>
                </div>

                <div className="text-center mt-6 text-xs text-gray-400">
                    <p>*** GRACIAS POR SU COMPRA ***</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
                <button onClick={handlePrint} className="w-full bg-[#3E2723] text-white py-3 rounded-xl font-bold shadow-lg hover:bg-[#5D4037] flex items-center justify-center gap-2 transition-all active:scale-95">
                    <Printer size={20} /> Imprimir Boleta
                </button>
                <button onClick={() => navigate(ROUTES.HOME)} className="w-full bg-white text-gray-700 border border-gray-200 py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2 transition-all">
                    <Home size={20} /> Volver al Inicio
                </button>
            </div>
        </div>

        {/* ESTILOS DE IMPRESIÓN, hardcodeados tmb mientras*/}
        <div className="hidden print:block print:absolute print:top-0 print:left-0 print:w-full bg-white p-4 font-mono text-black text-xs">
            <div className="max-w-[80mm] mx-auto">
                <div className="text-center mb-4">
                    <h2 className="font-bold text-xl uppercase">BOTILLERÍA APP</h2>
                    <p>RUT: 76.123.456-K</p>
                    <p>Av. Siempre Viva 742</p>
                    <p>Boleta Electrónica #{orderReceipt.orderId}</p>
                    <p>{orderReceipt.date}</p>
                </div>
                <div className="border-b border-black mb-2 border-dashed"></div>
                <div className="mb-2">
                    {orderReceipt.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between mb-1">
                            <span>{item.quantity} x {item.product.name}</span>
                            <span>{(item.product.price * item.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-black border-dashed pt-2 mb-4">
                    <div className="flex justify-between"><span>Neto</span><span>{Math.round(orderReceipt.subtotal / 1.19).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span></div>
                    <div className="flex justify-between"><span>IVA (19%)</span><span>{Math.round(orderReceipt.subtotal - (orderReceipt.subtotal / 1.19)).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span></div>
                    <div className="flex justify-between"><span>Envío</span><span>{orderReceipt.envio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span></div>
                    <div className="flex justify-between font-bold text-lg mt-2"><span>TOTAL</span><span>{orderReceipt.total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span></div>
                </div>
                <div className="text-center mt-4">
                    <p>*** GRACIAS POR SU COMPRA ***</p>
                    <p>Copia Cliente</p>
                </div>
            </div>
        </div>

        </div>
        );
    }

  // VISTA DE PAGO NORMAL
    return (
    <div className="w-full pt-10 pb-20 px-4 md:px-10 max-w-5xl mx-auto fade-in print:hidden">
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
                <input name="name" type="text" placeholder="Ej: Juan Pérez" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3E2723]" />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Número de tarjeta</label>
                <input name="number" type="text" maxLength={16} placeholder="0000 0000 0000 0000" value={formData.number} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3E2723]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiración</label>
                <input name="expiry" type="text" maxLength={5} placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-center focus:outline-none focus:ring-2 focus:ring-[#3E2723]" />
                </div>
                <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVC</label>
                <div className="relative">
                    <input name="cvc" type="password" maxLength={3} placeholder="123" value={formData.cvc} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-center focus:outline-none focus:ring-2 focus:ring-[#3E2723]" />
                    <Lock size={14} className="absolute right-3 top-4 text-gray-400" />
                </div>
                </div>
            </div>
            <button type="submit" disabled={!isFormValid || loading} className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all mt-6 ${isFormValid && !loading ? 'bg-[#3E2723] text-white hover:bg-[#5D4037] active:scale-95' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                {loading ? 'Procesando...' : `Pagar ${total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}`}
            </button>
            </form>
        </div>

        {/* Resumen */}
        <div className="hidden md:block order-1 md:order-2 h-auto min-h-full">
            <div className="bg-[#3E2723] text-white p-8 rounded-3xl shadow-xl h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                <div className="flex items-center gap-2 mb-6 opacity-90">
                    <ShoppingBag size={20} />
                    <span className="font-semibold">Resumen de compra</span>
                </div>
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
                <div className="mt-auto border-t border-white/10 pt-6">
                    <div className="flex justify-between text-sm opacity-80 mb-2"><span>Subtotal</span><span>{subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span></div>
                    <div className="flex justify-between text-sm opacity-80 mb-4"><span>Envío</span><span>{envio === 0 ? 'Gratis' : envio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span></div>
                    <div className="flex justify-between items-end"><span className="text-lg font-light opacity-90">Total a pagar</span><span className="text-4xl font-bold">{total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span></div>
                </div>
            </div>
        </div>

        </div>
    </div>
    );
}