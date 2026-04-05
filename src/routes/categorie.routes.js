import express from "express";
import categorieController from "../controllers/categorie.controller.js";
import validateMiddleware from "../middlewares/validate.js";
import categorieSchema from "../validations/categorie.schema.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddleware, validateMiddleware(categorieSchema), categorieController.create);
router.get("/", authMiddleware, categorieController.getAll);
router.get("/:id", authMiddleware, categorieController.getById);
router.put("/:id", authMiddleware, validateMiddleware(categorieSchema), categorieController.update);
router.delete("/:id", authMiddleware, categorieController.delete);

export default router;