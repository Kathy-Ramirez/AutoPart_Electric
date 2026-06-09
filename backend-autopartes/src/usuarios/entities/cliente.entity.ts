import { ChildEntity, Column } from 'typeorm';
import { Usuario } from './usuario.entity';

@ChildEntity()
export class Cliente extends Usuario {
  @Column({
    type: 'varchar', // 1. Tipo explícito para consistencia
    nullable: true,
    length: 100,
  })
  nombres: string;

  @Column({
    type: 'varchar', // 1. Tipo explícito para consistencia
    nullable: true,
    length: 100,
  })
  apellidos: string;

  @Column({
    type: 'varchar', // 2. Tipo explícito ideal para números telefónicos
    nullable: true,
    length: 20,
  })
  telefono: string;
}