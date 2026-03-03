import magasinService from "../services/magasin.service.js";
import BaseController from "./BaseController.js";

class MagasinController extends BaseController {
    constructor() {
        super(magasinService);
    }
}

export default new MagasinController();
