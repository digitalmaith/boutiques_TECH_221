
import magasinRepository from "../repositories/magasin.repo.js";

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
}

export default new MagasinService();
