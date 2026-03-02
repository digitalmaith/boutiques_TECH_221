// src/controllers/employe.controller.js
import employeService from "../services/employe.service.js";
import httpError from "../utils/httpError.js";
import response from "../utils/response.js";

class EmployeController {
  // Créer un employé
  async create(req, res, next) {
    try {
      const employe = await employeService.createEmploye(req.body);
      return response(res, 201, employe);
    } catch (error) {
      if (error.message.includes("magasin")) {
        return next(httpError(400, error.message));
      }
      return next(error);
    }
  }

  // Récupérer tous les employés non supprimés
    async getAll(req, res, next) {
      try {
        const employes = await employeService.getAll();
        return response(res, 200, employes);
      } catch (error) {
        return next(error);
      }
    }

  // Récupérer un employé par id
  async getById(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        return next(httpError(400, "id invalide"));
      }

      const employe = await employeService.getById(id);
      if (!employe) {
        return next(httpError(404, "Employé introuvable"));
      }

      return response(res, 200, employe);
    } catch (error) {
      return next(error);
    }
  }

  // Modifier un employé
  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        return next(httpError(400, "id invalide"));
      }

      const updatedEmploye = await employeService.updateEmploye(id, req.body);
      if (!updatedEmploye) {
        return next(httpError(404, "Employé introuvable"));
      }

      return response(res, 200, updatedEmploye);
    } catch (error) {
      if (error.message.includes("magasin")) {
        return next(httpError(400, error.message));
      }
      return next(error);
    }
  }

  // Soft delete d’un employé
  async delete(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        return next(httpError(400, "id invalide"));
      }

      const deleted = await employeService.deleteEmploye(id);
      if (!deleted) {
        return next(httpError(404, "Employé introuvable"));
      }

      // Pour soft delete, on peut retourner 204 ou 200 selon préférence
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  // Restaurer un employé soft-deleted
async restore(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return next(httpError(400, "id invalide"));
    }

    const employe = await employeService.restoreEmploye(id);
    return response(res, 200, employe);
  } catch (error) {
    return next(error);
  }
}

async getDeleted(req, res, next) {
  try {
    const employes = await employeService.getDeletedEmployes();
    return response(res, 200, employes);
  } catch (error) {
    next(error);
  }
}
}

export default new EmployeController();