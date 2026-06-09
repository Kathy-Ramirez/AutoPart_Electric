import { Injectable, NotFoundException, ConflictException,} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  // =========================
  // CREAR ROL
  // =========================
  async create(createRoleDto: CreateRoleDto) {

    // Verificar duplicado
    const rolExiste =
      await this.rolRepository.findOne({
        where: {
          nombre_rol: createRoleDto.nombre_rol,
        },
      });

    if (rolExiste) {
      throw new ConflictException(
        'El rol ya existe',
      );
    }

    const nuevoRol =
      this.rolRepository.create(createRoleDto);

    return await this.rolRepository.save(nuevoRol);
  }

  // =========================
  // LISTAR ROLES
  // =========================
  async findAll() {
    return await this.rolRepository.find({
      order: {
        id_rol: 'ASC',
      },
    });
  }

  // =========================
  // BUSCAR POR ID
  // =========================
  async findOne(id: number) {

    const rol =
      await this.rolRepository.findOne({
        where: { id_rol: id },
      });

    if (!rol) {
      throw new NotFoundException(
        'Rol no encontrado',
      );
    }

    return rol;
  }

  // =========================
  // ACTUALIZAR
  // =========================
  async update( id: number, updateRoleDto: UpdateRoleDto, ) {
    const rol =  await this.findOne(id);
    Object.assign(rol, updateRoleDto);
    return await this.rolRepository.save(rol);
  }

  // =========================
  // ELIMINAR (SOFT DELETE)
  // =========================
  async remove(id: number) {

    const rol =
      await this.findOne(id);

    await this.rolRepository.softRemove(rol);

    return {
      message:
        'Rol eliminado correctamente.!',
    };
  }
}