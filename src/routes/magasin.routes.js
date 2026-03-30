import express from "./../config/express.js";
import magasinController from "../controllers/magasin.controller.js";
import validateMiddleware from "../middlewares/validate.js";
import magasinSchema from "../validations/magasin.schema.js";

const router = express.Router();


export default router;
