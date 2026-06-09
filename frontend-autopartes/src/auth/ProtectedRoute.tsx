import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface Props {
  children: React.ReactNode;
  allowedRoles?: string[];
  rolPermitido?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  rolPermitido,
}: Props) {

  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const rolUsuario = user.usuario.rol;

  if (
    allowedRoles &&
    !allowedRoles.includes(rolUsuario)
  ) {
    return <Navigate to="/" replace />;
  }

  if (
    rolPermitido &&
    rolUsuario !== rolPermitido
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}