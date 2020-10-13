import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import * as config from 'config'
import { printCommonLine } from 'jest-diff/build/printDiffs'
 
const dbConfig = config.get('db')
const ORMConfig: TypeOrmModuleOptions={
type:  'postgres', //
host:  process.env.DB_HOST,
port:  5432,
username: 'postgres',
password: '123456',
database: 'TaskBackend',
logging: true,
entities: [__dirname + '/../**/*.entity.{ts,js}'],
synchronize: true,
migrationsRun: false,//run it automatically
migrations: ['src/migrations/*{.ts,.js}'], //load migrations
   
subscribers: [ __dirname +'/**/**.subscriber{.ts,.js}/..'], // for entity listeners
 
    autoLoadEntities: true ,
cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    // entitiesDir:   'src/entity',
    migrationsDir: 'src/migrations',
  }
}

export = ORMConfig ;
