import magasinRoutes from "./magasin.routes.js";
import ex from "../config/express.js";
import employeRoutes from "./employe.routes.js"

ex.router.use("/magasins", magasinRoutes);
ex.router.use("/employes", employeRoutes);

export default ex.router;
