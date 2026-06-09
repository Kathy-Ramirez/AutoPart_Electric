import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class ReportesService {
  async generarReporteInventario(
    productos: any[],
    res: Response,
  ) {
    const doc = new PDFDocument({
      margin: 40,
      size: 'A4',
    });

    res.setHeader(
      'Content-Type',
      'application/pdf',
    );

    res.setHeader(
      'Content-Disposition',
      'inline; filename=reporte.pdf',
    );

    doc.pipe(res);

    // TITULO
    doc
      .fontSize(22)
      .text(
        'AUTO PART ELECTRIC',
        { align: 'center' },
      );

    doc.moveDown();

    doc
      .fontSize(16)
      .text(
        'Reporte de Inventario',
      );

    doc.fontSize(11).text(
      `Fecha: ${new Date().toLocaleString()}`,
    );

    doc.moveDown();

    // ENCABEZADOS
    doc.fontSize(10);

    doc.text(
      'Producto',
      40,
      doc.y,
    );

    doc.text(
      'Marca',
      160,
      doc.y - 12,
    );

    doc.text(
      'Precio',
      250,
      doc.y - 12,
    );

    doc.text(
      'Stock',
      320,
      doc.y - 12,
    );

    doc.text(
      'Estado',
      380,
      doc.y - 12,
    );

    doc.text(
      'Categoría',
      450,
      doc.y - 12,
    );

    doc.moveDown();

    // LINEA
    doc.moveTo(40, doc.y)
      .lineTo(560, doc.y)
      .stroke();

    doc.moveDown();

    // DATOS
    productos.forEach((p) => {
      doc.text(
        p.nombre_producto,
        40,
      );

      doc.text(
        p.marca,
        160,
        doc.y - 12,
      );

      doc.text(
        `${p.precio}`,
        250,
        doc.y - 12,
      );

      doc.text(
        `${p.stock}`,
        320,
        doc.y - 12,
      );

      doc.text(
        p.disponible
          ? 'Disponible'
          : 'Eliminado',
        380,
        doc.y - 12,
      );

      doc.text(
        p.categoria?.nombre_categoria ??
          '-',
        450,
        doc.y - 12,
      );

      doc.moveDown();
    });

    doc.moveDown();

    doc.text(
      `Total productos: ${productos.length}`,
    );

    doc.end();
  }
} 