import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class RestablecerPasswordDto {
  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

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
  nuevaPassword: string;

  @IsString()
  @IsNotEmpty({
    message: 'Debe confirmar la contraseña',
  })
  confirmarPassword: string;
}