import { Phone, MapPin, Clock, Send, MessageCircle, Mail, } from 'lucide-react';

export default function ContactosPage() {
  const telefono = '78849633';
  const telegramUser = 'AnghyMamani';
  
  return (
    // Reducido padding en móvil (p-4) y normal en pantallas grandes (md:p-8)
    <div className="p-4 md:p-8 text-white">
      
      {/* Título responsivo text-3xl en móvil y text-5xl en pantallas grandes */}
      <h1 className="text-3xl md:text-5xl font-bold mb-8 md:mb-10 text-center sm:text-left"> Contactos </h1>
      
      {/* Cambiado gap a 6 en móvil y corregido grid por defecto a 1 columna */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* DATOS */}
        {/* Ajustado padding interno p-6 en móvil y p-8 en escritorio */}
        <div className="bg-blue-900/20 border border-blue-400/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
          <div className="space-y-6 md:space-y-8">
            <InfoItem icon={<Phone />} titulo="Teléfono" texto={telefono} />
            {/* Corregido el atributo 'tituloa' a 'titulo' */}
            <InfoItem icon={<MapPin />} titulo="Dirección" texto="Av.Ladislao Cabrera Nro: 9811 El Alto - La Paz" />
            <InfoItem icon={<Clock />} titulo="Horarios" texto=" Lun - Vie: 08:00 a 18:00 " />
            <InfoItem icon={<Mail />} titulo="Correo" texto="info@autopartelectric.com" />  
            <hr className="border-blue-400/10"></hr>
          </div>

          {/* Botones de acción: se apilan en columnas en móviles muy pequeños (flex-col) y se alinean (sm:flex-row) después */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10">
            <button
              onClick={()=> window.open( `https://t.me/${telegramUser}`, '_blank', )}
              className="flex items-center justify-center gap-2 bg-blue-600 px-5 py-3 rounded-2xl w-full sm:w-auto">
              <Send size={18}/>  Telegram
            </button>

            <button
              onClick={()=> window.open( `https://wa.me/591${telefono}`, '_blank', )}
              className="flex items-center justify-center gap-2 bg-green-600 px-5 py-3 rounded-2xl w-full sm:w-auto">
              <MessageCircle size={18}/>  WhatsApp
            </button>
          </div>
        </div>

        {/* MAPA */}
        {/* h-[300px] en móviles para que no consuma toda la pantalla vertical y h-[500px] en pantallas grandes */}
        <div className="bg-blue-900/20 border border-blue-400/20 rounded-3xl overflow-hidden h-[300px] lg:h-[500px]">
          <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3824.5433315081614!2d-68.20676192531079!3d-16.549136841991352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDMyJzU2LjkiUyA2OMKwMTInMTUuMSJX!5e0!3m2!1ses-419!2sbo!4v1780978532113!5m2!1ses-419!2sbo"
          // <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3824.5433315081614!2d-68.20676192531079!3d-16.549136841991352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDMyJzU2LjkiUyA2OMKwMTInMTUuMSJX!5e0!3m2!1ses-419!2sbo!4v1780978532113!5m2!1ses-419!2sbo" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            className="w-full h-full" title="Mapa de ubicación" />
        </div>
      </div>

    </div>
  );
}

function InfoItem({icon, titulo, texto, }:any){
  return(
    <div className="flex gap-4">
      <div className="text-blue-300 shrink-0"> {icon} </div>
      <div> 
        <h3 className="font-bold"> {titulo} </h3>
        <p className="text-gray-300 text-sm md:text-base"> {texto} </p>
      </div>
    </div>
  );
} 