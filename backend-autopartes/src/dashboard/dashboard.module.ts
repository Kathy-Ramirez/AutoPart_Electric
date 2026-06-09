import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa esto
import { Producto } from '../productos/entities/producto.entity'; // Importa la entidad
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ProductosModule } from 'src/productos/productos.module';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Categoria]), // Registra la entidad aquí
    ProductosModule, 
    CategoriasModule
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}