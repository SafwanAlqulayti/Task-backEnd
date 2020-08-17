import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredintealsDto } from './dto/auth-credintials.dto';
import { unionTypeAnnotation } from '@babel/types';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserRepository )
        private userRepo:UserRepository,
        private jwtServise:JwtService
    ){}
async signUp(authCredentials:AuthCredintealsDto):Promise<void>{
return await this.userRepo.signUp(authCredentials)
}
async signIn(authCredentials:AuthCredintealsDto):Promise<{accessToken:string}>{
    const username = await this.userRepo.validationUserpassword(authCredentials)
   if(!username){
       throw new UnauthorizedException('invalid credeintials')
   }
//    }else {
//        return username
//    }
   const payload:jwtPayload = {username} // we can also add role email to make avilable to the frontend developers
   const accessToken = await this.jwtServise.sign(payload)
   return {accessToken}
}
}
