import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredintealsDto } from './dto/auth-credintials.dto';
 import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interface';
import { I18nRequestScopeService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserRepository )
        private userRepo:UserRepository,
        private jwtServise:JwtService ,
        private i18n:I18nRequestScopeService
    ){}
async signUp(authCredentials:AuthCredintealsDto):Promise<void>{
return await this.userRepo.signUp(authCredentials)
}
async signIn(authCredentials:AuthCredintealsDto):Promise<{accessToken:string}>{
    const username = await this.userRepo.validationUserpassword(authCredentials)
   if(!username){
       const err = await this.i18n.translate('greeting.keywords.CREDENTIALS')
       throw new UnauthorizedException(err)
   }

   const payload:jwtPayload = {username} // we can also add role email to make avilable to the frontend developers
   const accessToken = await this.jwtServise.sign(payload)
   return {accessToken}
}

}
