import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- Asegúrate de tener este import
import { Rol } from './entities/rol.entity';     // <-- Tu entidad Rol
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rol]) // ◄--- ¡ESTO ES LO QUE SUELE FALTAR!
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [TypeOrmModule] // Exportarlo por si usuarios lo necesita directamente
})
export class RolesModule {}