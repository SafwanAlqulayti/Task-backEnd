import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { query } from 'express';
import { objectTypeCallProperty } from '@babel/types';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TasksService {
    private tasks:Task[] =[];


    getAllTasks(): Task[] {
    return this.tasks ; 
    }
    getTaskWithFilter(filterDto:GetTaskFilterDto): Task[] {
        const {status , search   } = filterDto;
        let tasks = this.getAllTasks()
        if(status){
            tasks = tasks.filter(task => task.status === status)
        }
        if(search){
            tasks = tasks.filter(task=> 
              task.title.includes(search) ||
              task.description.includes(search) 
                 )
        }
        return tasks
      }
    getTaskById(id:string):Task{
     const found =  this.tasks.find(task=> task.id === id)
     const errors = {Task: ' not found'};
    if(!found){
        throw new NotFoundException(`Task with ID ${id} is Not found`);
          
    } 
     return   found
    }
    creatTask(creatTaskDo: CreateTaskDto){
const {title ,description} = creatTaskDo ;
const task: Task ={
id:uuidv4(),
 
title,
description ,
status: TaskStatus.Open
}
this.tasks.push(task)
return task
    }

    updateTask(id:string , status:TaskStatus):Task{
        const task = this.getTaskById(id)
        task.status = status
        return task
    }
    deleteTask(id:string):void{
        const found = this.getTaskById(id)
        this.tasks = this.tasks.filter(task => task.id !== found.id)
          
    }
}
