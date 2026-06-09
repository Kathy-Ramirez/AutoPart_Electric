import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../productos/entities/producto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

@Injectable()
export class DashboardService {
  constructor(

    @InjectRepository(Producto)
    private readonly productoRepository:
      Repository<Producto>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository:
      Repository<Categoria>,
  ) {}

  // =====================
  // ESTADÍSTICAS
  // =====================
  async getEstadisticas() {

    const totalProductos = await this.productoRepository.count();

    const productosDisponibles =await this.productoRepository.count({where: {disponible: true, },});

    const productosEliminados = await this.productoRepository.count({withDeleted: true, where: { disponible: false, }, });

    const productosStockBajo =
      await this.productoRepository
        .createQueryBuilder('producto')
        .where('producto.stock < :limite', {
          limite: 5,
        })
        .andWhere(
          'producto.disponible = :estado',
          {
            estado: true,
          },
        )
        .getCount();

    const totalCategorias = await this.categoriaRepository.count();

    return {
      totalProductos,
      totalCategorias,
      productosDisponibles,
      productosEliminados,
      productosStockBajo,
    };
  }
  // =====================
  // GRÁFICO
  // =====================

  async productosPorCategoria() {

    return await this.categoriaRepository
      .createQueryBuilder('categoria')

      .leftJoin(
        'categoria.productos',
        'producto',
      )

      .select(
        'categoria.nombre_categoria',
        'categoria',
      )

      .addSelect(
        'COUNT(producto.id_producto)',
        'cantidad',
      )

      .groupBy(
        'categoria.id_categoria',
      )

      .getRawMany();
  }
}