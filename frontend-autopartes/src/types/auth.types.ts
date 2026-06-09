export interface Usuario {
  id_usuario: number;
  username: string;
  correo: string;
  rol: string;
}

export interface LoginResponse {
  access_token: string;
  usuario: Usuario;
}

export interface LoginData {
  username: string;
  password: string;
  captchaToken: string;
}