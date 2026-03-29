// Dans votre fichier de routes principal (routes/index.js)
import e from "../config/express.js";
import magasinRoutes from "./magasin.routes.js";
import employeRoutes from "./employe.routes.js"
import venteRoutes from "./vente.routes.js";
import produitRoutes from "./produit.routes.js";
import uploadController from "../controllers/upload.controller.js";
import { upload, multerErrorHandler } from "../middlewares/upload.js";

// Créez le router directement ici
const router = e.router;

// Montez vos sous-routes UNE SEULE FOIS chacune
router.use("/magasins", magasinRoutes);
router.use("/produits", produitRoutes);
router.use("/employes", employeRoutes);
router.use("/ventes", venteRoutes);
router.post(
  "/test-upload",
  upload.single("image"),
  multerErrorHandler,
  uploadController.testUpload
);

export default router;
