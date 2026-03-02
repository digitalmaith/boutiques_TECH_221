import venteService from "../services/vente.service.js";
import response from "../utils/response.js";

class VenteController {
  async create(req, res, next) {
    try {
      const vente = await venteService.createVente(req.body ?? {});
      return response(res, 201, vente);
    } catch (error) {
      return next(error);
    }
  }
}

export default new VenteController();
