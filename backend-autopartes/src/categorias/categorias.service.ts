import { Injectable, ConflictException, NotFoundException,} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly catRepository: Repository<Categoria>,
  ) {}

  // =========================
  // CREAR CATEGORÍA 
  // =========================
  async create(
    createCategoriaDto: CreateCategoriaDto,
  ) {

    // VALIDAR DUPLICADO
    const existeCategoria =
      await this.catRepository.findOne({
        where: {
          nombre_categoria:
            createCategoriaDto.nombre_categoria,
        },
      });

    if (existeCategoria) {
      throw new ConflictException(
        'La categoría ya existe',
      );
    }

    const categoria =
      this.catRepository.create({
        ...createCategoriaDto,
        disponible: true,
      });

    return await this.catRepository.save(
      categoria,
    );
  }

  // =========================
  // LISTAR
  // =========================
  async findAll() {

    return await this.catRepository.find({
      where:{disponible:true, },
      // order:{id_categoria:'DESC', },
    });
  }

  // =========================
  // BUSCAR POR ID
  // =========================
  async findOne(id: number) {

    const categoria =
      await this.catRepository.findOne({
        where: {
          id_categoria: id,
        },
      });

    if (!categoria) {
      throw new NotFoundException(
        `Categoría #${id} no encontrada`,
      );
    }

    return categoria;
  }

  // =========================
  // ACTUALIZAR
  // =========================
  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ) {

    const categoria =
      await this.catRepository.preload({
        id_categoria: id,
        ...updateCategoriaDto,
      });

    if (!categoria) {
      throw new NotFoundException(
        `Categoría #${id} no encontrada`,
      );
    }

    return await this.catRepository.save(
      categoria,
    );
  }

  // =========================
  // ELIMINACIÓN LÓGICA
  // =========================
  async remove(id: number) {

    const categoria =
      await this.catRepository.findOne({
        where: {
          id_categoria: id,
        },
      });

    if (!categoria) {
      throw new NotFoundException(
        `Categoría #${id} no encontrada`,
      );
    }

    // DESACTIVAR
    categoria.disponible = false;
    // FECHA ELIMINACIÓN
    categoria.eliminadoEn = new Date();
    await this.catRepository.save(
      categoria,
    );
    return { message: 'Categoría eliminada lógicamente', };
  }
}