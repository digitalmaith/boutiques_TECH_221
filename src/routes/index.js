import magasinRoutes from "./magasin.routes.js";
import ex from "../config/express.js";
import employeRoutes from "./employe.routes.js"
import venteRoutes from "./vente.routes.js";
import ex from "../config/express.js";

ex.router.use("/magasins", magasinRoutes);
ex.router.use("/employes", employeRoutes);

ex.router.use("/ventes", venteRoutes);

export default ex.router;
