
import venteRepository from "../repositories/vente.repo.js";
import httpError from "../utils/httpError.js";

class VenteService {
  async createVente(payload) {
    const employe = await venteRepository.findEmployeById(payload.employeId);
    if (!employe) {
      throw httpError(404, "employe introuvable");
    }

    const produit = await venteRepository.findProduitById(payload.produitId);
    if (!produit) {
      throw httpError(404, "produit introuvable");
    }

    if (produit.qteStock < payload.quantite) {
      throw httpError(400, "stock insuffisant");
    }

    const montantTotal = produit.prix * payload.quantite;

    const vente = await venteRepository.createWithStockUpdate({
      employeId: payload.employeId,
      produitId: payload.produitId,
      quantite: payload.quantite,
      dateVente: payload.dateVente,
      montantTotal,
    });

    if (!vente) {
      throw httpError(400, "stock insuffisant");
    }

    return vente;
  }
}

export default new VenteService();
