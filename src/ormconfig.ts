import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import { TaskSubscriber } from './tasks/task.subscriber';
  const ORMConfig: TypeOrmModuleOptions={
type: 'postgres',
host: 'localhost',
port: 5432 ,
username: 'postgres',
password: '123456',
database: 'TaskBackend',
entities: [__dirname + '/../**/*.entity.{ts,js}'],
synchronize: false,
migrationsRun: true,//run it automatically
logging: true,
logger: 'file',
migrations: [__dirname + '/migrations/**/*{.ts,.js}'], //load migrations  
// subscribers: ['src/**/**.subscriber{.ts,.js}/..'], // for entity listeners
// subscribers: [TaskSubscriber],
autoLoadEntities: true ,


// migrations: [
//   "build/migration/*.js"
// ],
cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  }
}

export = ORMConfig ;
