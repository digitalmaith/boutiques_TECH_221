import uploadService from "../services/upload.service.js";
import response from "../utils/response.js";

class UploadController {
  testUpload = async (req, res, next) => {
    try {
      const result = await uploadService.uploadImage(req.file, {
        folder: "test-uploads",
      });

      return response(res, 201, {
        url: result.secure_url,
        publicId: result.public_id,
        bytes: result.bytes,
        format: result.format,
        width: result.width,
        height: result.height,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default new UploadController();
