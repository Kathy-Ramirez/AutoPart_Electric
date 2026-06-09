import { useEffect, useState } from 'react';
import ProductoModal from '../../components/productos/ProductoModal';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../../api/productos.api';
import { getCategorias } from '../../api/categorias.api';
import { generarReporteProductos} from '../../utils/reportes';
import { FileDown, Search } from 'lucide-react';

export default function ProductosPage() {
  const [productos, setProductos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [productoEditar, setProductoEditar] = useState<any>(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const cargarCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  const guardarProducto = async (data: any) => {
    try {
      if (productoEditar) {
        await updateProducto(productoEditar.id_producto, data);
      } else {
        await createProducto(data);
      }
      setProductoEditar(null);
      setOpenModal(false);
      await cargarProductos();
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const eliminarProducto = async (id: number) => {
    const confirmar = window.confirm('¿Eliminar producto?');
    if (!confirmar) return;

    try {
      await deleteProducto(id);
      await cargarProductos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda =
      producto.nombre_producto
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      producto.marca
        .toLowerCase()
        .includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaFiltro === '' ||
      producto.categoria?.id_categoria === Number(categoriaFiltro);
    return coincideBusqueda && coincideCategoria;
  });

  return (
    // CAMBIO: max-w-full y overflow-hidden para asegurar que nada rompa el contenedor principal
    <div className="p-4 text-white max-w-full overflow-hidden">
      
      {/* Encabezado */}
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Productos</h1>
        <button
          onClick={() => {
            setProductoEditar(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-xl text-sm font-semibold"
        >
          + Agregar Producto
        </button>
      </div> */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold"> Productos </h1>
        <div className="flex gap-3">
          <button onClick={() => generarReporteProductos( productos, )} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-2xl" >
             <FileDown size={18} />  Reporte PDF
          </button>
          <button
            onClick={() => setOpenModal(true) }
            className=" bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl " >
            + Agregar Producto
          </button>
        </div>
      </div>

        {/* AGREGAMOS EL BUSCADOR CN EL FILTRADOR DE CATEGORIAS */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3 text-gray-400"  size={18} />

            <input type="text" placeholder="Buscar producto o marca..." value={busqueda}
              onChange={(e) => setBusqueda(e.target.value) }
              className=" w-full bg-blue-900/20 border border-blue-400/20 rounded-xl py-3 pl-12 pr-4 text-white outline-none "/>
          </div>

          <select value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className=" p-3 rounded-xl bg-slate-900">
            <option value=""> Todas las categorías</option>
            {categorias.map((cat:any) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre_categoria}</option>
            ))}
          </select>
        </div>

      {/* Contenedor de la Tabla - CAMBIO: se añadió 'w-full overflow-x-auto' por si la pantalla es muy pequeña */}
      <div className="w-full overflow-x-auto bg-blue-900/20 backdrop-blur-xl rounded-2xl border border-blue-400/10 shadow-2xl">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-blue-950/50 border-b border-blue-800/30 text-gray-400">
              {/* CAMBIO: Se ajustaron los paddings (py-3 px-2) para compactar los espacios */}
              <th className="py-3 px-3 text-center w-12">ID</th>
              <th className="py-3 px-2">Nombre</th>
              <th className="py-3 px-2">Marca</th>
              <th className="py-3 px-2">Precio</th>
              <th className="py-3 px-2 text-center">Stock</th>
              <th className="py-3 px-2 max-w-[150px]">Descripción</th>
              <th className="py-3 px-2 text-center">Imagen</th>
              <th className="py-3 px-2 text-center">Categoría</th>
              <th className="py-3 px-2 text-center">Estado</th>
              <th className="py-3 px-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
           {productosFiltrados?.map((producto) => (
              <tr key={producto.id_producto} className="border-t border-blue-800/20 hover:bg-blue-900/10 transition">
                
                {/* ID centrado */}
                <td className="py-3 px-3 text-center font-medium text-blue-400">{producto.id_producto}</td>
                
                {/* Nombre y Marca */}
                <td className="py-3 px-2 font-semibold max-w-[120px] truncate">{producto.nombre_producto}</td>
                <td className="py-3 px-2 text-gray-300 max-w-[100px] truncate">{producto.marca}</td>
                
                {/* Precio */}
                <td className="py-3 px-2 font-medium text-green-400 whitespace-nowrap">Bs. {producto.precio}</td>
                
                {/* Stock centrado */}
                <td className="py-3 px-2 text-center">{producto.stock}</td>
                
                {/* CAMBIO: Descripción truncada para que el texto largo no estire la columna */}
                <td className="py-3 px-2 text-gray-400 max-w-[150px] truncate" title={producto.descripcion}>
                  {producto.descripcion}
                </td>
                
                {/* Imagen corregida (con tamaño fijo pequeño y centrada) */}
                <td className="py-3 px-2">
                  <div className="flex justify-center">
                    <img
                      src={producto.imagen_url || 'https://via.placeholder.com/50'}
                      alt={producto.nombre_producto}
                      className="w-8 h-8 rounded-lg object-cover border border-blue-400/20 bg-blue-950/50"
                    />
                  </div>
                </td>
                
                {/* Categoría alineada al centro */}
                <td className="py-3 px-2 text-center">
                    {producto.categoria?.nombre_categoria || 'Sin categoría'}
                </td>
                
                {/* Estado alineado al centro */}
                <td className="py-3 px-2 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-medium ${producto.stock >5 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {producto.stock > 4 ?'Activo' : 'Alerta'}
                  </span>
                </td>
                
                {/* Acciones compactas y alineadas como en tu segunda imagen */}
                <td className="py-3 px-3">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setProductoEditar(producto);
                        setOpenModal(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 transition px-3 py-1 rounded-md text-xs font-medium" >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarProducto(producto.id_producto)}
                      className="bg-red-600 hover:bg-red-700 transition px-3 py-1 rounded-md text-xs font-medium" >
                      Eliminar
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductoModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setProductoEditar(null);
        }}
        onSave={guardarProducto}
        productoEditar={productoEditar}
        categorias={categorias}
      />
    </div>
  );
}