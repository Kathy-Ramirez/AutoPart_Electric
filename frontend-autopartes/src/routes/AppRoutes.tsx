import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import WelcomePage from '../pages/WelcomePage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import CatalogoPage from '../pages/cliente/CatalogoPage';
import ProtectedRoute from '../auth/ProtectedRoute';
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutCliente from '../layouts/LayoutCliente';
import CategoriasPage from '../pages/admin/CategoriasPage';
import ProductosPage from '../pages/admin/ProductosPage';
import ClientesPage from '../pages/admin/ClientesPage';
import ContactosPage from '../pages/cliente/ContactosPage';
import PerfilClientePage from '../pages/cliente/PerfilClientePage';
import RegisterPage from '../pages/RegisterPage';
import LogsAccesoPage from '../pages/admin/LogsAccesoPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas de Administrador */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['ADMINISTRADOR']}>
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="categorias" element={<CategoriasPage/>}/>
          <Route path="productos" element={<ProductosPage/>}/>
          <Route path="clientes" element={<ClientesPage/>}/>
          <Route path="logAcceso" element={<LogsAccesoPage/>}/>
        </Route>

        {/* Rutas de Cliente */}
        <Route 
          path="/cliente" 
          element={
            <ProtectedRoute rolPermitido ='CLIENTE'>
              <LayoutCliente />
            </ProtectedRoute> 
          }
        >
          <Route index element={<CatalogoPage />} />
          <Route path="contactos" element={<ContactosPage /> } />
          <Route path="perfil" element={<PerfilClientePage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}