import { useEffect, useState } from 'react';
import { obtenerProductosCatalogo, obtenerCategoriasCatalogo, } from '../../api/catalogo.api';

export default function CatalogoPage() {
  const [productos,setProductos] = useState<any[]>([]);
  const [productosFiltrados,setProductosFiltrados] = useState<any[]>([]);
  const [categorias,setCategorias] = useState<any[]>([]);
  const [busqueda,setBusqueda] = useState('');
  const [categoria,setCategoria] = useState('');

  useEffect(()=>{cargar()},[]);
  const cargar = async () => {
    const productosData = await obtenerProductosCatalogo();
    const categoriasData = await obtenerCategoriasCatalogo();
    setProductos(productosData);
    setProductosFiltrados(productosData);
    setCategorias(categoriasData);
  };

  useEffect(()=>{

    let resultado = [...productos];
    if(busqueda){
      resultado = resultado.filter(
        (p:any)=>
          p.nombre_producto
            .toLowerCase()
            .includes(busqueda.toLowerCase())
      );
    }
    if(categoria){
      resultado = resultado.filter(
        (p:any)=> p.categoria?.id_categoria === Number(categoria)
      );
    }
    setProductosFiltrados(resultado);
  },[busqueda,categoria,productos,]);

  return (

    // Reducido el padding en móviles (p-4) y normal en pantallas grandes (md:p-8)
    <div className="p-4 md:p-8 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center sm:text-left"> Catálogo Productos </h1>
      
      {/* Cambiado a flex-col para móviles y sm:flex-row para pantallas más grandes */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input placeholder="Buscar producto..." value={busqueda} onChange={(e)=> setBusqueda(e.target.value)} className="flex-1 p-3 rounded-xl bg-slate-900" />
        <select value={categoria} onChange={(e)=>setCategoria(e.target.value)} className="p-3 rounded-xl bg-slate-900 w-full sm:w-auto">
          <option value=""> Todas categorías </option>
          {categorias.map((c:any)=>(
            <option key={c.id_categoria} value={c.id_categoria} > {c.nombre_categoria}   </option>
          ))}
        </select>
      </div>

      {/* Agregado grid-cols-1 por defecto para celulares */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productosFiltrados.map((producto:any)=>(
          <div
            key={producto.id_producto}
            className="bg-blue-900/20 border border-blue-400/20 rounded-3xl overflow-hidden backdrop-blur-xl"
          >
            <img src={ producto.imagen_url || 'https://via.placeholder.com/300' } className="w-full h-52 object-cover" />
            <div className="p-5">
              <h2 className="font-bold text-xl">
                {producto.nombre_producto}</h2>

              <p className="text-blue-200">{producto.marca} </p>
              <p className="mt-2"> Bs. {producto.precio} </p>
              <p> Stock: {' '} {producto.stock} </p>

              <button className="mt-4 w-full bg-green-600 hover:bg-green-700 py-2 rounded-xl" onClick={() => {
              const telefono = '59178849633'; // Reemplaza con el número de teléfono del vendedor
              const mensaje = `Hola, deseo consultar disponibilidad:

              Producto: ${producto.nombre_producto}
              Marca: ${producto.marca}
              Precio: Bs. ${producto.precio}
              Categoría: ${producto.categoria?.nombre_categoria}
              ¿Está disponible?`;
              const username = 'AnghyMamani';
              const url =
              `https://t.me/${username}?text=${encodeURIComponent(mensaje)}`;

              window.open( url, '_blank' );}}>
              Consultar Disponibilidad
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}