import employeService from "../services/employe.service.js";

class EmployeController {
    async create(req, res, next) {
      try {
        const employe = await employeService.createEmploye(req.body);
        res.status(201).json(employe);
      } catch (error) {
        if (error.message.includes("magasin")) {
          return res.status(400).json({ message: error.message });
        }
        next(error);
      }
    }
}

export default new EmployeController();

