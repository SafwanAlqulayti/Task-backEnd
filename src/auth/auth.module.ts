import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({//now we can use all jwt services 
      secret:'Secret',
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
