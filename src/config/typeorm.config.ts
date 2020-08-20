import {TypeOrmModuleOptions} from '@nestjs/typeorm'
 const ORMConfig: TypeOrmModuleOptions={
type: 'postgres',
host: 'localhost',
port: 5432 ,
username: 'postgres',
password: '123456',
database: 'task',
entities: [__dirname + '/../**/*.entity.{ts,js}'],
synchronize: false,
migrationsRun: true,//run it automatically
logging: true,
logger: 'file',
migrations: [__dirname + '/migrations/**/*{.ts,.js}'], //load migrations
cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  }
}

export =  ORMConfig ;
