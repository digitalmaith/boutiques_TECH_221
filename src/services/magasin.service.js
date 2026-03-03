
import magasinRepository from "../repositories/magasin.repo.js";
import httpError from "../utils/httpError.js";

class MagasinService {
  async updateMagasin(id, payload) {
    const magasin = await magasinRepository.findById(id);

    if (!magasin) {
      return null;
    }

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
       // Gestion de l'erreur unique constraint (Prisma P2002)
       if (error.code === "P2002") {
          throw httpError(409 , "Ce magasin existe déjà dans cette ville");
       }
       throw error;
    }
  }

  // récupère tous les magasins
  async getAllMagasins(){
    return magasinRepository.findAll();
  }

  // récupère un magasin par ID

  async getMagasinById(id){
    if (!id) {
      return null;
    }
    return magasinRepository.findById(id);
  }
}

export default new MagasinService();
