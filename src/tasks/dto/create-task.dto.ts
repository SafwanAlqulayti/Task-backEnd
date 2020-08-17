import {IsNotEmpty} from 'class-validator';
export class CreateTaskDto {

    // id: string;
    @IsNotEmpty()
    title: string ;
    description: string;

}