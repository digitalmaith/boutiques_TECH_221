import categorieService from "../services/categorie.service.js";
import BaseController from "./BaseController.js";

class CategorieController extends BaseController {
    constructor() {
        super(categorieService);
    }
}

export default new CategorieController();