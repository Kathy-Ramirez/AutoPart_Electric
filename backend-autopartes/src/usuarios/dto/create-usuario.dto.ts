import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, Matches, IsInt, IsOptional,} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'La contraseña debe tener mínimo 8 caracteres',
  })
  @Matches(/[A-Z]/, {
    message: 'La contraseña debe tener al menos una mayúscula',
  })
  @Matches(/[0-9]/, {
    message: 'La contraseña debe tener al menos un número',
  })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'La contraseña debe tener al menos un carácter especial',
  })
  password: string;

  @IsString()
  @IsNotEmpty({
    message: 'Debe confirmar la contraseña',
  })
  confirmPassword: string;

  @IsEmail({}, {
    message: 'Correo electrónico inválido',
  })
  @IsNotEmpty()
  correo: string;

  @Type(() => Number)
  @IsInt({
    message: 'El id_rol debe ser un número entero',
  })
  id_rol: number;

  // =========================
  // CLIENTE
  // =========================

  @IsOptional()
  @IsString()
  nombres?: string;

  @IsOptional()
  @IsString()
  apellidos?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  // =========================
  // ADMINISTRADOR
  // =========================

  @IsOptional()
  @IsString()
  codigo_empleado?: string;
}