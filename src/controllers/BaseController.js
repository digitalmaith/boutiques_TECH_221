import httpError from "../utils/httpError.js";
import response from "../utils/response.js";
class BaseController {
    constructor(service) {
        this.service = service;
        
    }
    

    create = async (req, res, next) => {
        try {
            const newResource = await this.service.create(req.body ?? {});
            return response(res, 201, newResource);
        } catch (error) {
            return next(error);
        }
    }

    getAll = async (req, res, next) => {
    try {
      const results = await this.service.getAll();
      return response(res, 200, results);
    } catch (error) {
      return next(error);
    }
  };
    
    getById = async (req, res, next) => {
        try {
            const id = Number.parseInt(req.params.id, 10);
            if (Number.isNaN(id) || id <= 0) {
                return next(httpError(400, "id invalide"));
            }

            const resource = await this.service.getById(id);
            if (!resource) {
                return next(httpError(404, "Ressource introuvable"));
            }

            return response(res, 200, resource);
        } catch (error) {
            return next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const id = Number.parseInt(req.params.id, 10);
            if (Number.isNaN(id) || id <= 0) {
                return next(httpError(400, "id invalide"));
            }

            const updated = await this.service.update(id, req.body);
            if (!updated) {
                return next(httpError(404, "Ressource introuvable"));
            }

            return response(res, 200, updated);
        } catch (error) {
            return next(error);
        }
    }
    
    delete = async (req, res, next) => {
        try {
            const id = Number.parseInt(req.params.id, 10);
            if (Number.isNaN(id) || id <= 0) {
                return next(httpError(400, "id invalide"));
            }

            const deleted = await this.service.delete(id);
            if (!deleted) {
                return next(httpError(404, "Ressource introuvable"));
            }

            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    }

    getDeleted = async (req, res, next) => {
        try {
            const results = await this.service.getDeleted();
            return response(res, 200, results);
        } catch (error) {
            return next(error);
        }
    }

    restore = async (req, res, next) => {
        try {
            const id = Number.parseInt(req.params.id, 10);
            if (Number.isNaN(id) || id <= 0) {
                return next(httpError(400, "id invalide"));
            }

            const restored = await this.service.restore(id);
            if (!restored) {
                return next(httpError(404, "Ressource introuvable ou pas supprimée"));
            }

            return response(res, 200, restored);
        } catch (error) {
            return next(error);
        }
    }
}

export default BaseController;