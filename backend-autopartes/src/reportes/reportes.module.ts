import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [ProductosModule], // <--- ¡Añade esto!
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
