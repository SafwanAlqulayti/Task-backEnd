import { Repository, EntityRepository } from "typeorm";
import { Injectable, NotFoundException, HttpException } from '@nestjs/common';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from "./task-status.enum";
import { User } from '../auth/user.entity';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(filterDto:GetTaskFilterDto,
        user:User
        ):Promise<Task[]>{
        const {status ,search} = filterDto
        const query = this.createQueryBuilder('task')//refer to task entity
        query.where('task.userId = :userId',{userId: user.id})//it will only show the realeted idd to the user

        if(status){
            query.andWhere('task.status = :status',{status})
        }
        if(search){
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)',{search: `%search%`})// if we want to search for part of the title we have to use %%
        }
        const tasks = await query.getMany()
        return tasks ;
    }
    // async getTaskById(id:number):Promise<Task>{
    //     const found = await this.findOne(id)
 
    //     if(!found){
    //      throw new NotFoundException(`Task with ID ${id} is Not found`);
                      
    //     }
    //         return   found
    // }

    async createTask(createTaskDto:CreateTaskDto,
        user: User,
        translation:string
        ){
        const {title,description} = createTaskDto ;
        const task = new Task() ;
        task.title = title ;
        task.description = description;
        task.status = TaskStatus.Done ;
        task.user = user ;
       await task.save() ;
       delete task.user //to remove it from response 
       return `${task.title} ${translation}`;
    }
}
