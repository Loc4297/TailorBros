import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Tailor')
    .setDescription('Tailor')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Tailor', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
}
