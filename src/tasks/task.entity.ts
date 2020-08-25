import { BaseEntity, Entity, UpdateEvent, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate, UpdateDateColumn } from "typeorm";
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
// import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { Logger } from '@nestjs/common';

@Entity()
export class Task extends BaseEntity {
    // @BeforeUpdate()
    // beforeUpdate()  {
    //     const s = "ss"
    //     this.track.values.(s)
        
    //   }
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string 
    @Column()
    description: string
    @Column()
    status: TaskStatus
    @ManyToOne(type=>User , user => user.tasks , {eager:false})
    user: User;
    @Column({nullable:true})
    userId:number
 
    @UpdateDateColumn()
    update:Date
    @UpdateDateColumn()
    updateDate: Date;
    // @Column()
    // track: []
    
     
}
