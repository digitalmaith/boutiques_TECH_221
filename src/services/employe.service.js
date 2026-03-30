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

  // Soft delete d'un employé
  async deleteEmploye(id) {
    // Vérifier si l'employé a des ventes associées
    const ventes = await employeRepository.findVentesByEmployeId(id);
    if (ventes && ventes.length > 0) {
      throw httpError(400, "Impossible de supprimer cet employé car il a des ventes associées. Veuillez d'abord archiver l'employé.");
    }
    
    return employeRepository.softDelete(id);
  }

  // restaurer un employé (non implémenté avec le client Prisma actuel)
  async restoreEmploye(id) {
    throw httpError(501, "La restauration d'employé n'est pas disponible avec le client Prisma actuel");
  }

  async getDeletedEmployes() {
    // Retourner un tableau vide car le soft delete n'est pas disponible
    return [];
  }
}

export default new EmployeService();