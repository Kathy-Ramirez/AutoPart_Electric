import { Body, Controller, Get, Post, Req, UseGuards,} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SolicitarRecuperacionDto } from './dto/solicitar-recuperacion.dto';
import { RestablecerPasswordDto } from './dto/restablecer-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService,) {}

  // =========================
  // LOGIN
  // =========================
  @Post('login')
  async login( @Body() loginDto: LoginDto, @Req() req: Request,) {
    // Validar usuario
    const usuario =
      await this.authService.validateUser(loginDto.username, loginDto.password, loginDto.captchaToken, );
    // Obtener IP
    const ip =req.ip || req.socket.remoteAddress || '';
    // Obtener navegador
    const browser = req.headers['user-agent'] || 'Desconocido';
    // Generar token + registrar log
    return await this.authService.login(usuario, ip, browser,);
  }
  
  // =========================
  // SOLICITAR RECUPERACIÓN
  // =========================
  @Post('solicitar-recuperacion')
  async solicitarRecuperacion(@Body() dto: SolicitarRecuperacionDto,) {
    return await this.authService.solicitarRecuperacion(dto.correo,);
  }

  // =========================
  // RESTABLECER CONTRASEÑA
  // =========================
  @Post('restablecer-password')
  async restablecerPassword( @Body() dto: RestablecerPasswordDto, ) {
    return await this.authService.restablecerPassword(dto);
  }

  // =========================
  // LOGOUT
  // =========================
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout( @Req() req: Request, ) {
    const ip = req.ip || req.socket.remoteAddress || '';
    const browser = req.headers['user-agent'] || 'Desconocido';
    const usuario = req.user as any;
      // console.log(usuario); // TEMPORAL
    return await this.authService.logout( usuario.id_usuario, ip, browser, );
  }

  // =========================
  // PERFIL USUARIO LOGUEADO
  // =========================

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req: Request,) {
    const usuario = req.user as any;
    return await this.authService.obtenerPerfil(usuario.id_usuario, );
  }

}