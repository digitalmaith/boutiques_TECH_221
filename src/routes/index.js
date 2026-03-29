// Dans votre fichier de routes principal (routes/index.js)
import express from "express";
import magasinRoutes from "./magasin.routes.js";
import employeRoutes from "./employe.routes.js"
import venteRoutes from "./vente.routes.js";
import produitRoutes from "./produit.routes.js";
import categorieRoutes from "./categorie.routes.js";

// Créez le router directement ici
const router = express.Router();

// Montez vos sous-routes UNE SEULE FOIS chacune
router.use("/magasins", magasinRoutes);
router.use("/produits", produitRoutes);
router.use("/employes", employeRoutes);
router.use("/ventes", venteRoutes);
router.use("/categories", categorieRoutes);

export default router;