import express from "express";
import magasinController from "../controllers/magasin.controller.js";
import validateMiddleware from "../middlewares/validate.js";
import magasinSchema from "../validations/magasin.schema.js";

const router = express.Router();

// CRUD Magasin
router.post("/", validateMiddleware(magasinSchema), magasinController.create);
router.put("/:id", validateMiddleware(magasinSchema), magasinController.update);
router.delete("/:id", magasinController.delete);
// GET tous les magasins
router.get("/", magasinController.getAll);
router.get("/:id", magasinController.getById);

export default router;