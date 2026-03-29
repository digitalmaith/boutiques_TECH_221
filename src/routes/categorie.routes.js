import express from "express";
import categorieController from "../controllers/categorie.controller.js";
import validateMiddleware from "../middlewares/validate.js";
import categorieSchema from "../validations/categorie.schema.js";

const router = express.Router();

// CRUD Categorie
router.post("/", validateMiddleware(categorieSchema), categorieController.create);
router.get("/", categorieController.getAll);
router.get("/:id", categorieController.getById);
router.put("/:id", validateMiddleware(categorieSchema), categorieController.update);
router.delete("/:id", categorieController.delete);

export default router;