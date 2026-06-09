import { useEffect, useState } from 'react';
import { User, Mail, Phone, Shield } from 'lucide-react';
import { obtenerPerfil } from '../../api/perfil.api';

export default function PerfilClientePage() {

  const [cliente, setCliente] = useState<any>(null);
  const cargarPerfil = async () => {
    try {
      const data = await obtenerPerfil(); setCliente(data);
    }
    catch (error) { console.log(error);}
  };

  useEffect(() => {cargarPerfil(); }, []);

  if (!cliente) {
    return (
      <div className="p-4 md:p-8 text-white text-center md:text-left">Cargando perfil... </div>
    );
  }

  return (
    // CAMBIO CLAVE: Cambiado px-25 por px-4 en móvil y md:px-12 o md:px-25 en pantallas grandes
    <div className="px-4 md:px-12 lg:px-25 py-4 text-white flex justify-center lg:justify-start">
      {/* <h1 className="text-4xl font-bold mb-8"> Mi Perfil </h1> */}
      
      {/* Ajustado el padding interno de p-10 a p-6 en móvil */}
      <div className="w-full max-w-4xl bg-blue-900/20 border border-blue-400/20 rounded-3xl backdrop-blur-xl p-6 md:p-10">
        
        <div className="flex flex-col items-center mb-8 md:mb-10">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="w-12 h-12 md:w-14 md:h-14"/>
          </div>
          <h2 className="text-2xl md:text-3xl mt-4 text-center break-all"> {cliente.username} </h2>
          <p className="text-blue-300"> {cliente.rol?.nombre_rol || cliente.rol} </p>
        </div>

        {/* El grid inicia en 1 columna por defecto y pasa a md:grid-cols-2 en pantallas más grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Dato icon={<Mail />} titulo="Correo" valor={cliente.correo}/>
          <Dato icon={<User />} titulo="Nombres" valor={cliente.nombres}/>
          <Dato icon={<User />} titulo="Apellidos" valor={cliente.apellidos}/>
          <Dato icon={<Phone />} titulo="Teléfono" valor={cliente.telefono}/>
          <Dato icon={<Shield />} titulo="Seguridad" valor={cliente.nivel_seguridad_password}/>
          <Dato titulo="Registro" valor={new Date(cliente.creadoEn).toLocaleDateString()}/>
        </div>
      </div>

    </div>

  );

}

function Dato({ titulo, valor, icon, }: any) {

  return (
    // Reducido el p-5 a p-4 en celular para optimizar espacio
    <div className="bg-slate-900/40 rounded-2xl p-4 md:p-5 border border-blue-400/10">
      <div className="flex gap-3 items-center mb-2 text-blue-300">
        {icon}
        <span className="text-sm md:text-base">{titulo}</span>
      </div>

      {/* text-lg en celulares para evitar que correos largos rompan la tarjeta y text-xl en computadoras */}
      <h3 className="text-lg md:text-xl font-semibold break-words">
        {valor || 'No registrado'}
      </h3>
    </div>

  );

}