export interface CategoriaProducto {
  id_categoria:number;
  nombre_categoria:string;
}

export interface Producto {

  id_producto:number;
  nombre_producto:string;
  marca:string;
  precio:number;
  stock:number;
  descripcion:string;
  imagen_url:string;
  disponible:boolean;
  categoria:CategoriaProducto;

}

export interface ProductoDto {

  nombre_producto:string;
  marca:string;
  precio:number;
  stock:number;
  descripcion:string;
  imagen_url:string;
  disponible:boolean;
  id_categoria:number;

}