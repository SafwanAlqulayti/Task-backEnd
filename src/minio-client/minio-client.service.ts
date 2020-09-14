import { Injectable, Logger, HttpException, HttpStatus, Req, Res, NotAcceptableException, BadRequestException } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Stream } from 'stream';
import { config } from './config'
import { BufferedFile } from './file.model';
import * as crypto from 'crypto'
import { asap, async } from 'rxjs';
import { S3 } from 'aws-sdk';
import { InjectS3 } from 'nestjs-s3';

@Injectable()
export class MinioClientService {
  @InjectS3() private readonly s3: S3 
    // private readonly logger: Logger;
   private readonly baseBucket = config.MINIO_BUCKET


  // public get client() {
  //   return this.minio.client;
  // }

  // constructor(
  //   // private readonly minio: MinioService,
  // ) {
  //  }
async test(body ,baseBucket: string = this.baseBucket){
  var buf = await Buffer.from(body.image.replace(/^data:image\/\w+;base64,/, ""),'base64')
  var extension = body.extension
  var key = await new Date().getTime().toString() + "."+ extension;
  var bucket = baseBucket ;
  var data = {
      Key: key,
      Bucket: bucket,
      Body: buf,
      ContentEncoding: 'base64'

  };
  this.s3.putObject(data, function (err, data) {
  if (err) {
      console.log('error occured in saveToAwsBucket', err)

        throw BadRequestException
  } else {
 
      let imageUrl = "http://localhost:9000/" + bucket+ "/" + key;
      console.log("Successfully uploaded data to ", imageUrl);

    return imageUrl
  }
})
}
// getImage(bucket ,id){

//   var params = { Bucket: bucket, Key: id };
//   this.s3.getObject(params, function(err, data) {
 
//       console.log("-----", data.Body)
    
//   });
// }
}




 // public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
  //   if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
  //     throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
  //   }
  //   let temp_filename = Date.now().toString()
  //   let hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
  //   let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
  //   const metaData = {
  //     'Content-Type': file.mimetype,
  //     'X-Amz-Meta-Testing': 1234,
  //   };

  //   let filename = hashedFileName + ext
  //   const fileName: string = `${filename}`;
  //   const fileBuffer = file.buffer;
  //   this.client.putObject(baseBucket,fileName,fileBuffer,metaData, function(err, res) {
  //     if(err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
  //   })

  //   return {
  //     url: `${config.MINIO_ENDPOINT}:${config.MINIO_PORT}/${config.MINIO_BUCKET}/${filename}` 
  //   }
  // }

//   async delete(objetName: string, baseBucket: string = this.baseBucket) {
//     this.client.removeObject(baseBucket, objetName, function(err, res) {
//       if(err) throw new HttpException("Oops Something wrong happend", HttpStatus.BAD_REQUEST)
//     })

// }