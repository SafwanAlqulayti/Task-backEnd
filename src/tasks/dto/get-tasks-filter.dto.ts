import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
  export class GetTaskFilterDto{
    @IsOptional()
    @IsIn([TaskStatus.Open ,TaskStatus.In_Progress,TaskStatus.Done])//IsIn check array
    status: TaskStatus;
    @IsOptional()
    @IsNotEmpty()
    search: string;
    
}