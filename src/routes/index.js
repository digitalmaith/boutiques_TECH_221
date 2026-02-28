import express from "express";
import magasinRoutes from "./magasin.routes.js";

const router = express.Router();

router.use("/magasins", magasinRoutes);

export default router;
