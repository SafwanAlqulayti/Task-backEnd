import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredintealsDto } from './dto/auth-credintials.dto';
 import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interface';
import { I18nRequestScopeService } from 'nestjs-i18n';
const axios = require('axios').default;
import { api } from './api'


// const instance = axios.create({
//     baseURL: 'https://api.wathq.sa/v1/attorney/',
//     timeout: 50000,
//     headers: {"accept": "application/json","apiKey":process.env.APP_KEY,
//     }
//     });
@Injectable()
export class AuthService {

    constructor (
        @InjectRepository(UserRepository )
        private userRepo:UserRepository,
        private jwtServise:JwtService ,
        private i18n:I18nRequestScopeService
    ){

    }

async signUp(authCredentials:AuthCredintealsDto):Promise<void>{
return await this.userRepo.signUp(authCredentials)
}
async signIn(authCredentials:AuthCredintealsDto):Promise<{accessToken:string}>{
    const username = await this.userRepo.validationUserpassword(authCredentials)
   if(!username){
       const err = await this.i18n.translate('greeting.keywords.CREDENTIALS')
       console.log('testAuth')
     throw new UnauthorizedException(err)
     
   }

   const payload:jwtPayload = {username} // we can also add role email to make avilable to the frontend developers
   const accessToken = await this.jwtServise.sign(payload)
   console.log("ll")
   return {accessToken}
 

}


 async attorneyApi(id){
     const url = process.env.ATTORNEY_URL
     const tag = 'info'
   const res = await api(id ,url ,tag)
   console.log(res.data)
    return res.data
 
}
async commercialregistration(id){
    const url = process.env.COMER_URL
    const tag = 'address' 
    const res = await api(id , url , tag)
    console.log(res.data.general)
    return res.data.general
}
}
// test(){
//     instance.get(`'info/${555}`).then(function(res){
//      if(res && res.data){
//     console.log(res.data)
//      }
//     }).catch(function(err){
//     console.log(err)
//     }) 
// }
// async test(){
//     const instance = axios.create({
//     baseURL: 'https:///',
//     timeout: 50000,
//     headers: {"accept": "application/json","apiKey":process.env.APP_KEY,
//     }
//     });
//     instance.get('address/'+1010228945).then(function(res){
//     console.log(res.data)
//     }).catch(function(err){
//     console.log(err)
//     })

// }

// const instance = axios.create({
//     baseURL: 'https://od-api.oxforddictionaries.com/api/v2/entries/',
//     timeout: 50000,
//     headers: {"Accept": "application/json","app_id":"2e1f8ec0","app_key":"4d3fb9840c38d0b2c67652f820547fc1",
//     }
//     });
//     instance.get('en-gb/ace?strictMatch=false').then(function(res){
//     console.log(res.data)
//     }).catch(function(err){
//     console.log(err)
//     })
