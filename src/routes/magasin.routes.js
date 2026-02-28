import express from "express";
import magasinController from "../controllers/magasin.controller.js";
import validateMiddleware from "../middlewares/validate.js";
import magasinSchema from "../validations/magasin.schema.js";

const router = express.Router();

router.put("/:id", validateMiddleware(magasinSchema), magasinController.update);
router.delete("/:id", magasinController.delete);

export default router;
