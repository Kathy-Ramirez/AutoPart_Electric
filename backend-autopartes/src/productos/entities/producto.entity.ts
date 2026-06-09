import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,} from 'typeorm';

import { Categoria } from '../../categorias/entities/categoria.entity';
import { BaseAuditoria } from 'src/common/base.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('productos')
export class Producto extends BaseAuditoria {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 150,
  })
  nombre_producto: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  marca: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  precio: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  descripcion: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  imagen_url: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  disponible: boolean;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, {
    eager: true,
    nullable: false,
    onDelete: 'RESTRICT', // Evita borrar una categoría si tiene productos asignados
  })
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @ManyToOne(() => Usuario, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_administrador' })
  administrador: Usuario;
}