import express from "./../config/express.js";
import magasinController from "../controllers/magasin.controller.js";
import validateMiddleware from "../middlewares/validate.js";
import magasinSchema from "../validations/magasin.schema.js";

const router = express.Router();

router.post("/", validateMiddleware(magasinSchema), magasinController.create);
router.put("/:id", validateMiddleware(magasinSchema), magasinController.update);
router.delete("/:id", magasinController.delete);
router.get("/", magasinController.getAll);
router.get("/:id", magasinController.getById);

export default router;
