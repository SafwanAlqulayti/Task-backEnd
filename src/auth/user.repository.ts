import { Repository, Entity, EntityRepository,createConnection } from 'typeorm';
import { User } from '../entity/user.entity';
import { AuthCredintealsDto } from './dto/auth-credintials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { asap, async } from 'rxjs';
import { threadId } from 'worker_threads';
 @EntityRepository(User)
export class UserRepository extends Repository<User> {
async signUp(authCredentialsDto:AuthCredintealsDto){
// const {username, password} = authCredentialsDto 
// const user = new User;//to create new instance for the User Entity
//         user.username = username 
//         user.salt = await bcrypt.genSalt()
//         user.password = await this.hashPassword(password,user.salt)
    
//                 await this.save(user)
//            console.log("user is saved")
           const {username, password} = authCredentialsDto 
           const user = new User();
           user.username = username 
           user.salt = await bcrypt.genSalt()
           user.password = await this.hashPassword(password,user.salt)
           console.log(user.password)
            
           //  try{
           
               await user.save()
           console.log("user is saved")

    
}

async validationUserpassword(authCredentialsDto:AuthCredintealsDto):Promise<string>{
    const {username ,password}= authCredentialsDto
    const user =  await this.findOne({username})
    if(user && await user.validatePassword(password)){// after passing the password we checked the hashed value with the saved password
        return user.username
    }else{
        return null
    }
}
private async hashPassword(password:string ,salt:string):Promise<string> {
    return bcrypt.hash(password,salt)
    
}
}