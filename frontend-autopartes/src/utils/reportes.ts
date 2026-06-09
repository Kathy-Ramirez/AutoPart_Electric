import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarReporteProductos = (
  productos: any[],
) => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(
    'Reporte de Productos',
    14,
    20,
  );

  doc.setFontSize(11);

  doc.text(
    `Fecha: ${new Date().toLocaleDateString()}`,
    14,
    30,
  );

  autoTable(doc, {
    startY: 40,

    head: [[
      'ID',
      'Nombre',
      'Marca',
      'Precio',
      'Stock',
      'Categoría',
      'Estado',
    ]],

    body: productos.map((p) => [

      p.id_producto,

      p.nombre_producto,

      p.marca,

      `Bs. ${p.precio}`,

      p.stock,

      p.categoria?.nombre_categoria ||
        'Sin categoría',

      p.disponible
        ? 'Activo'
        : 'Inactivo',

    ]),
  });

  doc.save(
    'reporte_productos.pdf',
  );
};