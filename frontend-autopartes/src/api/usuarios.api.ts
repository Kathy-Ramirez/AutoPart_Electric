import api from './axios';

export const getClientes =
async () => {
  const { data } = await api.get('/usuarios');
  return data;

};