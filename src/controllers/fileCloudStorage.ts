import { Request, Response, NextFunction } from 'express';
import { Storage } from '@google-cloud/storage';
import base64MimeType from '../utils/base64MimeType';

const storage = new Storage();
const BUCKET_NAME = 'juancmandev-test-bucket';

export const uploadFileToCloudStorage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fileBase64 } = req.body;

  const file = storage.bucket(BUCKET_NAME).file('gcs.png');
  const fileOptions = {
    resumable: false,
    metadata: {
      contentType: base64MimeType(fileBase64),
    },
    validation: false,
  };

  const base64EncodedString = fileBase64.replace(/^data:\w+\/\w+;base64,/, '');
  const fileBuffer = Buffer.from(base64EncodedString, 'base64');

  await file.save(fileBuffer, fileOptions);
};
