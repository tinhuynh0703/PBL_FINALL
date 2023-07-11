import { Injectable } from '@nestjs/common';
// import { S3Client } from "@aws-sdk/client-s3";
import { AppConfigService } from '../../common/config/config.service';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AwsService {
  constructor(private appConfigService: AppConfigService) {}

  s3Client = new AWS.S3({
    region: this.appConfigService.region,
    accessKeyId: this.appConfigService.accessKeyId,
    secretAccessKey: this.appConfigService.secretAccessKey,
  });

  async getSignedUrl() {
    const uuidKey = uuidv4();

    return this.s3Client.getSignedUrl('putObject', {
      Bucket: 'image-storage-nd52',
      ContentType: 'jpeg',
      Key: uuidKey,
    });

  }
}
