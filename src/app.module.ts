import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import * as ORMConfig from 'dist/config/ORMconfig'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORMConfig),
    TasksModule,
     AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
