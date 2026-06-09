import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { BaseAuditoria } from 'src/common/base.entity';

@Entity('roles')
export class Rol extends BaseAuditoria {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({
    type: 'varchar', // 1. Tipo explícito para consistencia en Postgres
    unique: true,
    nullable: false,
    length: 50,
  })
  nombre_rol: string;

  @Column({
    type: 'varchar', // 2. Tipo explícito para la descripción corta
    nullable: false,
    length: 255,
  })
  descripcion: string;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}