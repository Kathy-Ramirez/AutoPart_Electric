import api from './axios';

export const getLogs = async () => {

  const response =
    await api.get('/logs-acceso');

  return response.data;

};