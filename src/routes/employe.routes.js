import e from "express";
import validateMiddleware from "../middlewares/validate.js";
import employerController from "../controllers/employe.controller.js";
import employeSchema from "../validations/employe.schema.js";
import { upload, multerErrorHandler } from "../middlewares/upload.js";

const router = e.Router();

// Convertit magasinId string → number (FormData envoie tout en string)
const parseFormDataBody = (req, res, next) => {
  if (req.body?.magasinId) {
    req.body.magasinId = Number(req.body.magasinId);
  }
  next();
};

router.post(
  "/",
  upload.single("photo"),             // 1. multer parse le multipart
  multerErrorHandler,                 // 2. gère les erreurs multer
  parseFormDataBody,                  // 3. magasinId "1" → 1
  validateMiddleware(employeSchema),  // 4. Zod valide req.body
  employerController.create           // 5. controller
);

router.get("/", employerController.getAll);
router.get("/deleted", employerController.getDeleted);
router.get("/:id", employerController.getById);
router.put("/:id", validateMiddleware(employeSchema), employerController.update);
router.delete("/:id", employerController.delete);
router.patch("/:id/restore", employerController.restore);

export default router;