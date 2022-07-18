import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

/* istanbul ignore file */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    Logger.log(`Server is up and running from port ${PORT}`);
  });
}
bootstrap();
