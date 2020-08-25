import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import * as  ORMConfig  from './config/ormconfig'
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { I18nModule, I18nJsonParser, QueryResolver, HeaderResolver, AcceptLanguageResolver, CookieResolver } from 'nestjs-i18n';
import { TaskSubscriber } from './tasks/task.subscriber';


@Module({
  imports: [
    TypeOrmModule.forRoot(ORMConfig),
    TasksModule,
     AuthModule,
    //  I18nModule.forRoot({
    //   fallbackLanguage: 'en',
    //   parser: I18nJsonParser,
    //   parserOptions: {
    //     path: path.join('src/i18n'),
    //     watch: true,
    //   },
    //   // resolvers: [
    //   //   { use: QueryResolver, options: ['lang', 'locale', 'l'] },
    //   //   new HeaderResolver(['x-custom-lang']),
    //   //   AcceptLanguageResolver,
    //   //   new CookieResolver(['lang', 'locale', 'l']),
    //   // ],
    //   resolvers: [{ use: QueryResolver, options: ['lang', 'locale', 'l'] }],
    
      
    // }),
    I18nModule.forRootAsync({
      useFactory: () => {
        return {
          fallbackLanguage: 'en', 
          fallbacks: {
            'en-CA': 'ar'
          
          },
          parserOptions: {
            path: path.join('src/i18n'),
          },
        };
      },
      parser: I18nJsonParser,
     
      resolvers: [{ use: QueryResolver, options: ['lang', 'locale', 'l'] }],

    })
    ],
     
  controllers: [AppController],
  providers: [AppService , TaskSubscriber],
})
export class AppModule {}
