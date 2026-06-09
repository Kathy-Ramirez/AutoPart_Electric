import { useEffect, useState } from 'react'; 
import type { Categoria } from '../../types/categoria.types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: any;
  categoria?: any;
}

export default function CategoriaModal({ open, onClose, onSave, categoria }: Props) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre_categoria);
      setDescripcion(categoria.descripcion);
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [categoria, open]); 

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nombre.trim().length < 3) {
      alert('Nombre muy corto');
      return;
    }

    if (descripcion.trim().length < 10) {
      alert('Descripción mínimo 10 caracteres');
      return;
    }

    try {
      setLoading(true);
      await onSave(nombre, descripcion);
      setNombre('');
      setDescripcion('');
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <form 
        onSubmit={handleSubmit} 
        className="w-[450px] p-8 rounded-3xl bg-blue-900/30 backdrop-blur-xl border border-blue-400/20"
      >
        <h2 className="text-2xl text-white font-bold mb-6"> 
          {categoria ? 'Editar Categoría' : 'Nueva Categoría'}
        </h2>

        <input 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          placeholder="Nombre" 
          className="w-full p-3 rounded-xl mb-4 bg-blue-950/40 text-white outline-none border border-transparent focus:border-blue-500 transition" 
        />
        
        <textarea 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          placeholder="Descripción" 
          className="w-full p-3 rounded-xl mb-6 bg-blue-950/40 text-white outline-none border border-transparent focus:border-blue-500 transition resize-none h-28" 
        />

        <div className="flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-700 transition text-white font-medium"
          > 
            Cancelar  
          </button>
          
          <button 
            disabled={loading} 
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 transition text-white font-medium"
          >
            {loading ? 'Guardando...' : categoria ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}