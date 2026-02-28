import magasinRoutes from "./magasin.routes.js";
import ex from "../config/express.js";

ex.router.use("/magasins", magasinRoutes);

export default ex.router;
