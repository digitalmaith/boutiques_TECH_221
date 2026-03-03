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

    try {
      return await this.repository.updateById(id, data);
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