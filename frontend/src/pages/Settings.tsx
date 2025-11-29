import React, { useState} from 'react';
import {User, MapPin, Bell, LogOut, CreditCard, Shield, Truck, Edit2 } from 'lucide-react';


export default function Settings(){

    // Estado para los toggles
  const [emailNotif, setEmailNotif] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);

  // Componente pequeño reutilizable para el Toggle
  const ToggleSwitch = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
    <div 
      onClick={onToggle}
      className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ease-in-out ${isOn ? 'bg-[#8B6E5F]' : 'bg-gray-300'}`}
    >
      <div 
        className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all duration-300 ease-in-out ${isOn ? 'right-1' : 'left-1'}`} 
      />
    </div>
  )

return (
    <div className="w-full pt-10 pb-20 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Encabezado */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#3E2723] mb-8">Mi Cuenta</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Perfil Resumido */}
          <div className="col-span-1">
            <div className="bg-[#8B6E5F] rounded-3xl p-6 shadow-xl text-center text-white sticky top-24">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-full h-full bg-yellow-400 rounded-full flex items-center justify-center text-[#3E2723] text-4xl font-bold border-4 border-white/20">
                    NR
                </div>
                <button className="absolute bottom-0 right-0 bg-white text-[#3E2723] p-1.5 rounded-full shadow-md hover:bg-gray-100">
                    <Edit2 size={14} />
                </button>
              </div>
              <h2 className="text-xl font-bold mb-1">Nicolás Rojas</h2>
              <p className="text-white/70 text-sm mb-6">Cliente Frecuente</p>
              
              <div className="space-y-2 mb-8 text-left bg-black/10 p-4 rounded-xl">
                <div className="flex items-center gap-3 text-sm">
                    <Truck size={16} className="text-yellow-400" />
                    <span>2 Pedidos en curso</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <CreditCard size={16} className="text-yellow-400" />
                    <span>**** 4242</span>
                </div>
              </div>

              {/* Botón Logout */}
              <button className="w-full flex items-center justify-center gap-2 bg-red-500/20 border border-red-500/30 text-white font-semibold py-3 rounded-xl hover:bg-red-500 hover:border-transparent transition-all">
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>

          {/* Secciones de Configuración */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            
            {/* Datos Personales */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <User className="text-[#8B6E5F]" size={24} />
                  <h3 className="font-bold text-xl text-gray-800">Datos Personales</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre</label>
                    <input type="text" defaultValue="Nicolás" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-[#8B6E5F]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Apellidos</label>
                    <input type="text" defaultValue="Rojas" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-[#8B6E5F]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Correo Electrónico</label>
                    <input type="email" defaultValue="clapt@gmail.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-[#8B6E5F]" />
                  </div>
              </div>
            </div>

            {/* Direcciones */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-[#8B6E5F]" size={24} />
                    <h3 className="font-bold text-xl text-gray-800">Mis Direcciones</h3>
                  </div>
                  <button className="text-sm text-[#8B6E5F] font-bold hover:underline">+ Nueva</button>
              </div>
              
              <div className="space-y-3">
                  <div className="flex items-start justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <div className="flex gap-3">
                        <div className="mt-1"><MapPin size={16} className="text-yellow-600"/></div>
                        <div>
                          <p className="font-bold text-gray-800">Casa (Principal)</p>
                          <p className="text-sm text-gray-600">Av. Siempre Viva 742, Springfield</p>
                        </div>
                    </div>
                    <span className="bg-yellow-200 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded">DEFAULT</span>
                  </div>
                  
                  <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-colors">
                    <div className="flex gap-3">
                        <div className="mt-1"><MapPin size={16} className="text-gray-400"/></div>
                        <div>
                          <p className="font-bold text-gray-800">Universidad</p>
                          <p className="text-sm text-gray-600">Larrondo 1281, 1781421 Coquimbo</p>
                        </div>
                    </div>
                  </div>
              </div>
            </div>

            {/* Preferencias y Seguridad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                      <Bell className="text-[#8B6E5F]" size={20} />
                      <h3 className="font-bold text-lg text-gray-800">Notificaciones</h3>
                  </div>
                  <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 font-medium">Ofertas por correo</span>
                         {/* ToggleSwitch */}
                        <ToggleSwitch isOn={emailNotif} onToggle={() => setEmailNotif(!emailNotif)} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 font-medium">Alertas de pedido</span>
                        <ToggleSwitch isOn={orderAlerts} onToggle={() => setOrderAlerts(!orderAlerts)} />
                      </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                      <Shield className="text-[#8B6E5F]" size={20} />
                      <h3 className="font-bold text-lg text-gray-800">Seguridad</h3>
                  </div>
                  <button className="w-full py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 mb-2">Cambiar Contraseña</button>
                  <button className="w-full py-2 text-sm border border-red-200 text-red-500 rounded-lg hover:bg-red-50">Eliminar Cuenta</button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};