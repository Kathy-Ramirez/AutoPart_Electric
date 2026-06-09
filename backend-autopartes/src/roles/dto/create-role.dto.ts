import {IsNotEmpty,IsString,MaxLength,} from 'class-validator';

export class CreateRoleDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre_rol: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  descripcion: string;
}