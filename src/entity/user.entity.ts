import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from './task.entity';
 @Entity()
@Unique(['username'])
export class User extends BaseEntity{
@PrimaryGeneratedColumn()
id:number ;
@Column()
username: string ;
@Column()
password:string;
@Column()
salt:string
@Column({nullable:true})
teswt:string
@OneToMany(type=>Task, task=> task.user ,{eager:true}) //eager allow as to access user.tasks and it cant be true in both side   
tasks: Task[];

async validatePassword(password:string):Promise<Boolean>{
    const hash = await bcrypt.hash(password,this.salt)
    return hash === this.password
}
}