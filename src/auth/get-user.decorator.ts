import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entity/user.entity';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
         const req = ctx.switchToHttp().getRequest();
         console.log(req.rawHeaders[1])
         return req.user;
    });