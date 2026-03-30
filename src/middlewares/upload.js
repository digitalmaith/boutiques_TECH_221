import multer from "multer";
import httpError from "../utils/httpError.js";

const MAX_FILE_SIZE = 2 * 1024 * 1024; 
const allowedMimeTypes = ["image/jpeg", "image/png"];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(httpError(400, "Type d'image invalide. Formats acceptes: jpeg, png"));
  }
  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

function multerErrorHandler(err, req, res, next) {
  if (err?.name === "MulterError" && err.code === "LIMIT_FILE_SIZE") {
    return next(httpError(400, "Fichier trop volumineux (max 2 Mo)"));
  }
  return next(err);
}

export { upload, multerErrorHandler, MAX_FILE_SIZE, allowedMimeTypes };
