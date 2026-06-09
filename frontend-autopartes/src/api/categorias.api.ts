import api from './axios';

export const getCategorias = async () => {
  const { data } = await api.get('/categorias');
  return data;
};

export const createCategoria = async (
  categoria: {
    nombre_categoria: string;
    descripcion: string;
  },
) => {

  const { data } =
    await api.post(
      '/categorias',
      categoria,
    );

  return data;
};

export const updateCategoria = async (
  id:number,
  categoria:any,
) => {

  const { data } =
    await api.patch(
      `/categorias/${id}`,
      categoria,
    );

  return data;
};

export const deleteCategoria = async (
  id:number,
) => {

  const { data } =
    await api.delete(
      `/categorias/${id}`,
    );

  return data;
};