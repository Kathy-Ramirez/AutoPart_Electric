import { Controller, Get, Post, Body, } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {

  constructor( private readonly usuariosService: UsuariosService,) {}

  @Post()
  create(
  @Body()
  createUsuarioDto: CreateUsuarioDto,) {
    return this.usuariosService.create(
      createUsuarioDto,
    );
  }

  // TODOS LOS USUARIOS
  @Get()
  findAll() { 
    return this.usuariosService.obtenerClientes();
  }

  // SOLO CLIENTES
  @Get('clientes')
  obtenerClientes() {
    return this.usuariosService.obtenerClientes();
  }

}