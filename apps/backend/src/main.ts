import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const port = Number(process.env.PORT) || 3000;

  app.enableShutdownHooks();

  const server = await app.listen(port);
  logger.log(`Backend running on port ${port}`);

  const shutdown = async (signal: string) => {
    logger.warn(`Received ${signal}, shutting down...`);
    await app.close();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap();
