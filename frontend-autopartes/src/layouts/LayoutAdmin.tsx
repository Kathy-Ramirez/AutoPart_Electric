import { useState } from 'react';
import { LayoutDashboard, Package, Users, Tags, User, LogOut, Menu, X } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { logoutRequest } from '../api/auth.api';

export default function LayoutAdmin() {
  const { logout } = useAuth();
  // Estado para controlar si el menú móvil del admin está abierto o cerrado
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
      
      {/* BOTÓN HAMBURGUESA ADMIN: Solo visible en pantallas de celular */}
      <div className="md:hidden bg-slate-900 border-b border-blue-400/20 p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-300">AutoPart Admin</h1>
        <button 
          onClick={() => setMenuAbierto(!menuAbierto)} 
          className="text-white p-1 focus:outline-none"
        >
          {menuAbierto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENÚ LATERAL RESPONSIVO DEL ADMINISTRADOR */}
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
            to="/admin" 
            className="sidebar-link flex items-center gap-2"
            onClick={() => setMenuAbierto(false)}
          >
            <LayoutDashboard size={20}/> Dashboard 
          </NavLink>
          
          <NavLink 
            to="/admin/categorias" 
            className="sidebar-link flex items-center gap-2"
            onClick={() => setMenuAbierto(false)}
          >
            <Tags size={20}/> Categorías 
          </NavLink>
          
          <NavLink 
            to="/admin/productos" 
            className="sidebar-link flex items-center gap-2"
            onClick={() => setMenuAbierto(false)}
          >
            <Package size={20}/> Productos 
          </NavLink>
          
          <NavLink 
            to="/admin/clientes" 
            className="sidebar-link flex items-center gap-2"
            onClick={() => setMenuAbierto(false)}
          >
            <Users size={20}/> Clientes 
          </NavLink>
          
          <NavLink 
            to="/admin/logAcceso" 
            className="sidebar-link flex items-center gap-2"
            onClick={() => setMenuAbierto(false)}
          >
            <User size={20}/> Auditoría 
          </NavLink>
        </nav>

        <button onClick={cerrarSesion} className="mt-16 flex items-center gap-2 text-red-400">
          <LogOut size={20}/> Salir
        </button>
      </aside>

      {/* CAPA OSCURA DE FONDO: Cierra el menú al presionar fuera en pantallas chicas */}
      {menuAbierto && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* CONTENIDO PRINCIPAL ADAPTADO */}
      {/* Ajustado el ml-62 por un ml-64 responsivo para que encaje simétrico */}
      <main className="flex-1 p-4 md:p-8 md:ml-64 min-h-screen">
        <Outlet />
      </main>

    </div>
  );
}