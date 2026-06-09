import { useEffect, useMemo, useState } from 'react';
import { Shield, Search, FileDown } from 'lucide-react';
import { getLogs } from '../../api/logs.api';
import { generarReporteLogs } from '../../utils/generarReporteLogs';

export default function LogsAccesoPage() {

  const [logs,setLogs] = useState<any[]>([]);
  const [buscar,setBuscar] = useState('');
  const [evento,setEvento] = useState('');
  const cargarLogs = async () => {
    try {
      const data = await getLogs();
      setLogs(data);
    }
    catch(error){
      console.log(error);
    }
  };

  useEffect(() => {cargarLogs(); },[]);
  const logsFiltrados = useMemo(() => {

    return logs.filter((log) => {
      const coincideUsuario = log.usuario?.username ?.toLowerCase() .includes(buscar.toLowerCase() );
      const coincideEvento = evento === '' || log.evento === evento; 
      return (
        coincideUsuario && coincideEvento 
      );

    });

  },[ logs, buscar, evento, ]);

  const totalRegistros = logsFiltrados.length;
  const totalIngresos = logsFiltrados.filter( l => l.evento === 'INGRESO' ).length;
  const totalSalidas = logsFiltrados.filter( l => l.evento === 'SALIDA' ).length;

  return (

    <div className="p-8 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Shield/> Auditoría de Accesos
        </h1>

        <button onClick={() => generarReporteLogs( logsFiltrados,)} className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-2xl flex items-center gap-2">
          <FileDown size={18}/> Reporte PDF
        </button>
      </div>

      {/* TARJETAS */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        <Card titulo="Ingresos" valor={totalIngresos} />
        <Card titulo="Salidas" valor={totalSalidas} />
        <Card titulo="Total Registros" valor={totalRegistros} />
      </div>

      {/* FILTROS */}
      <div className="bg-blue-900/20 border border-blue-400/20 rounded-3xl p-5 md:p-6 mb-8 backdrop-blur-xl">
        {/* MODIFICACIÓN: grid-cols-1 para móviles y sm:grid-cols-2 para que ambos ocupen todo el ancho mitad y mitad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          
          {/* BUSCADOR */}
          <div className="flex flex-col w-full">
            <label className="text-sm text-blue-300 block mb-1.5 font-medium"> Buscar Usuario </label>
            <div className="relative w-full">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                value={buscar} 
                onChange={(e) => setBuscar(e.target.value)}
                placeholder="Usuario"
                className="w-full h-12 bg-slate-900/80 rounded-xl pl-11 pr-4 text-white placeholder:text-slate-500 border border-white/5 focus:border-blue-500/40 focus:outline-none text-sm md:text-base transition-all" 
              />
            </div>
          </div>

          {/* EVENTO */}
          <div className="flex flex-col w-full">
            <label className="text-sm text-blue-300 block mb-1.5 font-medium"> Evento </label>
            <div className="relative w-full">
              <select 
                value={evento} 
                onChange={(e) => setEvento(e.target.value)} 
                className="w-full h-12 bg-slate-900/80 rounded-xl px-4 text-white border border-white/5 focus:border-blue-500/40 focus:outline-none text-sm md:text-base cursor-pointer transition-all appearance-none pr-10" style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 16px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}>
                <option value="" className="bg-slate-900 text-white">Todos</option>
                <option value="INGRESO" className="bg-slate-900 text-white">Ingresos</option>
                <option value="SALIDA" className="bg-slate-900 text-white">Salidas</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto rounded-3xl border border-blue-400/20 bg-blue-900/20">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-950/50">
              <th className="p-4"> Usuario</th>
              <th> Evento</th>
              <th> IP</th>
              <th> Navegador</th>
              <th> Fecha</th>
            </tr>
          </thead>

          <tbody>
            {logsFiltrados.map((log:any)=>(
                <tr key={log.id_log} className="border-t border-blue-400/10 hover:bg-blue-900/10" >
                  <td className="p-4">{log.usuario?.username}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-xl text-xs ${log.evento === 'INGRESO' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} `}>
                      {log.evento}
                    </span>
                  </td>
                  <td> {log.ip}</td>
                  <td className="max-w-[250px] truncate"> {log.browser}</td>
                  <td> {new Date(log.creadoEn).toLocaleString()}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>

  );

}

function Card({ titulo, valor,}:any){

  return(
    <div className="bg-blue-900/20 border border-blue-400/20 rounded-3xl p-6">
      <p className="text-blue-300">
        {titulo}
      </p>
      <h2 className="text-4xl font-bold mt-2">
        {valor}
      </h2>
    </div>

  );

}