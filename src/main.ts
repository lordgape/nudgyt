import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as compression from 'compression';

/* istanbul ignore file */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    Logger.log(`Server is up and running from port ${PORT}`);
  });
}
bootstrap();
