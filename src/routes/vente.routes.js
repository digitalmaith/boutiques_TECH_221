
import express from "./../config/express.js";
import venteController from "../controllers/vente.controller.js";
import validateMiddleware from "../middlewares/validate.js";
import venteSchema from "../validations/vente.schema.js";

const router = express.Router();

router.post("/", validateMiddleware(venteSchema), venteController.create);

export default router;
