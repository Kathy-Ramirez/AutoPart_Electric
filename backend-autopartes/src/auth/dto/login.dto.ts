import { IsNotEmpty, IsString, } from 'class-validator';

export class LoginDto {
  @IsString({message: 'El username debe ser texto',})
  @IsNotEmpty({message: 'El username es obligatorio',})
  username: string;

  @IsString({ message: 'La contraseña debe ser texto', })
  @IsNotEmpty({message: 'La contraseña es obligatoria',})
  password: string;

  @IsString({message: 'Captcha inválido',})
  @IsNotEmpty({message:'Captcha obligatorio',})
  captchaToken:string ;

}