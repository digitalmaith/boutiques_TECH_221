import magasinRoutes from "./magasin.routes.js";
import produitRoutes from "./produit.routes.js";
import ex from "../config/express.js";

ex.router.use("/magasins", magasinRoutes);
ex.router.use("/produits", produitRoutes);

export default ex.router;
