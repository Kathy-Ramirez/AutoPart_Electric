import { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, } from 'recharts';
import { Package, Boxes, Warehouse, FileDown, TriangleAlert, } from 'lucide-react';
import { cargarDashboard } from '../../api/dashboard.api';
import { generarDashboardPDF } from '../../utils/generarDashboardPDF';
import type { Categoria } from '../../types/categoria.types';

export default function DashboardPage() {

  const [stats, setStats] = useState({
    totalProductos: 0,
    totalCategorias: 0,
    stockTotal: 0,
  });

  const [productos, setProductos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [graficoStock, setGraficoStock] =useState<any[]>([]);
  const [stockBajo, setStockBajo] =useState<any[]>([]);

  useEffect(() => { cargar(); }, []);
  const cargar = async () => {
    try {
      const { productos, categorias, } = await cargarDashboard();
      setProductos(productos);
      setCategorias(categorias);
      setStats({
        totalProductos:productos.length,
        totalCategorias: categorias.length,
        stockTotal: productos.reduce((acc:number,p:any)=> acc + p.stock, 0,),
      });

      const agrupado:any = {};
      productos.forEach((p:any)=>{
        const categoria = p.categoria?.nombre_categoria || 'Sin categoría';
        agrupado[categoria] = (agrupado[categoria] || 0) + 1;
      });

      // const datosCategorias = Object.keys(agrupado).map((categoria)=>({ categoria, cantidad: agrupado[categoria], }),);
      // setGraficoStock(datosCategorias,);
      const datosCategorias = categorias.map((cat: Categoria) => {
        return { categoria: cat.nombre_categoria,  cantidad: agrupado[cat.nombre_categoria] || 0  };
      });
      setGraficoStock(datosCategorias);
      setStockBajo(productos.filter((p:any)=>p.stock <= 5,),);
    }
    catch(error){console.log(error);}
  };

  return (
    // Reducido padding en móvil (p-4) y normal en pantallas grandes (md:p-8)
    <div className="p-4 md:p-8 text-white">
      
      {/* HEADER RESPONSIVO: Pasa a flex-col en móvil y alinea los elementos */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 md:mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black"> Dashboard </h1>
          <p className="text-blue-200 text-sm md:text-base mt-1 md:mt-2"> Resumen general del inventario </p>
        </div>

        <button
          onClick={() => generarDashboardPDF( productos, categorias, )}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-2xl w-full sm:w-auto text-sm md:text-base transition-colors shrink-0">
          <FileDown size={18}/> Reporte PDF
        </button>
      </div>

      {/* KPI RESPONSIVO: Adaptado a 1 col por defecto, 2 en tablets y 3 en desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
        <Card titulo="Productos" valor={stats.totalProductos} icon={<Package />} />
        <Card titulo="Categorías" valor={stats.totalCategorias} icon={<Boxes />} />
        {/* sm:col-span-2 hace que la última tarjeta tome todo el ancho si se queda sola en tablets */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Card titulo="Stock Total" valor={stats.stockTotal} icon={<Warehouse />} />
        </div>
      </div>

      {/* GRAFICO RESPONSIVO */}
      <div className="bg-blue-900/20 rounded-3xl p-4 md:p-6 border border-blue-400/20 backdrop-blur-xl mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2"> Productos por Categoría </h2>
        <p className="text-blue-200 text-xs md:text-sm mb-6">
          Distribución general del inventario
        </p>

        {/* Ajustado el height a 250px en móvil y 350px en pantallas grandes */}
        {/* <div className="w-full h-[250px] md:h-[350px]"> */}
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={graficoStock} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              {/* tick={{ fontSize: 12 }} evita que las letras colapsen en celulares */}
              <XAxis dataKey="categoria" tick={{ fontSize: 11, fill: '#93c5fd' }} />
              <YAxis tick={{ fontSize: 11, fill: '#93c5fd' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#3b82f6', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="cantidad" stroke="#60a5fa" fill="#1d4ed8" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* STOCK BAJO */}
      <div className="bg-red-900/20 rounded-3xl p-4 md:p-6 border border-red-400/20">
        <div className="flex gap-3 items-center mb-6">
          <TriangleAlert className="text-red-400" />
          <h2 className="text-xl md:text-2xl font-bold"> Stock Bajo </h2>
        </div>

        {stockBajo.length === 0 ? (
          <p className="text-sm md:text-base text-gray-400">No existen productos críticos</p>
        ) : (
          <div className="space-y-3">
            {stockBajo.map((p:any)=>(
              // text-sm en móvil para prevenir saltos feos si el nombre del repuesto es largo
              <div
                key={p.id_producto}
                className="flex justify-between items-center bg-red-950/20 rounded-xl px-4 py-3.5 text-sm md:text-base border border-red-500/10 gap-4">
                <span className="truncate"> {p.nombre_producto}</span>
                <span className="bg-red-500/20 px-3 py-1 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap shrink-0">
                  {p.stock} un.
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ titulo, valor, icon, }:any) {
  return (
    // Reducido mt-3 a mt-1 y text-5xl a text-4xl en móvil para optimizar espacio
    <div className="bg-blue-900/20 border border-blue-400/20 backdrop-blur-xl rounded-3xl p-5 md:p-6 hover:scale-[1.02] md:hover:scale-105 duration-300 flex items-center justify-between">
      <div>
        <p className="text-blue-200 text-sm md:text-base"> {titulo} </p>
        <h2 className="text-3xl md:text-5xl font-black mt-1 md:mt-3 tracking-tight"> {valor} </h2>
      </div>
      <div className="text-blue-300 opacity-70 scale-110 md:scale-125 shrink-0"> {icon} </div>
    </div>
  );
}