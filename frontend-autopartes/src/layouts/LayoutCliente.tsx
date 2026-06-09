import { useState } from 'react';
import { User, LogOut, House, MessageCircle, Menu, X } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { logoutRequest } from '../api/auth.api';

export default function LayoutCliente() {
  const { logout } = useAuth();
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [menuAbierto, setMenuAbierto] = useState(false);
  
  const cerrarSesion = async () => {
    try {
      console.log('enviando logout');
      const resp = await logoutRequest();
      console.log(resp);
    } 
    catch(error) {
      console.log('error logout', error);
    }
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      
      {/* BOTÓN HAMBURGUESA: Solo visible en celulares/tablets */}
      <div className="md:hidden bg-slate-900 border-b border-blue-400/20 p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-300">AutoPart Electric</h1>
        <button 
          onClick={() => setMenuAbierto(!menuAbierto)} 
          className="text-white p-1 focus:outline-none"
        >
          {menuAbierto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENÚ LATERAL RESPONSIVO */}
      <aside className={`
        fixed left-0 top-0 h-screen bg-blue-950/95 md:bg-blue-950/30 backdrop-blur-xl border-r border-blue-400/20 p-6 w-64 z-40
        transition-transform duration-300 ease-in-out
        ${menuAbierto ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <h1 className="text-2xl font-bold text-blue-300 mb-10 hidden md:block">
          AutoPart Electric
        </h1>

        <nav className="space-y-3 mt-16 md:mt-0">
          <NavLink 
            to="/cliente" 
            className="sidebar-link flex items-center gap-2" 
            onClick={() => setMenuAbierto(false)}
          >
            <House size={20}/> Catálogo
          </NavLink>

          <NavLink 
            to="/cliente/contactos" 
            className="sidebar-link flex items-center gap-2" 
            onClick={() => setMenuAbierto(false)}
          >
            <MessageCircle size={20}/> Contactos
          </NavLink>

          <NavLink 
            to="/cliente/perfil" 
            className="sidebar-link flex items-center gap-2" 
            onClick={() => setMenuAbierto(false)}
          >
            <User size={20}/> Mi Perfil
          </NavLink>
        </nav>

        <button onClick={cerrarSesion} className="mt-16 flex items-center gap-2 text-red-400">
          <LogOut size={20} /> Salir
        </button>
      </aside>

      {/* CAPA OSCURA DE FONDO: Cierra el menú al hacer clic afuera (solo en móvil) */}
      {menuAbierto && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* CONTENIDO PRINCIPAL ADAPTADO */}
      <main className="flex-1 p-4 md:p-8 md:ml-64 min-h-screen">
        <Outlet />
      </main>

    </div>
  );
}