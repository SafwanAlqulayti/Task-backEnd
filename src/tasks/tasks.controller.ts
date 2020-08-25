import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe, Param, Patch, Delete, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
 // import { Task } from '../../dist/tasks/task.model';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pip';
import { Task } from '../entity/task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../entity/user.entity';
import { json } from 'body-parser';
import { I18n, I18nContext,I18nService } from 'nestjs-i18n';
import { GetLang } from './GetLang';
 
@Controller('tasks')
 @UseGuards(AuthGuard())// we can use it in one handler , now we cant see tasks unless we have token
export class TasksController {
    constructor(private taskService:TasksService,
        private readonly _i18n: I18nService,
        ){} //private to only apply changes in tasksServicces component
    private logger = new Logger('TaskController')
    @Get()
getTasks(@Query(ValidationPipe) filterDto:GetTaskFilterDto,
@GetUser() user:User ,
):Promise<Task[]>{//Search , check both the status and and search through the pipe
    // if(Object.keys(filterDto).length){//check if any keys is provided
    //     return this.taskService.getTaskWithFilter(filterDto)
    // }else{
    //     return this.taskService.getAllTasks()
    // }
    this.logger.verbose(`the username is ${user.username} and the filter is ${JSON.stringify(filterDto)}`)
    return this.taskService.getTasks(filterDto , user)
}
@Get(':id')
getOneTask(
    @Param('id',ParseIntPipe) id:number,
@GetUser() user:User
): Promise<Task>{
    return this.taskService.getTaskById(id , user)
}
// @Get()
//  async getTest():Promise<string>{
//     const translation = await this._i18n.translate(
//         'greeting.keywords.ADD',
//         {
//             lang: 'ar',
//         },
//     );
//     return translation
//  }
@Post()
@UsePipes(ValidationPipe)
async createTask( 
    @Body() createTaskDto:CreateTaskDto,
    @GetUser() user:User ,
    @GetLang() lang
    ){
        const translation = await this._i18n.translate(
            'greeting.keywords.ADD',
            {
                lang: lang,
            },
        );
return this.taskService.createTask(createTaskDto , user ,translation)
}
@Patch(':id')
    updateTask(@Param('id' ,ParseIntPipe ) id:number ,@Body('status', TaskStatusValidationPipe) status:TaskStatus,
    @GetUser() user:User
    ):Promise<Task>{
        return this.taskService.updateTask(id , status, user)
    }
 
 @Delete(':id')
 deleteTask(@Param('id',ParseIntPipe) id:number,
 @GetUser() user:User):Promise<void> {
     return this.taskService.deleteTask(id,user)
 }   


}
