import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassValidatorPipe } from './commons/class-validator.pipe';
import { HttpExceptionFilter } from './commons/http-exception';
import * as admin from 'firebase-admin';

const adminConfig: admin.ServiceAccount = {
  "projectId": "merco-web",
  "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCYeG/5ud/l9vgc\nolETmlmlx0gBH7ZJuZifcLLYIvRKlnP8DXfokGgiN806AWQpk4zef2nKPtX3ICjd\nvqhrDaZtmxfs6cWsCAr5yMi8W1kAHQWtAooaFG4tKaF7Fh27Rc+KIXxLTvukHg7R\nvGmXnqTz59ZTQ82+XX1n5njBvS6llgdfczwrJZuHItDfsSX9G2h4P5v+42huwPcO\ny0DnPF+myrZfTRM76uAlbtfcRzSvjfuMi+DGEnBKq+EW1Lk5BzUMhIaXzgVuz0vD\n1MWMsGM1JfNYc/fuaWPznd4/2tgzpeCi6fxzUyj/VXOtnTVJJBdokqpnxSE6nFos\n2iK09xpNAgMBAAECggEAEVvo98grTy3amrv6Oh6hJUg2kPYw1Vz9nO2CVyxHnvRZ\nOTG5XK+QQ5ER2xBMfJVRfQWJoF6eErhFHtX1q9aOg70cMLt+53K0+TJcdGF8FRC4\n1DVNTuHTl229dluSv/8XPXVJhvNzoABSFJv8c6g6xJA5LRqzooBXZkxtpDUrSevJ\nXMNuUxgUaTKRDZjYGXLqcnDxQH4yfazfmYzNOSIRPY5J8u2qtVYmgsWd01JSn7BR\ndCJDJrmBuh/tz0RXBeUsd9sO1x2ytW8MCfOJrewOKyIC8c7ixoniqXkG22IYUoNy\n5rjt0igtxxbu9o4ujFwROJcgu3Xldqj0Ydw2MlSYewKBgQDOO9w693zsQ2lBu7iI\nCQx9G4F0mC17QUHLLT7YGFavHXn+QE6XBtZ75DFWIKxkSWQ1itgY4oUt8r0jS2yt\nx/BOhtqgp3UUiOHqC5a73PXVxjt+f3szDNAH92YobXXfLR981/s5aaC5RG/b0BDn\no9oMv+0NxG0qMCA3DjJsqb9s4wKBgQC9Q1VMj8h43+KVq7y5HcuS0IG2D+jTOhwy\nQ+ZgZ5TcYTB8Pl25OgIGLlTVd5krSNA88ShfKOLCjaxJRd5vyfG2tfzVpy5i2jxy\n5EI8e6OP4UNZfe/7pEhUpdqvnWwaIWFFGNaOGG7U99K9Bd+0voCxns4nkjgCI1yw\n7VUBl3+zDwKBgB44ET4ms4xfGFZEbnaodMcEN8Tg45Ey77QYziOV9WW1eQGzZJCm\ntNj0h/Ip2XjcdC2QSbfjwUYJUoOQcr1IFcM76V8vCm3W3NuRlSWz6+XGJUOU5HWH\nhBgWvUZhO6tXDk0ZzLsN6jobeBSKeV+n17SUjuS8io5q/N10XBkmCmGnAoGAZrCt\nDJCLPoKDp5/6ExsGhM9bQdSaCFnkSKWszywEihq1uwP/yGugA4iKARUWZ3Tnf9l9\nhTxi5RsHmu4tBcy1uOQ/nhFKytoMqG4PPk/7bCrWZy080/XMRRmEcXrh17+6zknu\nyESbhjQ9BNC2E5S1sSowQypD920Gcv0i/W0dHaMCgYEArLY4m8BjDorZB7XoTb1M\nnpEAGQG8az8ZNg8OxVvZKyhkZRKcS+scd/aspq/n+mrMx9vLKyngQTyQwCsx251N\nY/QQCrFEHXbaRjZr1Xfwq99MopjCDH80ka78XjzhOW/IcOM71XKhZprK4MYJ1FMD\nnSKS5nAfbOeyLIw9DlrAggo=\n-----END PRIVATE KEY-----\n",
  "clientEmail": "firebase-adminsdk-3e8yc@merco-web.iam.gserviceaccount.com",
}
;

export const prefix = 'microservice-prefix';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  databaseURL: "https://merco-web.firebaseio.com"
  })
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(prefix);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ClassValidatorPipe());
  await app.listen(3000);
}
bootstrap();
