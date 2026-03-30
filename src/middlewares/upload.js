import { errorFormatter } from "./errorHandler.js";

let multerModulePromise;

async function getMulter() {
  if (!multerModulePromise) {
    multerModulePromise = import("multer")
      .then((module) => module.default || module)
      .catch(() => null);
  }

  return multerModulePromise;
}

export const uploadProduitImage = async (req, res, next) => {
  if (!req.is("multipart/form-data")) {
    next();
    return;
  }

  const multer = await getMulter();

  if (!multer) {
    next(
      errorFormatter({
        status: 500,
        message: "Le support upload n'est pas disponible. Installez la dependance multer avec npm install.",
      })
    );
    return;
  }

  const storage = multer.memoryStorage();

  const upload = multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (request, file, cb) => {
      if (file.mimetype?.startsWith("image/")) {
        cb(null, true);
        return;
      }

      cb(errorFormatter({ status: 400, message: "Le fichier doit etre une image." }));
    },
  });

  upload.single("image")(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        next(errorFormatter({ status: 400, message: "L'image ne doit pas depasser 5 Mo." }));
        return;
      }

      next(errorFormatter({ status: 400, message: error.message }));
      return;
    }

    next(error);
  });
};
