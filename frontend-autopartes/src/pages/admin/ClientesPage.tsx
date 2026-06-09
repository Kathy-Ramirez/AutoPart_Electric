import { useEffect, useState } from 'react';
import { getClientes } from '../../api/usuarios.api';

export default function ClientesPage() {

  const [clientes, setClientes] = useState<any[]>([]);

  const cargarClientes = async () => {
    try { const data = await getClientes(); setClientes(data);} 
    catch (error) {console.log(error); }
  };

  useEffect(() => {cargarClientes();}, []);

  return (

    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6"> Clientes Registrados </h1>
      <table className="w-full bg-blue-900/20 backdrop-blur-xl rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-950/50">
            <th className="p-4 ">ID</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Rol</th>
          </tr>
        </thead>

        <tbody>

          {clientes.map((cliente) => (
            <tr key={cliente.id_usuario} className="border-t border-blue-700/20">
              <td className="p-4 font-medium text-blue-400">{cliente.id_usuario} </td>
              <td>{cliente.username} </td>
              <td>{cliente.correo} </td>
              <td>{cliente.nombres} </td>
              <td>{cliente.apellidos} </td>
              <td>{cliente.telefono} </td>
              <td>{cliente.rol} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );

}