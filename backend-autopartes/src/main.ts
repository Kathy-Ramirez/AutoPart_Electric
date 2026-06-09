import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true,}));

  //conexion con el frontend, permitiendo solicitudes desde localhost:5173 y enviando cookies (credentials: true)
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    methods: 'GET, PATCH, POST, DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);

// whitelist: Elimina campos no permitidos.
// forbidNonWhitelisted: Bloquea campos extra sospechosos.
// transform: Transforma automáticamente tipos.

}
bootstrap();
