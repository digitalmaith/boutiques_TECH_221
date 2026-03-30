import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";
import httpError from "../utils/httpError.js";
import { MAX_FILE_SIZE, allowedMimeTypes } from "../middlewares/upload.js";

function bufferToStream(buffer) {
  return Readable.from(buffer);
}

async function uploadImage(file, options = {}) {
  if (!file) {
    throw httpError(400, "Aucun fichier fourni");
  }

  const { mimetype, size, buffer, originalname } = file;

  if (!allowedMimeTypes.includes(mimetype)) {
    throw httpError(400, "Type d'image invalide. Formats acceptes: jpeg, png");
  }

  if (typeof size === "number" && size > MAX_FILE_SIZE) {
    throw httpError(400, "Fichier trop volumineux (max 2 Mo)");
  }

  if (!buffer) {
    throw httpError(400, "Fichier invalide");
  }

  const { folder = "uploads", publicId } = options;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: "image",
        use_filename: true,
        filename_override: originalname,
      },
      (error, result) => {
        if (error) {
          return reject(httpError(500, "Erreur upload Cloudinary", error));
        }
        return resolve(result);
      }
    );

    bufferToStream(buffer).pipe(stream);
  });
}

// ✅ Nouvelle fonction — supprime une image Cloudinary depuis son URL
async function deleteImage(photoUrl) {
  if (!photoUrl) return;
  // https://res.cloudinary.com/<cloud>/image/upload/v123/employes/photo.jpg
  // → public_id = "employes/photo"
  const parts = photoUrl.split("/");
  const folderAndFile = parts.slice(-2).join("/");
  const publicId = folderAndFile.replace(/\.[^/.]+$/, "");
  await cloudinary.uploader.destroy(publicId);
}

export default {
  uploadImage,
  deleteImage,
  MAX_FILE_SIZE,
  allowedMimeTypes,
};
