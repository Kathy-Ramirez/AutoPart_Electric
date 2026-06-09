import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity'; // Revisa bien tu ruta
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Categoria]) // ◄--- Verifica que esta línea exista
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService] // ◄--- Expórtalo para que otros módulos lo vean si es necesario
})
export class ProductosModule {}