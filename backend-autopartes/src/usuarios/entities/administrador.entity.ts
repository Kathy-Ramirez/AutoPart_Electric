import { ChildEntity, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@ChildEntity()
export class Administrador extends Usuario {
  @Column({
    type: 'varchar', // 1. Tipo explícito para consistencia en Postgres
    nullable: true,   // 2. ¡Cuidado con el nullable en Single Table Inheritance!
    unique: true,
    length: 30,
  })
  codigo_empleado: string;

  @OneToMany(() => Producto, (producto) => producto.administrador)
  productos: Producto[];
}