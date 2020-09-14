import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import bodyParser = require('body-parser');
 async function bootstrap() {
  // const serverConfig = config.get('server')
  const logger = new Logger("bootstrap")
  const port = process.env.PORT 
   const app = await NestFactory.create(AppModule);
   app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  await app.listen(3000);
  logger.log(`the app is started and it listen to port ${port}`)

}
bootstrap();
