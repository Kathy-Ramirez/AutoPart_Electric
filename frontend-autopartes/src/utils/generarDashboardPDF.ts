import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarDashboardPDF = (productos: any[], categorias: any[]) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const fecha = new Date().toLocaleString();
  const stockTotal = productos.reduce((acc: number, p: any) => acc + p.stock, 0);
  const productosStockBajo = productos.filter((p: any) => p.stock <= 5);

  // === 1. ENCABEZADO ESTILIZADO ===
  // Banner decorativo superior azul oscuro
  doc.setFillColor(15, 23, 42); // Slate 900 (#0f172a)
  doc.rect(0, 0, 210, 38, 'F');

  // Título del Sistema
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('AutoPart Electric', 14, 18);

  // Subtítulo del Reporte
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text('REPORTE EJECUTIVO DE CONTROL DE INVENTARIO', 14, 25);

  // Fecha alineada a la derecha
  doc.setFontSize(9);
  doc.text(`Generado el: ${fecha}`, 196, 18, { align: 'right' });

  // === 2. BLOQUES DE ESTADÍSTICAS (KPIs tipo Tarjetas) ===
  let posY = 48;
  
  // Fondo Gris Claro para la sección de KPIs
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.roundedRect(14, posY, 182, 20, 3, 3, 'F'); //Fill (Rellenar) MM
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.setLineWidth(0.3);
  doc.roundedRect(14, posY, 182, 20, 3, 3, 'D'); // Draw (Dibujar borde)  

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  
  // Columnas KPI
  doc.text('TOTAL PRODUCTOS', 30, posY + 6);
  doc.text('TOTAL CATEGORÍAS', 78, posY + 6);
  doc.text('STOCK GLOBAL', 165, posY + 6);

  doc.setFontSize(13);
  doc.setTextColor(37, 99, 235); // Azul Eléctrico
  doc.text(`${productos.length}`, 30, posY + 14);
  doc.text(`${categorias.length}`, 78, posY + 14);
  doc.text(`${stockTotal} und.`, 165, posY + 14);

  // === 3. SECCIÓN DE ALERTAS: STOCK BAJO ===
  posY += 28;
  if (productosStockBajo.length > 0) {
    doc.setFillColor(254, 242, 242); // Red 50
    doc.setDrawColor(239, 68, 68); // Red 500
    doc.roundedRect(14, posY, 182, 10 + (productosStockBajo.length * 6), 4, 4, 'FD');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(185, 28, 28); // Red 700
    doc.text(`ALERTA DE STOCK CRÍTICO (${productosStockBajo.length} Productos en riesgo)`, 20, posY + 6);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(153, 27, 27);
    
    productosStockBajo.forEach((p, index) => {
      const filaY = posY + 12 + (index * 6);
      doc.text(`• ${p.nombre_producto}`, 22, filaY);
      doc.text(`${p.stock} unidades restantes`, 190, filaY, { align: 'right' });
    });

    posY += 16 + (productosStockBajo.length * 6);
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(21, 128, 61); // Green 700
    doc.text('✓ El inventario se encuentra óptimo (Sin alertas de stock bajo).', 14, posY + 5);
    posY += 12;
  }

  // === 4. TABLA 1: CATÁLOGO DE PRODUCTOS ===
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Detalle General de Productos', 14, posY);

  autoTable(doc, {
    startY: posY + 3,
    head: [['Producto', 'Categoría', 'Precio Unitario', 'Stock Disponible']],
    body: productos.map((p: any) => [
      p.nombre_producto,
      p.categoria?.nombre_categoria || 'Sin categoría',
      `Bs. ${p.precio}`, // Formateo de precio local
      p.stock <= 5 ? `${p.stock} !!` : p.stock // Alerta visual sutil dentro de la celda
    ]),
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42], fontSize: 10, fontStyle: 'bold' }, // Estilo Slate 900
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      2: { halign: 'right' },
      3: { halign: 'center' }
    },
    didParseCell: (data) => {
      // Pintar de rojo el texto de las celdas con stock crítico en la tabla
      if (data.column.index === 3 && typeof data.cell.raw === 'string' && data.cell.raw.includes('!!')) {
        data.cell.styles.textColor = [220, 38, 38];
        data.cell.styles.fontStyle = 'bold';
      }
    }
  });

  // === 5. TABLA 2: CATEGORÍAS REGISTRADAS ===
  const finalYTabla1 = (doc as any).lastAutoTable.finalY;
  
  // Verificar si la segunda tabla cabe en la misma página o necesita salto automático
  let posYTabla2 = finalYTabla1 + 12;
  if (posYTabla2 > 240) {
    doc.addPage();
    posYTabla2 = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Resumen de Categorías de Repuestos', 14, posYTabla2);

  autoTable(doc, {
    startY: posYTabla2 + 3,
    head: [['Categoría', 'Descripción']],
    body: categorias.map((c: any) => [
      c.nombre_categoria,
      c.descripcion || 'Sin descripción disponible'
    ]),
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235], fontSize: 10, fontStyle: 'bold' }, // Azul Eléctrico para diferenciar
    styles: { fontSize: 9, cellPadding: 3 }
  });

  // === 6. PIE DE PÁGINA PERPETUO ===
  const totalPaginas = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPaginas; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Página ${i} de ${totalPaginas}`, 105, 287, { align: 'center' });
    doc.text('AutoPart Electric - Sistema de Gestión de Inventario', 14, 287);
  }

  // Guardar documento
  doc.save(`Reporte_Inventario_${new Date().toISOString().split('T')[0]}.pdf`);
};