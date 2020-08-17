import { Repository, Entity, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredintealsDto } from './dto/auth-credintials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { asap, async } from 'rxjs';
import { threadId } from 'worker_threads';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
async signUp(authCredentialsDto:AuthCredintealsDto):Promise<void>{
const {username, password} = authCredentialsDto 
const user = new User();
 
user.username = username 
user.salt = await bcrypt.genSalt()
user.password = await this.hashPassword(password,user.salt)
console.log(user.password)
try{
    await user.save()

}catch(error){
if(error.code==='23505'){//duplicate code
    throw new ConflictException('Username is already exist')
}else{
    throw new InternalServerErrorException()
}
}



}
async validationUserpassword(authCredentialsDto:AuthCredintealsDto):Promise<string>{
    const {username ,password}= authCredentialsDto
    const user =  await this.findOne({username})
    if(user && await user.validatePassword(password)){
        return user.username
    }else{
        return null
    }
}
private async hashPassword(password:string ,salt:string):Promise<string> {
    return bcrypt.hash(password,salt)
    
}
}
