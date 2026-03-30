import employeService from "../services/employe.service.js";
import BaseController from "./BaseController.js";

class EmployeController extends BaseController {
  constructor() {
    super(employeService);
  }

  // Override create
  create = async (req, res, next) => {
    try {
      const employe = await employeService.create(req.body, req.file);
      res.status(201).json(employe);
    } catch (error) {
      next(error);
    }
  };

  // Override update
  update = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return next(httpError(400, "ID invalide"));

      const employe = await employeService.update(id, req.body, req.file);
      if (!employe) return res.status(404).json({ message: "Employé introuvable" });

      res.status(200).json(employe);
    } catch (error) {
      next(error);
    }
  };
}

export default new EmployeController();