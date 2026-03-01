import express from "express"
import validateMiddleware from "../middlewares/validate.js";
import employerController from "../controllers/employe.controller.js";
import employeSchema from "../validations/employe.schema.js";


const router = express.Router();

router.post("/", validateMiddleware(employeSchema), employerController.create );

export default router;