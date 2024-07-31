import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';

const ROOT_DIR = 'uploads';

const getUploadDir = (): string => {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const displayMonth = month < 10 ? `0${month}` : month;
  const dir = `${ROOT_DIR}/${year}-${displayMonth}`;
  return dir;
};

const storage = diskStorage({
  destination: async function (req, file, cb) {
    const dir = getUploadDir();
    try {
      await mkdirSync(ROOT_DIR);
      await mkdirSync(dir);
    } catch (e) {}

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = file.originalname;
    cb(null, uniqueSuffix);
  },
});

export { storage, getUploadDir };
