import { BadRequestException, Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private s3: S3Client;
  private bucketName: string;
  private s3Endpoint: string;

  constructor() {
    const accessKey = process.env.AWS_ACCESS_KEY;
    const secretKey = process.env.AWS_SECRET_KEY;
    this.s3Endpoint = process.env.S3_ENDPOINT;
    const region = process.env.AWS_REGION;
    this.bucketName = process.env.AWS_BUCKET_NAME;

    this.s3 = new S3Client({
      region: region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      endpoint: this.s3Endpoint,
      forcePathStyle: true,
    });
  }

  async generateSignedPutUrl(expiresIn: number = 60 * 60): Promise<{
    key: string;
    signedUrl: string;
  }> {
    const key = uuidv4();
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const signedUrl = await getSignedUrl(this.s3, command, { expiresIn });
    return {
      key,
      signedUrl,
    };
  }

  async generatePublicUrl(objectKey: string) {
    const baseUrl = process.env.S3_PUBLIC_BASE_URL;
    await this.getObject(objectKey);
    const path = `${baseUrl}/${this.bucketName}/${objectKey}`;
    return path;
  }

  async getObject(key: string): Promise<GetObjectCommandOutput> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      return await this.s3.send(command);
    } catch (err) {
      throw new BadRequestException('Enter valid object key');
    }
  }
}
