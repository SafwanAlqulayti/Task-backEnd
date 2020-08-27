import { BaseEntity, Entity, UpdateEvent, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate, UpdateDateColumn, EntityManager } from "typeorm";
import { TaskStatus } from '../tasks/task-status.enum';
import { User } from './user.entity';
// import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { Logger } from '@nestjs/common';
import { query } from 'express';

@Entity()
export class Task extends BaseEntity {
    @BeforeUpdate()
    beforeUpdate()  {
      // find the old value and save in the new table task id value 
     const statusBefore = this.status  ;
     const r = BaseEntity
     console.log(statusBefore)
        console.log("---------")
      }
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
