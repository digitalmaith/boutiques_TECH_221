import employeService from "../services/employe.service.js";
import BaseController from "./BaseController.js";

class EmployeController extends BaseController {
    constructor() {
        super(employeService);
    }
}

export default new EmployeController();