import express from "./../config/express.js";
import validateMiddleware from "../middlewares/validate.js";
import employerController from "../controllers/employe.controller.js";
import employeSchema from "../validations/employe.schema.js";


const router = express.Router();

router.post("/", validateMiddleware(employeSchema), employerController.create );
router.get("/", employerController.getAll);
router.get("/deleted", employerController.getDeleted);
router.get("/:id", employerController.getById);
router.put("/:id", validateMiddleware(employeSchema), employerController.update);
router.delete("/:id", employerController.delete);
router.patch("/:id/restore", employerController.restore);


export default router;
