import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Wrench, ShieldCheck, Zap, KeyRound, UserPlus, 
  Sparkles, ShieldCheck as GuaranteeIcon, Car, Clock 
} from 'lucide-react';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col justify-between p-6 md:p-12 font-sans">
      
      {/* DEGRADADOS NEÓN DE FONDO */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ENCABEZADO / NAVBAR
      <header className="relative z-20 flex justify-between items-center w-full max-w-7xl mx-auto border-b border-blue-500/10 pb-6">
        <div className="text-3xl font-black tracking-wider text-white flex items-center gap-2">
          <span className="text-blue-500 animate-pulse">⚡</span> AutoPart<span className="text-blue-400">Electric</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-sm md:text-base font-medium text-slate-300 hover:text-white transition px-5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800"
          >
            <KeyRound size={16} />
            Ingresar
          </button>
          <button 
            onClick={() => navigate('/registro')}
            className="flex items-center gap-2 text-sm md:text-base font-bold text-white bg-blue-600 hover:bg-blue-500 transition px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/20"
          >
            <UserPlus size={16} />
            Registrarse
          </button>
        </div>
      </header> */}
      {/* ENCABEZADO / NAVBAR RESPONSIVO */}
      {/* flex-col gap-4 para móvil y md:flex-row para pantallas normales */}
      <header className="relative z-20 flex flex-col sm:flex-row justify-between items-center w-full max-w-7xl mx-auto border-b border-blue-500/10 pb-6 gap-4">
        <div className="text-2xl md:text-3xl font-black tracking-wider text-white flex items-center gap-2">
          <span className="text-blue-500 animate-pulse">⚡</span> AutoPart<span className="text-blue-400">Electric</span>
        </div>
        
        {/* Botones adaptados para no apretarse en pantallas pequeñas */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
          <button 
            onClick={() => navigate('/login')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm md:text-base font-medium text-slate-300 hover:text-white transition px-4 md:px-5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800"
          >
            <KeyRound size={16} />
            Ingresar
          </button>
          <button 
            onClick={() => navigate('/registro')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm md:text-base font-bold text-white bg-blue-600 hover:bg-blue-500 transition px-4 md:px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/20"
          >
            <UserPlus size={16} />
            Registrarse
          </button>
        </div>
      </header>

      {/* SECCIÓN PRINCIPAL: ENFOQUE AL CLIENTE Y BENTO GRID */}
      <main className="relative z-10 max-w-7xl w-full mx-auto my-auto py-10 space-y-12">
        
        {/* TEXTO INTRODUCTORIO CENTRAL (Dedicado al Cliente) */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-sm font-bold uppercase tracking-wider">
             Encuentra el repuesto exacto para tu auto
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
            Energía y Rendimiento para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Tu Vehículo</span>
          </h1>
          <p className="text-slate-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
            Tu tienda de confianza en componentes eléctricos automotrices. Consulta disponibilidad de piezas originales de inmediato y cotiza con los mejores expertos.
          </p>
        </div>

        {/* ESTRUCTURA BENTO GRID */}
        <div className="grid grid-cols-1 gap-6">
          
          {/* BENTO GRID DE INFORMACIÓN COMERCIAL Y FOTOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tarjeta Misión (Enfoque en el cliente) */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-slate-800/60 backdrop-blur-md flex flex-col justify-between gap-6 min-h-[200px]">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Nuestra Misión con Contigo</h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  Ofrecerte soluciones inmediatas a las fallas eléctricas de tu coche, proveyendo un catálogo transparente con piezas de encendido e inyección 100% confiables.
                </p>
              </div>
            </div>

            {/* Tarjeta Visión (Enfoque en el cliente) */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-slate-800/60 backdrop-blur-md flex flex-col justify-between gap-6 min-h-[200px]">
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                <Car size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Nuestra Visión de Futuro</h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  Ser tu primera opción digital cuando pienses en el cuidado de tu auto, ofreciendo compras rápidas desde casa y la mayor red de repuestos del país.
                </p>
              </div>
            </div>

            {/* Tarjeta Grande de Servicios con Fotos Tipo Tienda */}
            <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Zap size={22} className="text-blue-400" /> Lo Que Te Ofrecemos en Nuestra Tienda
              </h3>
              
              {/* Fotos y descripciones de Servicios Orientados al Comprador */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Servicio 1 */}
                <div className="group relative rounded-xl overflow-hidden border border-white/5 bg-slate-950/60 p-4 flex flex-col gap-3 hover:border-blue-500/30 transition-all">
                  <div className="h-36 rounded-lg overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400" 
                      alt="Variedad Repuestos" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                    <ShoppingBag className="absolute bottom-3 left-3 text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Catálogo Completo</h4>
                    <p className="text-xs md:text-sm text-slate-400 mt-1 leading-relaxed">Encuentra alternadores, bujías, sensores y bobinas para marcas nacionales e importadas.</p>
                  </div>
                </div>

                {/* Servicio 2 */}
                <div className="group relative rounded-xl overflow-hidden border border-white/5 bg-slate-950/60 p-4 flex flex-col gap-3 hover:border-cyan-500/30 transition-all">
                  <div className="h-36 rounded-lg overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=400" 
                      alt="Asesoramiento" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                    <Wrench className="absolute bottom-3 left-3 text-cyan-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Asesoría de Expertos</h4>
                    <p className="text-xs md:text-sm text-slate-400 mt-1 leading-relaxed">¿No sabes qué pieza necesitas? Nuestro equipo valida la compatibilidad exacta con tu motor.</p>
                  </div>
                </div>

                {/* Servicio 3 */}
                <div className="group relative rounded-xl overflow-hidden border border-white/5 bg-slate-950/60 p-4 flex flex-col gap-3 hover:border-red-500/30 transition-all">
                  <div className="h-36 rounded-lg overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=400" 
                      alt="Garantía" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                    <GuaranteeIcon className="absolute bottom-3 left-3 text-emerald-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Garantía Asegurada</h4>
                    <p className="text-xs md:text-sm text-slate-400 mt-1 leading-relaxed">Todos nuestros productos eléctricos pasan pruebas de fábrica para darte total tranquilidad en ruta.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      {/* PIE DE PÁGINA (Orientado al consumidor) */}
      <footer className="relative z-20 flex flex-wrap justify-between items-center w-full max-w-7xl mx-auto border-t border-slate-900 pt-6 text-xs md:text-sm text-slate-500 gap-3">
        <p>© 2026 AutoPart Electric. Todos los derechos reservados.</p>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1"><Clock size={14} className="text-blue-400" /> Atención Inmediata</span>
          <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-cyan-400" /> Compra 100% Segura</span>
        </div>
      </footer>

    </div>
  );
}