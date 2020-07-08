import fs from 'fs';
import path from 'path';
import aws, {S3} from 'aws-sdk';
import mime from 'mime';
import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { stringify } from 'qs';

class S3StorageProvider implements IStorageProvider {
  private client: S3;
  private bucketName: string;

  constructor(){
    this.client = new aws.S3({
      region: 'us-east-1'
    });
    this.bucketName = 'app-site-gob';
  }
  public async saveFile(file: string): Promise<string>{
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if(!ContentType){
      throw new Error('File does not exists!')
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client.putObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: ContentType,
    })
    .promise();

    await fs.promises.unlink(originalPath);

    return file;
  };

  public async deleteFile(file: string): Promise<void>{
    await this.client.deleteObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file
    }).promise();
  }
}

export default S3StorageProvider;
