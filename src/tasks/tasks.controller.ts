import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
 import { Task, TaskStatus } from './task.model';
// import { Task } from '../../dist/tasks/task.model';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pip';

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService){} //private to only apply changes in tasksServicces component

    @Get()
getTasks(@Query(ValidationPipe) filterDto:GetTaskFilterDto){//Search , check both the status and and search through the pipe
    if(Object.keys(filterDto).length){//check if any keys is provided
        return this.taskService.getTaskWithFilter(filterDto)
    }else{
        return this.taskService.getAllTasks()
    }
}
@Get(':id')
getOneTask(@Param('id') id:string){
    return this.taskService.getTaskById(id)
}
@Post()
@UsePipes(ValidationPipe)
createTask(@Body() createTaskDto:CreateTaskDto):Task{
return this.taskService.creatTask(createTaskDto)
}
@Patch(':id')
    updateTask(@Param('id') id:string ,@Body('status', TaskStatusValidationPipe) status:TaskStatus):Task{
        return this.taskService.updateTask(id , status)
    }
 
 @Delete(':id')
 deleteTask(@Param('id') id:string) {
     return this.taskService.deleteTask(id)
 }   
}


