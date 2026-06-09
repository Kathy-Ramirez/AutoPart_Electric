import { Injectable, UnauthorizedException,} from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LogsAccesoService } from 'src/logs-acceso/logs-acceso.service';
import { BadRequestException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly logsAccesoService: LogsAccesoService,
    private readonly mailService: MailerService,
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // =========================
  // VALIDAR USUARIO
  // =========================
  async validateUser( username: string, password: string, captchaToken:string,) {

    const captchaValido = await this.validarCaptcha( captchaToken, );
    if(!captchaValido){
      throw new UnauthorizedException('Captcha inválido', );
    }

    // Buscar usuario
    const usuario =
      await this.usuariosService.findOneByUsername(
        username,
      );

    // Usuario no existe
    if (!usuario) {
      throw new UnauthorizedException(
        'Usuario no encontrado',
      );
    }

    // Comparar password
    const passwordValido = await bcrypt.compare(
      password,
      usuario.password,
    );

    // Password incorrecto
    if (!passwordValido) {
      throw new UnauthorizedException(
        'Contraseña incorrecta',
      );
    }

    // Retornar usuario válido
    return usuario;
  }
 // CODIGOS DANDOS DONDE GENERAR CODIGO DE RECUPERACION
  private generarCodigo(): string {
    return Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
  }
    
  // =========================
  // LOGIN JWT
  // =========================
  async login( usuario: any, ip: string, browser: string,) {

    // PAYLOAD JWT
    const payload = {
      sub: usuario.id_usuario,
      username: usuario.username,
      rol: usuario.rol.nombre_rol,
    };

    // GENERAR TOKEN
    const access_token =
      await this.jwtService.signAsync(payload);

    // =========================
    // REGISTRAR LOG
    // =========================

    await this.logsAccesoService.crearLog(
      usuario.id_usuario,
      'INGRESO',
      ip,
      browser,
    );

    // RESPUESTA
    return {
      access_token,

      usuario: {
        id_usuario: usuario.id_usuario,
        username: usuario.username,
        correo: usuario.correo,
        rol: usuario.rol.nombre_rol,
      },
    };
  }

  //========================
  // RESTABLECER CONTRASEÑA
  //========================
  //recuperar contraseña
  async restablecerPassword( dto: any,) {
    const usuario =
      await this.usuariosService.buscarPorCorreo( dto.correo,);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado',);
    }

    if (usuario.codigo_recuperacion !==dto.codigo) {
      throw new UnauthorizedException('Código inválido',);
    }

    if ( !usuario.expira_codigo_recuperacion || new Date() > usuario.expira_codigo_recuperacion) {
      throw new UnauthorizedException( 'Código expirado',);
    }

    if ( dto.nuevaPassword !== dto.confirmarPassword ) {
      throw new UnauthorizedException( 'Las contraseñas no coinciden',);
    }

    const hash = await bcrypt.hash( dto.nuevaPassword, 10, );

    usuario.password = hash;
    usuario.codigo_recuperacion = null;
    usuario.expira_codigo_recuperacion = null;

    await this.usuariosService.guardar( usuario,);

    return { message: 'Contraseña actualizada correctamente',};
  }

  // =========================
  // SOLICITAR RECUPERACION DE CONTRASEÑA
  // =========================

  // async solicitarRecuperacion(correo: string,) {
  //   const usuario = await this.usuarioRepository.findOne({ where: { correo }, });
  //   if (!usuario) { throw new BadRequestException('Correo no registrado',); }
  //   const codigo = this.generarCodigo();
  //   usuario.codigo_recuperacion = codigo;
  //   usuario.expira_codigo_recuperacion =
  //     new Date( Date.now() + 15 * 60 * 1000, );
  //   await this.usuarioRepository.save(usuario,);

  //   await this.mailService.sendMail({
  //     to: correo,
  //     subject: 'Recuperación de contraseña',
  //     text: `Tu código de recuperación es: ${codigo}`,
  //   });

  //   return {message:'Código enviado al correo',};
  // }


  async solicitarRecuperacion(correo: string) {
  // 1. Buscamos el usuario en base a tu repositorio
  const usuario = await this.usuarioRepository.findOne({ where: { correo } });
  // Si no existe, lanzamos el error controlado
  if (!usuario) { 
    throw new BadRequestException('El correo electrónico no se encuentra registrado'); 
  }
  // 2. Generamos el código y calculamos la expiración (15 minutos)
  const codigo = this.generarCodigo();
  usuario.codigo_recuperacion = codigo;
  usuario.expira_codigo_recuperacion = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos en milisegundos
  // Guardamos los cambios en tu base de datos
  await this.usuarioRepository.save(usuario);
  // 3. Estructura HTML Premium con la temática neón de AutoPart Electric

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Recuperación de Contraseña</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155;">
      
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; margin: 40px auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; border-collapse: collapse;">
        
        <tr>
          <td align="center" style="padding: 32px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
            <div style="font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: #0f172a;">
              <span style="color: #2563eb;">⚡</span> AutoPart<span style="color: #2563eb;">Electric</span>
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding: 32px;">
            <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #0f172a; text-align: center;">
              Restablecer contraseña
            </h2>
            <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.5; color: #64748b; text-align: center;">
              Recibimos una solicitud para acceder a tu cuenta. Usa el siguiente código temporal para continuar con el proceso.
            </p>
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 24px auto;">
              <tr>
                <td align="center" style="background-color: #f1f5f9; border-radius: 8px; padding: 12px 32px;">
                  <span style="font-family: 'Courier New', Courier, monospace; font-size: 28px; font-weight: 700; letter-spacing: 4px; color: #1e3a8a;">
                    ${codigo}
                  </span>
                </td>
              </tr>
            </table>

            <p style="margin: 24px 0 0 0; font-size: 12px; line-height: 1.5; color: #94a3b8; text-align: center;">
              Este código expirará en <strong style="color: #64748b;">15 minutos</strong> y es de un solo uso.<br>
              Si no solicitaste este cambio, puedes ignorar este correo de forma segura.
            </p>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; border-radius: 0 0 12px 12px;">
            <p style="margin: 0 0 4px 0; font-size: 11px; color: #94a3b8;">
              © 2026 AutoPart Electric. Todos los derechos reservados.
            </p>
            <p style="margin: 0; font-size: 10px; color: #cbd5e1;">
              Por favor no respondas directamente a este correo automático.
            </p>
          </td>
        </tr>

      </table>
      
    </body>
    </html>
  `;

  // 4. Intento de envío real protegido con bloque Try/Catch
  try {
    await this.mailService.sendMail({
      to: correo,
      subject: '⚡ Recuperación de contraseña - AutoPart Electric',
      text: `Tu código de recuperación es: ${codigo}`, // Texto plano de respaldo
      html: htmlContent, // Diseño visual premium
    });

    return {
      message: 'Se ha enviado un código de recuperación a tu correo electrónico real.',
    };
  } catch (error) {
    // Si el servidor SMTP de correos cae o falla la configuración, el backend no se rompe
    console.error('Error detallado de Nodemailer:', error);
    throw new BadRequestException('No se pudo enviar el correo en este momento. Por favor, intenta más tarde.');
  }
}


  // =========================
  // LOGOUT
  // =========================
  async logout(
    id_usuario: number,
    ip: string,
    browser: string,
  ) {

    await this.logsAccesoService.crearLog(
      id_usuario,
      'SALIDA',
      ip,
      browser,
    );

    return {
      message:
        'Sesión cerrada correctamente',
    };
  }

  // =========================
  // PERFIL USUARIO LOGUEADO
  // =========================

  async obtenerPerfil( id_usuario: number, ) {
    return await this.usuariosService
      .obtenerClientePorId(id_usuario, );
  }

// RECAPTCHA_SECRET_KEY = 6LdM-RItAAAAAPNUMEbd77CJN_rlv06w2H0C2UN5
  
private async validarCaptcha(token: string,): Promise<boolean> {
    try {
      const secret = process.env.RECAPTCHA_SECRET_KEY;
      const response = await axios.post('https://www.google.com/recaptcha/api/siteverify',  null,
          {
            params: {secret,response: token,},
          },
        );

      return response.data.success;

    } catch (error) {
      console.error('Error captcha:',error,);
      return false;
    }
  }

}