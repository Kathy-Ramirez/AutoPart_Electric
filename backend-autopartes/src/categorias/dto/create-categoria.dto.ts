import { IsString, IsNotEmpty, MinLength, IsBoolean } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  nombre_categoria: string;

  @IsString()
  @MinLength(10)
  descripcion: string;

  // @IsBoolean()
  // disponible: string;
}