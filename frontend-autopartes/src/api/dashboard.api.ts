import { getProductos } from './productos.api';
import { getCategorias } from './categorias.api';
import { getClientes } from './usuarios.api';

export const cargarDashboard = async () => {

  const [
    productos,
    categorias,
    clientes,
  ] = await Promise.all([
    getProductos(),
    getCategorias(),
    getClientes(),
  ]);

  return {
    productos,
    categorias,
    clientes,
  };
};