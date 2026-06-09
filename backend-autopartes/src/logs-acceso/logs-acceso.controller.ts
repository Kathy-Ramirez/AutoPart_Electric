import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { LogsAccesoService } from './logs-acceso.service';

@Controller('logs-acceso')
export class LogsAccesoController {

  constructor(
    private readonly logsAccesoService: LogsAccesoService,
  ) {}

  @Post()
  create(@Body() dto:any) {

    return this.logsAccesoService.crearLog(
      dto.id_usuario,
      dto.evento,
      dto.ip,
      dto.browser,
    );
  }

  @Get()
  findAll(
  @Query('evento') evento?:string,
  @Query('inicio') inicio?:string,
  @Query('fin') fin?:string,

  ){
  return this.logsAccesoService.findAll(
    evento,
    inicio,
    fin,
  );

  }

}