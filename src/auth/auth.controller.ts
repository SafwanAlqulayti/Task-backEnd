import { Controller, Get, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredintealsDto } from './dto/auth-credintials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
// import { GetUser } from './get-user.decorator';
// import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentials:AuthCredintealsDto):Promise<void>{
        console.log(authCredentials)
        return this.authService.signUp(authCredentials)
    }
    @Post('/signin')
    signIn(@Body() authCredintealsDto:AuthCredintealsDto):Promise<{accessToken:string}>{
        return this.authService.signIn(authCredintealsDto)

    }
    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user:User){
    //     console.log(user)
    // }

}
