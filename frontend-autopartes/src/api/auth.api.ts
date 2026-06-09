import api from './axios';
import type { LoginResponse } from '../types/auth.types';
import type { LoginDto } from '../auth/types';

export const loginRequest = async ( data: LoginDto, ): Promise<LoginResponse> => {
  const response = await api.post( '/auth/login', data, );
  return response.data;
};

export const solicitarRecuperacion = async (correo:string) => {
  const response = await api.post('/auth/solicitar-recuperacion',{ correo },);
  return response.data;
};

export const restablecerPassword = async (data:any) => {
  const response =await api.post( '/auth/restablecer-password', data, );
  return response.data;
};
// REGISTRO CLIENTE
export const registerRequest = async (data: any,) => {

  const response = await api.post('/usuarios', data);
  return response.data;
};

export const logoutRequest = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};