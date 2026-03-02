import magasinRoutes from "./magasin.routes.js";
import venteRoutes from "./vente.routes.js";
import ex from "../config/express.js";

ex.router.use("/magasins", magasinRoutes);
ex.router.use("/ventes", venteRoutes);

export default ex.router;
