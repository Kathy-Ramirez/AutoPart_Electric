import { Controller, Get, UseGuards, } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('dashboard')

@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)

@Roles('ADMINISTRADOR')

export class DashboardController {

  constructor(
    private readonly dashboardService:
      DashboardService,
  ) {}

  @Get('estadisticas')
  getEstadisticas() {
    return this.dashboardService
      .getEstadisticas();
  }

  @Get('grafico-categorias')
  productosPorCategoria() {
    return this.dashboardService
      .productosPorCategoria();
  }
}