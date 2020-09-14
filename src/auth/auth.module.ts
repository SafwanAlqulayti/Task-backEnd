import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config'
const jwtConfig = config.get('jwt')
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({//now we can use all jwt services 
      secret: 'secret',
      signOptions:{
        expiresIn:360000 ,
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ], 
  providers: [AuthService,
  JwtStrategy
  ],
  controllers: [AuthController],
  exports:[
    JwtStrategy, // to make available to other modules
    PassportModule
  ]
})
export class AuthModule {}
