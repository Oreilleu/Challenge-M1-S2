import multer from "multer";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const extention = `.${file.mimetype.split("/")[1]}`;
    const nameFile = file.originalname.replace(extention, "");
    cb(null, `${nameFile}${extention}`);
  },
});
