import express from "express"
import validateMiddleware from "../middlewares/validate.js";
import employerController from "../controllers/employe.controller.js";
import employeSchema from "../validations/employe.schema.js";
import { authMiddleware } from "../middlewares/auth.js";


const router = express.Router();

router.post("/", authMiddleware, validateMiddleware(employeSchema), employerController.create );
router.get("/", authMiddleware, employerController.getAll);
router.get("/deleted", authMiddleware, employerController.getDeleted);
router.get("/:id", authMiddleware, employerController.getById);
router.put("/:id", authMiddleware, validateMiddleware(employeSchema), employerController.update);
router.delete("/:id", authMiddleware, employerController.delete);
router.patch("/:id/restore", authMiddleware, employerController.restore);


export default router;