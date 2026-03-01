import employeRepository from "../repositories/employe.repo.js";
import magasinRepository from "../repositories/magasin.repo.js";

class EmployeService {
  // Créer un employé
  async createEmploye(payload) {
    const magasin = await magasinRepository.findById(payload.magasinId);
    if (!magasin) throw new Error("Le magasin spécifié n'existe pas");

    return employeRepository.create(payload);
  }

  // Mettre à jour un employé
  async updateEmploye(id, data) {
    if (data.magasinId) {
      const magasin = await magasinRepository.findById(data.magasinId);
      if (!magasin) throw new Error("Le magasin spécifié n'existe pas");
    }

    return employeRepository.update(id, data);
  }

  // Récupérer tous les employés non supprimés
  async getAll() {
    return employeRepository.findAll();
  }

  // Récupérer un employé par id
  async getById(id) {
    return employeRepository.findById(id);
  }

  // Soft delete d’un employé
  async deleteEmploye(id) {
    return employeRepository.softDelete(id);
  }
}

export default new EmployeService();