import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LogsAccesoService } from '../../logs-acceso/logs-acceso.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logsService: LogsAccesoService) {}

// src/common/interceptors/logging.interceptor.ts

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const ip = request.ip || request.connection.remoteAddress;
        const browser = request.headers['user-agent'];

        return next.handle().pipe(
            tap(() => {
            if (request.url === '/auth/login') {
                // Intentamos obtener el ID del usuario si el request ya tiene un usuario (post-autenticación)
                // O si no, enviamos null como tenías planeado
                const idUsuario = request.user?.id || null; 
                
                this.logsService.crearLog(idUsuario, ip, 'ingreso', browser);
            }
            }),
        );
    }
}