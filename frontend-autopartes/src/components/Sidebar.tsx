import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function SidebarAdmin() {
  const { user } = useAuth();
  return (

    <div className=" w-72 bg-blue-900/20 backdrop-blur-xl border-r border-blue-400/20 p-6 text-white ">
      <h1 className="text-2xl font-bold mb-8"> AutoPart Electric </h1>
      <p> {user?.usuario.username} </p>
      <p className="text-blue-300 mb-10"> {user?.usuario.rol} </p>
      <nav className="space-y-4">
        <Link to="/admin"> Dashboard </Link> <br />
        <Link to="/admin/categorias"> Categorías </Link> <br />
        <Link to="/admin/productos"> Productos </Link> <br />
        <Link to="/admin/clientes"> Clientes </Link> <br />
        <Link to="/admin/perfil"> Perfil </Link>
      </nav>
    </div>
  );
}