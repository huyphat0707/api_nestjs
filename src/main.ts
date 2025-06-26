import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Api Manage')
    .setDescription('List api manage')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('User')
    .addTag('Category')
    .addTag('Post')
    .addTag('Movie')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customJs: ['/swagger-ui-bundle.js', '/swagger-ui-standalone-preset.js'],
    customCssUrl: '/swagger-ui.css',
  });

  const PORT = process.env.PORT || 3000;
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger is available at http://localhost:${PORT}/api`);
  await app.listen(PORT);
}
bootstrap();
