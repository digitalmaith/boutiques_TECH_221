// Dans votre fichier de routes principal (routes/index.js)
import express from "express";
import magasinRoutes from "./magasin.routes.js";
import employeRoutes from "./employe.routes.js"
import venteRoutes from "./vente.routes.js";
import produitRoutes from "./produit.routes.js";
import categorieRoutes from "./categorie.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/magasins", magasinRoutes);
router.use("/produits", produitRoutes);
router.use("/employes", employeRoutes);
router.use("/ventes", venteRoutes);
router.use("/categories", categorieRoutes);

export default router;