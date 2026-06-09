import { Controller, Get, Res, UseGuards,} from '@nestjs/common';
import express from 'express';
import { ReportesService } from './reportes.service';
import { ProductosService } from '../productos/productos.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('reportes')
export class ReportesController {
  constructor(
    private readonly reportesService: ReportesService,
    private readonly productosService: ProductosService,
  ) {}

  @Get('inventario/pdf')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMINISTRADOR')
  async descargarReporte(
    @Res() res: express.Response,
  ) {
    const productos =
      await this.productosService.findAll();

    return this.reportesService
      .generarReporteInventario(
        productos,
        res,
      );
  }
}