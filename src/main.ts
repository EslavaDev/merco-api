import * as dotenv from 'dotenv'
dotenv.config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassValidatorPipe } from './commons/class-validator.pipe';
import { HttpExceptionFilter } from './commons/http-exception';
import * as admin from 'firebase-admin';

const serviceAccount = require("../merco-api.json");

export const prefix = 'microservice-prefix';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://food-c7630.firebaseio.com"
  })
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(prefix);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ClassValidatorPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
