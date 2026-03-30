import e from "express";
import validateMiddleware from "../middlewares/validate.js";
import employerController from "../controllers/employe.controller.js";
import employeSchema, { employeUpdateSchema } from "../validations/employe.schema.js";
import { upload, multerErrorHandler } from "../middlewares/upload.js";

const router = e.Router();

const parseFormDataBody = (req, res, next) => {
  if (req.body?.magasinId) {
    req.body.magasinId = Number(req.body.magasinId);
  }
  next();
};

const stripEmptyStrings = (req, res, next) => {
  if (req.body) {
    for (const [key, value] of Object.entries(req.body)) {
      if (value === "") {
        delete req.body[key];
      }
    }
  }
  next();
};

router.post(
  "/",
  upload.single("photo"),
  multerErrorHandler,
  parseFormDataBody,
  validateMiddleware(employeSchema),
  employerController.create
);

router.get("/", employerController.getAll);
router.get("/deleted", employerController.getDeleted);
router.get("/:id", employerController.getById);

router.put(
  "/:id",
  upload.single("photo"),           
  multerErrorHandler,
  parseFormDataBody,
  stripEmptyStrings,
  validateMiddleware(employeUpdateSchema),
  employerController.update
);

router.delete("/:id", employerController.delete);
router.patch("/:id/restore", employerController.restore);

export default router;
