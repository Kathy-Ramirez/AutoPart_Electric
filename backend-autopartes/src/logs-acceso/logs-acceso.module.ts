import { Module } from '@nestjs/common';
import { LogsAccesoService } from './logs-acceso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogAcceso } from './entities/logs-acceso.entity';
import { LogsAccesoController } from './logs-acceso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LogAcceso])],
  controllers:[LogsAccesoController],
  providers: [LogsAccesoService],
  exports: [LogsAccesoService], // Importante: exportar para usarlo en el módulo de Auth
})
export class LogsAccesoModule {}
