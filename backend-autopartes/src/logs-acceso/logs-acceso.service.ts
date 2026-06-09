import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LogAcceso } from './entities/logs-acceso.entity';

@Injectable()
export class LogsAccesoService {
  constructor(
    @InjectRepository(LogAcceso)
    private readonly logsRepository: Repository<LogAcceso>,
  ) {}

  // =========================
  // CREAR LOG
  // =========================
  async crearLog(
    id_usuario: number,
    evento: string,
    ip: string,
    browser: string,
  ) {
    const log = this.logsRepository.create({
      evento,
      ip,
      browser,

      usuario: {
        id_usuario,
      },
    });

    return await this.logsRepository.save(log);
  }

  async findAll( evento?:string, inicio?:string, fin?:string, ){
    const qb = this.logsRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect( 'log.usuario', 'usuario', );
    if(evento){
      qb.andWhere( 'log.evento = :evento',  {evento}, );
    }

    if(inicio && fin){
      qb.andWhere('log.creadoEn BETWEEN :inicio AND :fin',  {inicio,fin}, );
    }
    qb.orderBy( 'log.creadoEn','DESC', );
    return qb.getMany();
  }


}