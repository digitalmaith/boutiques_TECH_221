import BaseService from "./BaseService.js";
import magasinRepository from "../repositories/magasin.repo.js";
import httpError from "../utils/httpError.js";

class MagasinService extends BaseService {
  constructor() {
    super(magasinRepository);
  }

  // ==========================
  // CREATE
  // ==========================
  async create(payload) {
    if (!payload.nom || !payload.adresse || !payload.ville) {
      throw httpError(400, "nom, adresse et ville sont obligatoires");
    }

    try {
      return await super.create(payload);
    } catch (error) {
      if (error.code === "P2002") {
        throw httpError(409, "Ce magasin existe déjà dans cette ville");
      }
      throw error;
    }
  }

  // ==========================
  // UPDATE
  // ==========================
  async update(id, payload) {
    const magasin = await this.repository.findById(id);
    if (!magasin) return null;

    const data = {};
    if (payload.nom !== undefined) data.nom = payload.nom;
    if (payload.adresse !== undefined) data.adresse = payload.adresse;
    if (payload.ville !== undefined) data.ville = payload.ville;

    return magasinRepository.updateById(id, data);
  }

  async deleteMagasin(id) {
    const magasin = await magasinRepository.findById(id);

    if (!magasin) {
      return null;
    }

    // Vérifier si le magasin contient des employés
    const employes = await magasinRepository.findEmployesByMagasinId(id);
    if (employes && employes.length > 0) {
      throw httpError(400, "Impossible de supprimer ce magasin car il contient des employés. Veuillez d'abord transférer ou archiver les employés.");
    }

    await magasinRepository.deleteById(id);
    return true;
  }

  async createMagasin(payload){
    // Vérification minimale
    if(!payload.nom || !payload.adresse || !payload.ville){
      throw httpError(400, "nom, adresse et ville sont obligatoires")
    }

    // On essaie de créer le magasin via le repository

    try {
      const newMagasin = await magasinRepository.create(payload);
      return newMagasin
    } catch (error) {
      if (error.code === "P2002") {
        throw httpError(409, "Ce magasin existe déjà dans cette ville");
      }
      throw error;
    }
  }

  // ==========================
  // Méthode spécifique
  // ==========================
  findByCity = async (city) => {
    return this.repository.findByCity(city);
  };
}

export default new MagasinService();