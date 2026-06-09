import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {

    const { id_categoria, ...productoData } =
      createProductoDto;

  // BUSCAR CATEGORÍA
    const categoria =
      await this.categoriaRepository.findOne({
        where: {
          id_categoria,
          disponible: true,
        },
      });

    if (!categoria || categoria.eliminadoEn) {
      throw new NotFoundException(
        'La categoría no existe o fue eliminada',
      );
    }
  // CREAR PRODUCTO
    const nuevoProducto =
      this.productoRepository.create({
        ...productoData,
        categoria,
          administrador: {
          id_usuario: 1,
        },
      });

    return await this.productoRepository.save(
      nuevoProducto,
    );

  }

  async findAll() {
    return await this.productoRepository.find({
      where: { disponible: true,},
      relations: { categoria: true, administrador: true,},
    }); 
  }

  async findOne(id: number) {
    const producto =
    await this.productoRepository.findOne({
      where: { id_producto: id, disponible: true,  },
      relations: { categoria: true, administrador: true,  },
    });
    return producto;
  }

  async update( id: number, updateProductoDto: UpdateProductoDto, ) {
      const producto =  await this.productoRepository.findOne({
          where: {id_producto: id,},
          relations: {categoria: true,},
        });

      if (!producto) {
        throw new NotFoundException(`Producto #${id} no encontrado`,);
      }

      if (updateProductoDto.id_categoria) {
        const categoria =
          await this.categoriaRepository.findOne({
            where: { id_categoria: updateProductoDto.id_categoria, },
          });

        if (!categoria) {
          throw new NotFoundException('Categoría no encontrada', );
        }
        producto.categoria = categoria;
      }
      Object.assign( producto, updateProductoDto, );
      return await this.productoRepository.save( producto, );
  }


// ELIMINACIÓN LÓGICA
  async remove(id: number) {
    const producto =
      await this.productoRepository.findOne({
        where: {
          id_producto: id,
        },
      });

    if (!producto) {
      throw new NotFoundException(
        `Producto #${id} no encontrado`,
      );
    }

    producto.disponible = false;
    producto.eliminadoEn = new Date();
    await this.productoRepository.save(producto);
    return {
      message:
        'Producto eliminado lógicamente',
    };
  }
}