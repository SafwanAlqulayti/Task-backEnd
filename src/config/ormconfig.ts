import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import * as config from 'config'
import { printCommonLine } from 'jest-diff/build/printDiffs'
 
const dbConfig = config.get('db')
const ORMConfig: TypeOrmModuleOptions={
type: dbConfig.type || process.env.DB_TYPE,
host: dbConfig.host || process.env.DB_HOST,
port: dbConfig.port || process.env.DB_PORT ,
username: 'postgres',
password: '123456',
database: dbConfig.database,
logging: true,
entities: [__dirname + '/../**/*.entity.{ts,js}'],
synchronize: false,
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
