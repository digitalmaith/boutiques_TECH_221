import employeRepository from "../repositories/employe.repo.js";
import magasinRepository from "../repositories/magasin.repo.js";

class EmployeService {

  async createEmploye(payload) {

    // 🔎 Vérifier existence magasin
    const magasin = await magasinRepository.findById(payload.magasinId);

    if (!magasin) {
      throw new Error("Le magasin spécifié n'existe pas");
    }

    return employeRepository.create(payload);
  }

}

export default new EmployeService();