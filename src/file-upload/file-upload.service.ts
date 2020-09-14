import { Injectable, Req, Res } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { InjectS3, S3 } from 'nestjs-s3';
import { MinioService } from 'nestjs-minio-client';

@Injectable()

export class FileUploadService {
 
  constructor(
    // private readonly minio: MinioService,
    private minioClientService: MinioClientService,
    @InjectS3()  private readonly s3: S3,

  ) {}

  // async uploadSingle(image: BufferedFile) {

  //   let uploaded_image = await this.minioClientService.upload(image)

  //   return {
  //     image_url: uploaded_image.url,
  //     message: "Successfully uploaded to MinIO S3"
  //   }
  // }


async test(body) {
 
   await this.minioClientService.test(body)

   return {
     message: "image uploaded successfully"
   }
  //  var buf = await Buffer.from(body.image.replace(/^data:image\/\w+;base64,/, ""),'base64')
  //  var extension = body.extension
  //  var key = await new Date().getTime().toString() + "."+ extension;
  //  var bucket = body.bucket;
  //  var data = {
  //      Key: key,
  //      Bucket: bucket,
  //      Body: buf,
  //      ContentEncoding: 'base64'

  //  };
  //  this.client.putObject(data)
  //  this.s3.putObject(data, function (err, data) {
 
  //       console.log("Successfully uploaded data to myBucket/myKey", key);

  //       let imageUrl = "http://localhost:9000/test/" + bucket+ "/" + key;
  //       console.log("---------", imageUrl)
  //      return     imageUrl

      
  //   })

}
 
}