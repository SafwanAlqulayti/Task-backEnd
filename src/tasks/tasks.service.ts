import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { query } from 'express';
import { objectTypeCallProperty } from '@babel/types';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
import { UpdateResult } from 'typeorm';
 @Injectable()
export class TasksService {
     constructor(
         @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

       async getTasks(filterDto:GetTaskFilterDto
        , user:User 
        ):Promise<Task[]>{
            // const {status ,search} = filterDto
            // const query = this.taskRepository.createQueryBuilder('task')//refer to task entity
            // if(status){
            //     query.andWhere('task.status = :status',{status})
            // }
            // if(search){
            //     query.andWhere('(task.title LIKE :search OR task.description LIKE :search)',{search: `%search%`})// if we want to search for part of the title we have to use %%
            // }
            // const tasks = await query.getMany()
            return  this.taskRepository.getTasks(filterDto,user) 
        }    

        async getTaskById(id:number,
            user:User
            ):Promise<Task>{
           
                     const found = await this.taskRepository.findOne({where:{id ,userId:user.id}} )
 
                    if(!found){
                     throw new NotFoundException(`Task with ID ${id} is Not found`);
                                  
                    }
                        return   found
           }
                  
             //    return await this.taskRepository.createTask(createTaskDto);
            async createTask(createTaskDto:CreateTaskDto,
                 user:User ,
                 translaion:string
                ){
            //     const {title,description} = createTaskDto ;
            //     const task = new Task() ;
            //     task.title = title ;
            //     task.description = description;
            //     task.status = TaskStatus.Done ;
            //    await this.taskRepository.save(task) ;
            //    return task;
               return this.taskRepository.createTask(createTaskDto,user,translaion)
           }
        async deleteTask(id:number,
            user:User
            ):Promise<void>{
            const result = await this.taskRepository.delete({id,userId:user.id})
            if(result.affected === 0){
                throw new NotFoundException(`Task with ID ${id} is Not found`);

            }
            
        }
        async updateTask(id:number , status: TaskStatus,
            user:User
           ):Promise<Task>{
            const found = await this.getTaskById(id,user)
            found.status = status 
            await found.save()
            return found
        }
    }
//     getAllTasks(): Task[] {
//     return this.tasks ; 
//     }
//     getTaskWithFilter(filterDto:GetTaskFilterDto): Task[] {
//         const {status , search   } = filterDto;
//         let tasks = this.getAllTasks()
//         if(status){
//             tasks = tasks.filter(task => task.status === status)
//         }
//         if(search){
//             tasks = tasks.filter(task=> 
//               task.title.includes(search) ||
//               task.description.includes(search) 
//                  )
//         }
//         return tasks
//       }
//     getTaskById(id:string):Task{
//      const found =  this.tasks.find(task=> task.id === id)
//      const errors = {Task: ' not found'};
//     if(!found){
//         throw new NotFoundException(`Task with ID ${id} is Not found`);
          
//     } 
//      return   found
//     }
//     creatTask(creatTaskDo: CreateTaskDto){
// const {title ,description} = creatTaskDo ;
// const task: Task ={
// id:uuidv4(),
 
// title,
// description ,
// status: TaskStatus.Open
// }
// this.tasks.push(task)
// return task
//     }

//     updateTask(id:string , status:TaskStatus):Task{
//         const task = this.getTaskById(id)
//         task.status = status
//         return task
//     }
//     deleteTask(id:string):void{
//         const found = this.getTaskById(id)
//         this.tasks = this.tasks.filter(task => task.id !== found.id)
          
//     }
