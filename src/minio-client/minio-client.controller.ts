import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';

@Controller('minio-client')
export class MinioClientController {
constructor(private minioServ:MinioClientService){}
    @Post("/image")
    async index(@Body() body) {
     
      this.minioServ.test(body)
   
    }
//     @Get('/image/:bucket/:id')
//     async image(@Param('id') id: string, @Param('bucket') bucket: string) {
//      return this.minioServ.getImage(bucket,id)
   

//    }
}
