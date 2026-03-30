import venteService from "../services/vente.service.js";
import BaseController from "./BaseController.js";

class VenteController extends BaseController {
  constructor() {
    super(venteService);
  }
}

export default new VenteController();
