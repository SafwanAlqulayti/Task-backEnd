import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
 

@Entity()
export class TaskHistory extends BaseEntity {
@PrimaryGeneratedColumn()
id:number;
@Column()
taskId: number ;
 

}