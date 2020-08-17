import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
 // import { Task } from '../../dist/tasks/task.model';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pip';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())// we can use it in one handler , now we cant see tasks unless we have token
export class TasksController {
    constructor(private taskService:TasksService){} //private to only apply changes in tasksServicces component

    @Get()
getTasks(@Query(ValidationPipe) filterDto:GetTaskFilterDto):Promise<Task[]>{//Search , check both the status and and search through the pipe
    // if(Object.keys(filterDto).length){//check if any keys is provided
    //     return this.taskService.getTaskWithFilter(filterDto)
    // }else{
    //     return this.taskService.getAllTasks()
    // }
    return this.taskService.getTasks(filterDto)
}
@Get(':id')
getOneTask(@Param('id',ParseIntPipe) id:number): Promise<Task>{
    return this.taskService.getTaskById(id)
}
@Post()
@UsePipes(ValidationPipe)
async createTask(@Body() createTaskDto:CreateTaskDto):Promise<Task>{
return this.taskService.createTask(createTaskDto)
}
@Patch(':id')
    updateTask(@Param('id' ,ParseIntPipe ) id:number ,@Body('status', TaskStatusValidationPipe) status:TaskStatus):Promise<Task>{
        return this.taskService.updateTask(id , status)
    }
 
 @Delete(':id')
 deleteTask(@Param('id',ParseIntPipe) id:number):Promise<void> {
     return this.taskService.deleteTask(id)
 }   


}
