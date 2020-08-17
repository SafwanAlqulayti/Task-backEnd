import{PassportStrategy}from '@nestjs/passport';
import{Strategy ,ExtractJwt} from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { jwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { throws } from 'assert';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor(
    @InjectRepository(UserRepository)
    private userRepo:UserRepository
){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'topSecret51'
    });
}
async validate(payload:jwtPayload):Promise<User>{// return type 
    const {username}=payload //username already verified and checked through signIn method
    const user = this.userRepo.findOne({username})
    if(!user){
        throw new UnauthorizedException();
    }
        return user
}
}