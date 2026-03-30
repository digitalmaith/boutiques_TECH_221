import env from "../config/env.js";

class CloudinaryService {
  async uploadImage(file, folder = "produits") {
    if (!file) {
      return null;
    }

    if (!env.cloudinaryCloudName || !env.cloudinaryUploadPreset) {
      throw new Error(
        "La configuration Cloudinary est incomplete. Ajoutez CLOUDINARY_CLOUD_NAME et CLOUDINARY_UPLOAD_PRESET.",
        { cause: { status: 500 } }
      );
    }

    const formData = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype });

    formData.append("file", blob, file.originalname);
    formData.append("upload_preset", env.cloudinaryUploadPreset);
    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${env.cloudinaryCloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Erreur lors de l'upload de l'image.", {
        cause: { status: 400 },
      });
    }

    return result.secure_url;
  }
}

export default new CloudinaryService();
