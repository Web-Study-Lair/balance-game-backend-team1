import { PayloadTooLargeException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'uploadImages';
      if (!existsSync(uploadPath)) {
        // uploadImages 폴더가 존재하지 않을시, 생성합니다.
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),

  // FIXME: callback type 처리 잘 할 것
  fileFilter: (req, file: Express.Multer.File, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return callback(new Error('이미지 파일만 업로드 가능합니다.'), false);
    }
    if (file.size > 1000) {
      return callback(
        new PayloadTooLargeException(
          '이미지 파일은 1MB 이하로 업로드 가능합니다.',
        ),
        false,
      );
    }

    callback(null, true);
  },
};
