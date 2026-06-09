export interface Categoria {
  id_categoria: number;
  nombre_categoria: string;
  descripcion: string;
  disponible: boolean;

  creadoEn?: string;
  actualizadoEn?: string;
  eliminadoEn?: string | null;
}

export interface CreateCategoriaDto {
  nombre_categoria: string;
  descripcion: string;
}

export interface UpdateCategoriaDto {
  nombre_categoria?: string;
  descripcion?: string;
  disponible?: boolean;
}