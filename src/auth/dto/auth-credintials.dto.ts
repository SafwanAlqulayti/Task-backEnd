import { IsString, MinLength, MaxLength, MATCHES, Matches } from "class-validator";

export class AuthCredintealsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    username:string;
    @MinLength(6)
    @MaxLength(16)
    //  @Matches(/((?=.*\d)|(?=.*\w+))/)
    password:string
}