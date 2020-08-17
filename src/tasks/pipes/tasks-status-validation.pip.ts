import { PipeTransform, BadRequestException} from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";
import { TasksModule } from "../tasks.module";

 
export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        TaskStatus.Done ,
        TaskStatus.Open ,
        TaskStatus.In_Progress ,

    ]
transform(value: any ){
    value = value.toUpperCase()
if(!this.isStatusValid(value)){
    throw new BadRequestException(`${value} is an invalid status`)
}
  return value ; 
}
private isStatusValid(status:any){
    const check = this.allowedStatus.indexOf(status)
    return check !== -1
}
}