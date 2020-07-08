import path from 'path';
import multer, { StorageEngine} from 'multer';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..','..','temp');

interface IUploadConfig {
  tmpFolder: string;
  uploadsFolder: string;
  driver: 's3' | 'disk';
  multer: { storage: StorageEngine };
  config:{
    disk: {  };
    aws: {
      bucket: string;
    }
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder,'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null,fileName);
      },
    }),
  },

  config: {
    disk: { },
    aws: {
      bucket: 'app-site-gob'
    }
  }
} as IUploadConfig;
