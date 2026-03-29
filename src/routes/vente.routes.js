
import e from "../config/express.js";
import venteController from "../controllers/vente.controller.js";
import validateMiddleware from "../middlewares/validate.js";
import venteSchema from "../validations/vente.schema.js";

const router = e.router;

router.post("/", validateMiddleware(venteSchema), venteController.create);

export default router;
