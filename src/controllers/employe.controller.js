import employeService from "../services/employe.service.js";
import BaseController from "./BaseController.js";

class EmployeController extends BaseController {
  constructor() {
    super(employeService);
  }

  // Override create pour transmettre req.file
  create = async (req, res, next) => {
    try {
      const employe = await employeService.create(req.body, req.file);
      res.status(201).json(employe);
    } catch (error) {
      next(error);
    }
  };
}

export default new EmployeController();