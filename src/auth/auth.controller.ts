import { Controller, Get, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredintealsDto } from './dto/auth-credintials.dto';
import { AuthService } from './auth.service';
 

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentials:AuthCredintealsDto):Promise<void>{
        // console.log(authCredentials)
        return this.authService.signUp(authCredentials)
    }
    @Post('/signin')
    signIn(@Body() authCredintealsDto:AuthCredintealsDto):Promise<{accessToken:string}>{
        return this.authService.signIn(authCredintealsDto)

    }
 

}
