import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,} from 'typeorm';
import { BaseAuditoria } from 'src/common/base.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('logs_acceso')
export class LogAcceso extends BaseAuditoria {
  @PrimaryGeneratedColumn()
  id_log: number;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({
    type: 'varchar',
    length: 20, // 2. Acotado para 'INGRESO' o 'SALIDA'
    nullable: false,
  })
  evento: string;

  @Column({
    type: 'varchar',
    length: 45, // 3. Soporta IPv4 e IPv6 sin desperdiciar espacio
    nullable: false,
  })
  ip: string;

  @Column({
    type: 'text', // 4. CAMBIO CRÍTICO: Los User-Agents de los navegadores son enormes
    nullable: true,
  })
  browser: string;
}