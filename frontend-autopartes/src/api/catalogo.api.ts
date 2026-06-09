import api from './axios';

export const obtenerProductosCatalogo = async () => {
  const { data } = await api.get('/productos');
  return data;
};

export const obtenerCategoriasCatalogo = async () => {
  const { data } = await api.get('/categorias');
  return data;
};