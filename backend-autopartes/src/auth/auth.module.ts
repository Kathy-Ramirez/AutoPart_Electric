import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LogsAccesoModule } from 'src/logs-acceso/logs-acceso.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
imports: [
    LogsAccesoModule,
    UsuariosModule,
    PassportModule,
    TypeOrmModule.forFeature([ Usuario,]),
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService,) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: configService.get('MAIL_USER',),
            pass: configService.get( 'MAIL_PASSWORD',),
          },
        },
      }),
    }),

    JwtModule.register({
      
      secret:'autopart-electric-secret-key',
      signOptions: {expiresIn: '1d',},
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,],
  exports: [AuthService],
})
export class AuthModule {}