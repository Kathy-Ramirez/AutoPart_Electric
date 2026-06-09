import {CreateDateColumn,UpdateDateColumn,DeleteDateColumn,} from 'typeorm';

export abstract class BaseAuditoria {

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'creado_en',
  })
  creadoEn: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'actualizado_en',
  })
  actualizadoEn: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'eliminado_en',
    nullable: true,
  })
  eliminadoEn: Date;
}