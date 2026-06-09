import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, TableInheritance, OneToMany } from 'typeorm';
import { Rol } from 'src/roles/entities/rol.entity';
import { BaseAuditoria } from 'src/common/base.entity';
import { LogAcceso } from 'src/logs-acceso/entities/logs-acceso.entity';

@Entity('usuarios')
@TableInheritance({
  column: {
    type: 'varchar',
    name: 'tipo_usuario',
    length: 30, // 1. RECOMENDADO: Acotar la longitud del discriminador de herencia
  },
})
export class Usuario extends BaseAuditoria {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({
    type: 'varchar',
    unique: true,
    length: 50,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    select: false,
    nullable: false,
    length: 255,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20,
  })
  nivel_seguridad_password: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 100,
  })
  correo: string;

  // ESPACIO PARA LOS CAMPOS DE RECUPERACIÓN DE CONTRASEÑA
  @Column({
    type: 'varchar',
    length: 6,
    nullable: true,
  })
  codigo_recuperacion?: string | null;

  @Column({
    type: 'timestamp', // 2. CAMBIO CRÍTICO Y OBLIGATORIO: 'datetime' no existe en PostgreSQL
    nullable: true,
  })
  expira_codigo_recuperacion?: Date | null;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, {
    eager: true,
    nullable: false,
    onDelete: 'RESTRICT', // 3. Seguridad para evitar borrar roles con usuarios activos
  })
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;

  @OneToMany(
    (() => LogAcceso),
    (log) => log.usuario,
  )
  logsAcceso: LogAcceso[];
}