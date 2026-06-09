import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { LogsAccesoModule } from './logs-acceso/logs-acceso.module';
import { Categoria } from './categorias/entities/categoria.entity';
import { Producto } from './productos/entities/producto.entity';
import { LogAcceso } from './logs-acceso/entities/logs-acceso.entity';
import { ReportesModule } from './reportes/reportes.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Cliente } from './usuarios/entities/cliente.entity';
import { Administrador } from './usuarios/entities/administrador.entity';
import { Rol } from './roles/entities/rol.entity';
import { AuthModule } from './auth/auth.module';


@Module({

  imports: [
    // 1. Cargamos el archivo .env en toda la aplicación
    ConfigModule.forRoot({isGlobal: true, }),

    // 2. Conexión segura y asíncrona a MySQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true, 
        synchronize: true, // ¡Recuerda apagarlo en producción!

        entities: [Rol, Usuario, Cliente, Administrador, LogAcceso, Categoria, Producto], useUTC: true,   }),
      inject: [ConfigService],
    }),

    RolesModule,
    UsuariosModule,
    CategoriasModule,
    ProductosModule,
    LogsAccesoModule,
    // AuthModule,
    ReportesModule,
    DashboardModule,
    AuthModule,
    // MailModule,
  ],
  controllers: [AppController], // <-- Conservas tus controladores base
  providers: [AppService],       // <-- Conservas tus servicios base
})
export class AppModule {}