import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { Cliente } from './entities/cliente.entity';
import { Administrador } from './entities/administrador.entity';
import { Rol } from 'src/roles/entities/rol.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Usuario]), 
    TypeOrmModule.forFeature([Usuario, Cliente, Administrador, Rol]),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // Exportamos por si otros módulos lo necesitan
})
export class UsuariosModule {}