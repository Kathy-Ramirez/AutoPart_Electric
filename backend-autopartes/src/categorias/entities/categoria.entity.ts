import { Entity, PrimaryGeneratedColumn, Column, OneToMany,} from 'typeorm';
import { BaseAuditoria } from '../../common/base.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('categorias')
export class Categoria extends BaseAuditoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 100,
  })
  nombre_categoria: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  descripcion: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  disponible: boolean;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}