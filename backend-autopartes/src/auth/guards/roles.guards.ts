import { Injectable, CanActivate, ExecutionContext, ForbiddenException,} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    // LEER ROLES DEL DECORADOR
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    // SI NO HAY ROLES → PERMITIR
    if (!requiredRoles) {
      return true;
    }

    // OBTENER USUARIO DEL TOKEN
    const request =
      context.switchToHttp().getRequest();

    const user = request.user;

    // VALIDAR
    const tieneRol =
      requiredRoles.includes(user.rol);

    if (!tieneRol) {
      throw new ForbiddenException(
        'No tienes permisos para acceder',
      );
    }

    return true;
  }
}