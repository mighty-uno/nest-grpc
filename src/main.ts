import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { grpcClientOptions } from './grpc-client-options';
const PORT = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(grpcClientOptions);
  await app.startAllMicroservicesAsync();
  app.listen(PORT, () => console.log(`start all microservice at ${PORT}`));
}
bootstrap();
