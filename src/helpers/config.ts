import { diskStorage } from 'multer';

export const storageConfig = (folder: string) => {
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, `uploads/${folder}`);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    }),
  };
};
