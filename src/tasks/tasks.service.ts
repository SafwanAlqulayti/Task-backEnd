import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { query } from 'express';
import { objectTypeCallProperty } from '@babel/types';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entity/task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../entity/user.entity';
import { UpdateResult } from 'typeorm';
import { I18nService, I18nRequestScopeService } from 'nestjs-i18n';
 @Injectable()
export class TasksService {
     constructor(
         @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
        private i18n : I18nRequestScopeService
    ){}

       async getTasks(//filterDto:GetTaskFilterDto
         user:User 
        ):Promise<Task[]>{
       
            return  this.taskRepository.getTasks(user) 
        }    

        async getTaskById(id:number,
            user:User
            ):Promise<Task>{
           
                     const found = await this.taskRepository.findOne({where:{id ,userId:user.id}} )
 
                    if(!found){
                        const err = await this.i18n.translate('greeting.keywords.ERROR')
                     throw new NotFoundException(err);//`Task with ID ${id} is Not found`
                                  
                    }  
                        return   found
           }
                  
            async createTask(createTaskDto:CreateTaskDto,
                 user:User ,
                 translaion:string
                ){

               return this.taskRepository.createTask(createTaskDto,user,translaion)
           }
        async deleteTask(id:number,
            user:User
            ):Promise<void>{
            const result = await this.taskRepository.delete({id,userId:user.id})
            if(result.affected === 0){
                const err = await this.i18n.translate('greeting.keywords.ERROR')
                throw new NotFoundException(err);

            }
     
            
        }



        // remove = async (id:number)=>{
        //         const err = await this.i18n.translate('greeting.keywords.ERROR')

        //     try{
        //         await this.taskRepository.delete(id)
        //         if(await this.taskRepository.findOne(id) == null)  throw new NotFoundException(err);
                   

                
        //     }catch(error){
        //         // console.log('test')
        //         return error
        //     }
        // }
        async updateTask(id:number , status: TaskStatus,
            user:User
           ):Promise<Task>{
            const found = await this.getTaskById(id,user)
            found.status = status 
            await found.save()
            return found
        }



    }
