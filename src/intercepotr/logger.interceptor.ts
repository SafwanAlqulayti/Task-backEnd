// import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {//observable wait for the handller response
//     console.log('Before...');

//     const now = Date.now();
//     return next
//       .handle()
//       .pipe(
//         tap(() => console.log(`After... ${Date.now() - now}ms`)),
//       );
//   }
// }

import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { tap } from 'rxjs/operators'
import { format } from 'util';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now(); // Request start time

    return next.handle().pipe(tap((response) => {
     
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const headers = ctx.getRequest().headers;

      Logger.log(format(
        '%s %s %s %s%dms %s',
        'method: ' + request.method,
        '| host: ' + headers.host,
        '| url: ' + request.url,
        '| time: ',
        Date.now() - start,
        '| response: ' + JSON.stringify(response),
      ),
      "LoggingInterceptor");


    }));
  }
}