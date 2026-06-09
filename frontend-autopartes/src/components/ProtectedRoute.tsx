import { Navigate, Outlet,} from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

interface Props {allowedRoles: string[];}
export default function ProtectedRoute({ allowedRoles, }: Props) {
    const { user } = useAuth();

    if (!user) {
        return (<Navigate to="/login" />);
    }

    const tieneRol = allowedRoles.includes( user.usuario.rol,);

    if (!tieneRol) {
        return ( <Navigate to="/" />);
    }

 return <Outlet />;
}