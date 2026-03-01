import magasinService from "../services/magasin.service.js";
import httpError from "../utils/httpError.js";
import response from "../utils/response.js";

class MagasinController {
  async update(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id, 10);

      if (Number.isNaN(id) || id <= 0) {
        return next(httpError(400, "id invalide"));
      }

      const updatedMagasin = await magasinService.updateMagasin(id, req.body ?? {});

      if (!updatedMagasin) {
        return next(httpError(404, "magasin introuvable"));
      }

      return response(res, 200, updatedMagasin);
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id, 10);

      if (Number.isNaN(id) || id <= 0) {
        return next(httpError(400, "id invalide"));
      }

      const deleted = await magasinService.deleteMagasin(id);

      if (!deleted) {
        return next(httpError(404, "magasin introuvable"));
      }

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res, next){
    try {
      const newMagasin = await magasinService.createMagasin(req.body ?? {});
      return response(res, 201 , newMagasin);
    } catch (error) {
      return next(error);
    }
  }
}

export default new MagasinController();
