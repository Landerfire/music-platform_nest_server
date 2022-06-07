import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;

    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Музыкальная платформа на NestJS + NEXT')
      .setDescription('Документация REST API')
      .setVersion('1.0.0')
      .addTag('NestJS NEXT typescript node SSR')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    app.enableCors()

    await app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
