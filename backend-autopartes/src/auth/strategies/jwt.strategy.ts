import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
//Convierte JWT en estrategia oficial NestJS.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      // EXTRAER TOKEN DESDE HEADER
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      // NO IGNORAR EXPIRACIÓN
      ignoreExpiration: false,

      // MISMA SECRET DEL AUTH MODULE
      secretOrKey: 'autopart-electric-secret-key',
        
    });
  }

  // LO QUE RETORNAS AQUÍ
  // TERMINA EN req.user
  async validate(payload: any) {
    return {
      id_usuario: payload.sub,
      username: payload.username,
      rol: payload.rol,
    };
  }
}