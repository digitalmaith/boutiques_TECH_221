import employeRepository from "../repositories/employe.repo.js";
import magasinRepository from "../repositories/magasin.repo.js";
import httpError from "../utils/httpError.js";

class EmployeService {
  // Créer un employé
  async createEmploye(payload) {
  const magasin = await magasinRepository.findById(payload.magasinId);
  if (!magasin) throw new Error("Le magasin spécifié n'existe pas");

  // Vérifier doublon avant création
  const existing = await employeRepository.findOne({
    prenom: payload.prenom,
    nom: payload.nom,
    telephone: payload.telephone,
    magasinId: payload.magasinId,
  });
  if (existing) throw new Error("Employé déjà existant");

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

  // restaurer un employé
  async restoreEmploye(id) {
    const employe = await employeRepository.findByIdIncludeDeleted(id); // Vérifie que l'employé existe
    if (!employe) {
      throw httpError(404, "Employé introuvable");
    }
    return employeRepository.restore(id);
  }

  async getDeletedEmployes() {
    return employeRepository.findDeleted();
  }
}

export default new EmployeService();