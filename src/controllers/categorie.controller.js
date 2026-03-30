import categorieService from "../services/categorie.service.js";
import httpError from "../utils/httpError.js";
import response from "../utils/response.js";

class CategorieController {
  async create(req, res, next) {
    try {
      const categorie = await categorieService.createCategorie(req.body);
      return response(res, 201, categorie);
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const categories = await categorieService.getAllCategories();
      return response(res, 200, categories);
    } catch (error) {
      return next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id, 10);
      if (Number.isNaN(id) || id <= 0) {
        return next(httpError(400, "id invalide"));
      }

      const categorie = await categorieService.getCategorieById(id);
      return response(res, 200, categorie);
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id, 10);
      if (Number.isNaN(id) || id <= 0) {
        return next(httpError(400, "id invalide"));
      }

      const updatedCategorie = await categorieService.updateCategorie(id, req.body);
      return response(res, 200, updatedCategorie);
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

      await categorieService.deleteCategorie(id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

export default new CategorieController();