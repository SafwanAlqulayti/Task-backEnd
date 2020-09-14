import { Controller, Post, UseInterceptors, UploadedFile, Req, Res, HttpStatus, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { FileUploadService } from './file-upload.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { Test } from '@nestjs/testing';

@Controller('file-upload')
export class FileUploadController {
  constructor(
    private fileUploadService: FileUploadService
  ) {}

  // @Post('single')
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadSingle(
  //   @UploadedFile() image: BufferedFile
  // ) {
  //   return await this.fileUploadService.uploadSingle(image)
  // }


  
  // @Post("/image")
  // async index(@Body() body) {
   
  //   this.fileUploadService.test(body)
  //   // res.status(HttpStatus.OK).json(req.body);

  // }
}