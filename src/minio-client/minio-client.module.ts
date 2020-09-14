import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { config } from './config';
import { S3Module } from 'nestjs-s3';
import { MinioClientController } from './minio-client.controller';

@Module({
  imports: [
    // MinioModule.register({
    //   endPoint: config.MINIO_ENDPOINT,
    //   port: config.MINIO_PORT,
    //   useSSL: false,
    //   accessKey: config.MINIO_ACCESSKEY,
    //   secretKey: config.MINIO_SECRETKEY,
    // }) ,
 
 S3Module.forRoot({
  config: {
      accessKeyId: 'minioadmin',
      secretAccessKey: 'minioadmin',
      endpoint: 'http://127.0.0.1:9000',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
  },
}), ],
  providers: [MinioClientService],
  exports: [MinioClientService],
  controllers: [MinioClientController]
})
export class MinioClientModule {}