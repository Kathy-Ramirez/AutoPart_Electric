import { useEffect, useState } from 'react';
import { createCategoria, deleteCategoria, getCategorias, updateCategoria } from '../../api/categorias.api';
import type { Categoria } from '../../types/categoria.types';
import CategoriaModal from '../../components/categorias/CategoriaModal';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  
  // CORRECCIÓN 1: Cambiado OpenModal a openModal para mantener consistencia
  const [openModal, setOpenModal] = useState(false);
  const [categoriaEditar, setCategoriaEditar] = useState<any>(null);

  useEffect(() => { 
    cargarCategorias(); 
  }, []);

  const cargarCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const guardarCategoria = async ( nombre:string, descripcion:string, ) => {
    try {
    if (categoriaEditar) {
      await updateCategoria( categoriaEditar.id_categoria, { nombre_categoria:nombre, descripcion,}, );
    }
    else {
      await createCategoria({nombre_categoria:nombre,descripcion,});
    }
    await cargarCategorias();
    setCategoriaEditar(null);
    setOpenModal(false);
    }
    catch(error){console.log(error);}
  };

  const eliminarCategoria =
    async (id:number,) => {
    const confirmar = window.confirm( '¿Eliminar categoría?' );
    if(!confirmar) return;
    try{
      await deleteCategoria(id);
      await cargarCategorias();
    }
    catch(error){ console.log(error); }
  };

  return (
    // CORRECCIÓN 2: Envolvimos todo dentro del div padre para que la sintaxis JSX sea válida
    <div className="p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white"> Gestión Categorías </h1>

        <button 
          onClick={() => setOpenModal(true)}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-lg"
        >
          + Agregar Categoría
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-blue-900/20 backdrop-blur-xl rounded-3xl border border-blue-400/20 overflow-hidden shadow-2xl">
        <table className="w-full text-white">
          <thead className="bg-blue-950/50">
            <tr>
              <th className="p-5">ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              {/* <th>Estado</th> */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-10">
                  Cargando...
                </td>
              </tr>
            ) : (
              categorias.map((cat) => (
                <tr key={cat.id_categoria} className="border-t border-blue-800/20 hover:bg-blue-900/20">
                  <td className="p-5 font-medium text-blue-400">{cat.id_categoria}</td>
                  <td>{cat.nombre_categoria}</td>
                  <td>{cat.descripcion}</td>
                  {/* <td>{cat.disponible ? "Disponible" : "No disponible"}</td> */}
                  {/* <td>
                    <span className={` inline-block px-2 py-0.5 rounded-md text-[11px] font-medium
                      ${ cat.disponible ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400' } `} >
                      {cat.disponible ? 'Activo' : 'Inactivo'}
                    </span>
                  </td> */}

                  <td>
                    <div className="flex gap-3 justify-center">
                      <button
                      onClick={() => { setCategoriaEditar(cat); setOpenModal(true); }}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">
                        Editar
                      </button>
                      <button
                      onClick={()=> eliminarCategoria( cat.id_categoria )}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL (Ahora correctamente ubicado dentro del contenedor) */}

      <CategoriaModal
        open={openModal}
        categoria={categoriaEditar}
        onSave={guardarCategoria}
        onClose={()=>{
          setOpenModal(false);
          setCategoriaEditar(null);
        }}
      />

    </div>
  );
}