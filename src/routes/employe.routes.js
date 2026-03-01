import express from "express"
import validateMiddleware from "../middlewares/validate.js";
import employerController from "../controllers/employe.controller.js";
import employeSchema from "../validations/employe.schema.js";


const router = express.Router();

router.post("/", validateMiddleware(employeSchema), employerController.create );
router.get("/", employerController.getAll);
router.get("/:id", employerController.getById);
router.put("/:id", validateMiddleware(employeSchema), employerController.update);
router.delete("/:id", employerController.delete);

export default router;