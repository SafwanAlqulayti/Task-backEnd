import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import * as  ORMConfig  from './config/ormconfig'
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { I18nModule, I18nJsonParser, QueryResolver, HeaderResolver, AcceptLanguageResolver, CookieResolver } from 'nestjs-i18n';
 import { ConfigModule } from '@nestjs/config';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ORMConfig),
    TasksModule,
     AuthModule,

    I18nModule.forRootAsync({
      useFactory: () => {
        return {
          fallbackLanguage: 'en', 
        
          parserOptions: {
            path: path.join('src/i18n'),
          },
        };
      },
      parser: I18nJsonParser,
     
      resolvers: [{ use: QueryResolver, options: ['lang', 'locale', 'l'] },
      // new HeaderResolver(['x-custom-lang']),
      AcceptLanguageResolver
      ,],
 
    }),

    MinioClientModule,

    FileUploadModule
    ],
     
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
