import {TypeOrmModuleOptions} from '@nestjs/typeorm'
  const ORMConfig: TypeOrmModuleOptions={
type: 'postgres',
host: 'localhost',
port: 5432 ,
username: 'postgres',
password: '123456',
database: 'TaskBackend',
logging: true,
entities: [__dirname + '/../**/*.entity.{ts,js}'],
synchronize: false,
migrationsRun: true,//run it automatically
 migrations: [__dirname + '/migrations/**/*{.ts,.js}'], //load migrations
//  migrations: ['src/migrations/*{.ts,.js}'], //load migrations  
  
subscribers: [ __dirname +'/**/**.subscriber{.ts,.js}/..'], // for entity listeners
// subscribers: [TaskSubscriber], // for entity listeners

// subscribers: [TaskSubscriber],
autoLoadEntities: true ,


// migrations: [
//   "build/migration/*.js"
// ],
cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    // entitiesDir:   'src/entity',
    migrationsDir: 'src/migrations',
  }
}

export = ORMConfig ;
