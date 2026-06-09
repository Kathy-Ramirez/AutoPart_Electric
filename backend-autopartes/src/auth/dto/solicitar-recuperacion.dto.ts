import { IsEmail, IsNotEmpty } from 'class-validator';

export class SolicitarRecuperacionDto {
  @IsEmail()
  @IsNotEmpty()
  correo: string;
}