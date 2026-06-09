import { Injectable, BadRequestException, ConflictException, NotFoundException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Rol } from 'src/roles/entities/rol.entity';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  // OBTENER TODOS LOS USUARIOS
  // async findAll() {
  //   return await this.usuarioRepository.find({
  //     relations: {
  //       rol: true,
  //     },
  //   });
  // }

  async findAll() {
    return await this.clienteRepository.find({
      relations: {rol: true,},
      where: {rol: {nombre_rol: 'CLIENTE',},},
      order: {id_usuario: 'ASC',},
    });
  }

  async obtenerClientes() {
    return await this.usuarioRepository
      .createQueryBuilder('u')
      .leftJoin( 'roles', 'r', 'u.id_rol = r.id_rol', )
      .select([
        'u.id_usuario AS id_usuario',
        'u.username AS username',
        'u.correo AS correo',
        'u.nombres AS nombres',
        'u.apellidos AS apellidos',
        'u.telefono AS telefono',
        'r.nombre_rol AS rol',
      ])
      .where( 'r.nombre_rol = :rol', { rol: 'CLIENTE' },)
      .orderBy( 'u.id_usuario', 'ASC',)
      .getRawMany();
  }


  async obtenerClientePorId(id_usuario: number,) {

    return await this.usuarioRepository
      .createQueryBuilder('u')
      .leftJoin( 'roles', 'r', 'u.id_rol = r.id_rol', )
      .select([
        'u.id_usuario AS id_usuario',
        'u.username AS username',
        'u.correo AS correo',
        'u.nombres AS nombres',
        'u.apellidos AS apellidos',
        'u.telefono AS telefono',
        'u.nivel_seguridad_password AS nivel_seguridad_password',
        'u.creadoEn AS creadoEn',
        'r.nombre_rol AS rol',
      ])

      .where( 'u.id_usuario = :id', { id: id_usuario }, )
      .getRawOne();
  }

  

  // EVALUAR SEGURIDAD PASSWORD
  private evaluarNivelPassword(password: string): string {
    const tieneMayus = /[A-Z]/.test(password);
    const tieneNumeros = /[0-9]/.test(password);
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    // DÉBIL
    if (password.length < 8) {
      return 'Débil';
    }
    // FUERTE
    if (tieneMayus && tieneNumeros && tieneEspecial) {
      return 'Fuerte';
    }
    // INTERMEDIA
    if ((tieneMayus && tieneNumeros) || tieneEspecial) {
      return 'Intermedia';
    }
    return 'Débil';
  }

  // CREAR USUARIO
  async create(createUsuarioDto: CreateUsuarioDto) {
    const {
      username,
      correo,
      password,
      confirmPassword,
      id_rol,
      ...userData
    } = createUsuarioDto;

    // VALIDAR CONFIRMACIÓN PASSWORD
    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden',);
    }

    // VALIDAR USERNAME ÚNICO
    const existeUsername = await this.usuarioRepository.findOne({
      where: { username },
    });

    if (existeUsername) {
      throw new ConflictException('El nombre de usuario ya está registrado',);
    }

    // VALIDAR CORREO ÚNICO
    const existeCorreo = await this.usuarioRepository.findOne({where: { correo },});

    if (existeCorreo) {
      throw new ConflictException( 'El correo electrónico ya está registrado',);
    }

    // VALIDAR ROL EXISTENTE
    const rol = await this.rolRepository.findOne({ where: { id_rol },});

    if (!rol) {
      throw new NotFoundException( 'El rol especificado no existe',);
    }

    // EVALUAR SEGURIDAD PASSWORD
    const nivelPassword = this.evaluarNivelPassword(password);

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash( password, salt,);

    // CREAR USUARIO
    const nuevoUsuario = this.usuarioRepository.create({
      ...userData,
      username,
      correo,
      password: hashedPassword,
      nivel_seguridad_password: nivelPassword,
      rol,
    });

    // GUARDAR USUARIO
    const usuarioGuardado = await this.usuarioRepository.save( nuevoUsuario,);

    // NO RETORNAR PASSWORD
    // delete usuarioGuardado.password;
    // return usuarioGuardado;
    const {
      password: _password,
      ...usuarioSinPassword
    } = usuarioGuardado;
    return usuarioSinPassword;
  }

  // LOGIN - BUSCAR POR USERNAME
  async findOneByUsername(
    username: string, ): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: { username,},
      relations: { rol: true,},
      select: {
        id_usuario: true,
        username: true,
        password: true,
        correo: true,
        nivel_seguridad_password: true,

        // rol: {
        //   id_rol: true,
        //   nombre_rol: true,
        // },
      },
    });
  }

// LOGIN - BUSCAR POR CORREO
  async buscarPorCorreo(correo: string,) {
    return await this.usuarioRepository.findOne({
      where: { correo },
      select: {
        id_usuario: true,
        correo: true,
        password: true,
        codigo_recuperacion: true,
        expira_codigo_recuperacion: true,
      },
    });
  }

  async guardar(usuario: Usuario,) {
    return await this.usuarioRepository.save(usuario,);
  }

}