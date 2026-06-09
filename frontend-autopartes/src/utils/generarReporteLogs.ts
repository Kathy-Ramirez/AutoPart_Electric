import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarReporteLogs = (logs: any[]) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const fechaGenerado = new Date().toLocaleString();

  // === 1. CÁLCULO DE MÉTRICAS RÁPIDAS (KPIs) ===
  const totalLogs = logs.length;
  const ingresos = logs.filter(l => l.evento === 'INGRESO').length;
  const salidas = logs.filter(l => l.evento === 'SALIDA').length;
  
  // Contar usuarios únicos que registran actividad
  const usuariosUnicos = new Set(logs.map(l => l.usuario?.username)).size;

  // === 2. ENCABEZADO ESTILIZADO (Estilo Dark AutoPart) ===
  // Banner de fondo oscuro principal
  doc.setFillColor(15, 23, 42); // Slate 900 (#0f172a)
  doc.rect(0, 0, 210, 38, 'F');

  // Título de la empresa
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('AutoPart Electric', 14, 16);

  // Subtítulo del tipo de reporte
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text('REPORTE DE AUDITORÍA Y CONTROL DE ACCESOS AL SISTEMA', 14, 23);

  // Fecha de generación alineada a la derecha
  doc.setFontSize(8.5);
  doc.text(`Generado: ${fechaGenerado}`, 196, 16, { align: 'right' });

  // === 3. PANEL DE MÉTRICAS (Tarjetas de resumen de auditoría) ===
  let posY = 46;
  
  // Fondo y contorno del contenedor gris claro
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.roundedRect(14, posY, 182, 18, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.setLineWidth(0.3);
  doc.roundedRect(14, posY, 182, 18, 3, 3, 'D');

  // Textos fijos de los KPIs
  doc.setTextColor(71, 85, 105); // Slate 600
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text('TOTAL REGISTROS', 20, posY + 5);
  doc.text('INGRESOS (LOGIN)', 68, posY + 5);
  doc.text('SALIDAS (LOGOUT)', 118, posY + 5);
  doc.text('USUARIOS ACTIVOS', 165, posY + 5);

  // Valores numéricos resaltados
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42); // Slate 900
  doc.text(`${totalLogs}`, 20, posY + 12);
  
  doc.setTextColor(21, 128, 61); // Verde para ingresos
  doc.text(`${ingresos}`, 68, posY + 12);
  
  doc.setTextColor(37, 99, 235); // Azul para salidas
  doc.text(`${salidas}`, 118, posY + 12);
  
  doc.setTextColor(15, 23, 42);
  doc.text(`${usuariosUnicos}`, 165, posY + 12);

  // === 4. TABLA DE AUDITORÍA PRINCIPAL ===
  posY += 26;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Historial de Log de Operaciones', 14, posY);

  autoTable(doc, {
    startY: posY + 3,
    head: [['Usuario del Sistema', 'Evento / Acción', 'Dirección IP', 'Fecha y Hora del Suceso']],
    body: logs.map((log) => [
      log.usuario?.username || 'Desconocido',
      log.evento,
      log.ip || '0.0.0.0',
      log.creadoEn ? new Date(log.creadoEn).toLocaleString() : 'Sin fecha'
    ]),
    theme: 'striped',
    headStyles: { 
      fillColor: [15, 23, 42], // Fondo Slate 900 idéntico al Dashboard
      fontSize: 9.5, 
      fontStyle: 'bold',
      halign: 'left'
    },
    styles: { 
      fontSize: 9, 
      cellPadding: 3.5 
    },
    columnStyles: {
      1: { fontStyle: 'bold' }, // Resaltar columna del evento
      2: { fontStyle: 'normal' }
    },
    // Efecto interactivo: colorear las celdas condicionalmente
    didParseCell: (data) => {
      if (data.column.index === 1 && data.cell.section === 'body') {
        const valorEvento = data.cell.raw;
        if (valorEvento === 'INGRESO') {
          data.cell.styles.textColor = [21, 128, 61]; // Texto verde elegante
        } else if (valorEvento === 'SALIDA') {
          data.cell.styles.textColor = [223, 43, 5]; // Texto rojo de acción
        }
      }
    }
  });

  // === 5. PIE DE PÁGINA PERPETUO DINÁMICO ===
  const totalPaginas = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPaginas; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // Slate 400
    
    // Línea divisoria muy sutil al final
    doc.setDrawColor(241, 245, 249);
    doc.line(14, 282, 196, 282);

    doc.text(`Página ${i} de ${totalPaginas}`, 105, 288, { align: 'center' });
    doc.text('AutoPart Electric - Módulo de Auditoría de Seguridad', 14, 288);
  }

  // Guardar documento finalizado
  doc.save(`Auditoria_Accesos_${new Date().toISOString().split('T')[0]}.pdf`);
};