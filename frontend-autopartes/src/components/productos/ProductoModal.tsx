import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  productoEditar?: any;
  categorias: any[];
}

export default function ProductoModal({
  open,
  onClose,
  onSave,
  productoEditar,
  categorias,
}: Props) {

  const [form, setForm] = useState({
    nombre_producto: '',
    marca: '',
    precio: '',
    stock: '',
    descripcion: '',
    imagen_url: '',
    disponible: true,
    id_categoria: '',
  });

useEffect(() => {

if (productoEditar) {

setForm({

nombre_producto:
productoEditar.nombre_producto || '',

marca:
productoEditar.marca || '',

precio:
productoEditar.precio || '',

stock:
productoEditar.stock || '',

descripcion:
productoEditar.descripcion || '',

imagen_url:
productoEditar.imagen_url || '',

disponible:
productoEditar.disponible,

id_categoria:
productoEditar.categoria?.id_categoria || '',

});

}

else{

setForm({

nombre_producto:'',
marca:'',
precio:'',
stock:'',
descripcion:'',
imagen_url:'',
disponible:true,
id_categoria:'',

});

}

}, [productoEditar, open]);

  if (!open) return null;

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {

    e.preventDefault();

    if (!form.id_categoria) {
      alert('Seleccione categoría');
      return;
    }

    await onSave({
      ...form,

      precio: Number(form.precio),

      stock: Number(form.stock),

      id_categoria:
        Number(form.id_categoria),
    });
  };

  return (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <form
        onSubmit={handleSubmit}
        className="w-[700px] bg-blue-950/40 backdrop-blur-xl border border-blue-400/20 rounded-3xl p-8 space-y-4"
      >

        <h2 className="text-3xl text-white font-bold">
          Producto
        </h2>

        <input
          placeholder="Nombre producto"
          value={form.nombre_producto}
          onChange={(e) =>
            setForm({
              ...form,
              nombre_producto:
                e.target.value,
            })
          }
          className="w-full p-3 rounded-xl bg-slate-900 text-white"
        />

        <input
          placeholder="Marca"
          value={form.marca}
          onChange={(e) =>
            setForm({
              ...form,
              marca: e.target.value,
            })
          }
          className="w-full p-3 rounded-xl bg-slate-900 text-white"
        />

        <input
          type="number"
          min="0"
          placeholder="Precio"
          value={form.precio}
          onChange={(e) =>
            setForm({
              ...form,
              precio: e.target.value,
            })
          }
          className="w-full p-3 rounded-xl bg-slate-900 text-white"
        />

        <input
          type="number"
          min="0"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({
              ...form,
              stock: e.target.value,
            })
          }
          className="w-full p-3 rounded-xl bg-slate-900 text-white"
        />

        <select
          value={form.id_categoria}
          onChange={(e) =>
            setForm({
              ...form,
              id_categoria:
                e.target.value,
            })
          }
          className="w-full p-3 rounded-xl bg-slate-900 text-white"
        >

          <option value="">
            Seleccione categoría
          </option>

          {categorias.map((cat) => (

            <option
              key={cat.id_categoria}
              value={cat.id_categoria}
            >
              {cat.nombre_categoria}
            </option>

          ))}

        </select>

        <textarea
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) =>
            setForm({
              ...form,
              descripcion:
                e.target.value,
            })
          }
          className="w-full p-3 rounded-xl bg-slate-900 text-white"
        />

        <input
          placeholder="URL imagen"
          value={form.imagen_url}
          onChange={(e) =>
            setForm({
              ...form,
              imagen_url:
                e.target.value,
            })
          }
          className="w-full p-3 rounded-xl bg-slate-900 text-white"
        />

        {form.imagen_url && (

          <img
            src={form.imagen_url}
            className="w-24 h-24 rounded-xl object-cover"
          />

        )}

        <div className="flex gap-3">

          <button
            type="submit"
            className="bg-blue-600 px-5 py-2 rounded-xl text-white"
          >
            Guardar
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-red-600 px-5 py-2 rounded-xl text-white"
          >
            Cancelar
          </button>

        </div>

      </form>

    </div>

  );
}