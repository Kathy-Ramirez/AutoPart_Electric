import { createContext, useContext, useState} from 'react';
import type {LoginResponse} from '../types/auth.types';

interface AuthContextType {

  user: LoginResponse | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType );

export const AuthProvider = ({ children, }: any) => {

  const [user,setUser] = useState<LoginResponse | null>( JSON.parse(localStorage.getItem('user') || 'null'));

  const login = (data: LoginResponse,) => {
    localStorage.setItem('user',JSON.stringify(data),);
    localStorage.setItem('token', data.access_token,);
    setUser(data);
 };

  // const logout = () => {
  //   localStorage.clear();
  //   setUser(null);
  // };
  const logout = () => {

    setUser(null);

    localStorage.removeItem('user');
    localStorage.removeItem('token');

  };

  return (
    <AuthContext.Provider value={{ user, login, logout,}}>
      {children}
    </AuthContext.Provider>
 );
};

export const useAuth = () => useContext(AuthContext);