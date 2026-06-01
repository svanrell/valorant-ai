import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  // Especificamos que usamos Express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Habilitamos CORS (muy importante para WebSockets)
  app.enableCors();

  // Le decimos a NestJS dónde están los archivos de la web
  app.useStaticAssets(join(__dirname, "..", "public"));

  await app.listen(3000);
}
bootstrap();
