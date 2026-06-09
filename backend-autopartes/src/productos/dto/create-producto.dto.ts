import { IsString, IsNotEmpty, IsNumber, Min, IsUrl, IsPositive, IsBoolean } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre_producto: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @IsNotEmpty() // evita datos vacios, null o undefined
  descripcion: string;

  @IsUrl()
  imagen_url: string;

  @IsBoolean()
  disponible:boolean;

  @IsNumber()
  id_categoria: number; // ID para la relación
}