import categorieRepository from "../repositories/categorie.repo.js";
import httpError from "../utils/httpError.js";

class CategorieService {
  async createCategorie(payload) {
    const sousCategorie = payload.sousCategorie === undefined ? null : payload.sousCategorie;
    const existing = await categorieRepository.findByCodeAndSousCategorie(
      payload.code,
      sousCategorie
    );
    
    if (existing) {
      throw httpError(409, "Une catégorie avec ce code et cette sous-catégorie existe déjà");
    }

    return categorieRepository.create(payload);
  }

  async getAllCategories() {
    return categorieRepository.findAll();
  }

  async getCategorieById(id) {
    const categorie = await categorieRepository.findById(id);
    if (!categorie) {
      throw httpError(404, "Catégorie introuvable");
    }
    return categorie;
  }

  async updateCategorie(id, payload) {
    const categorie = await categorieRepository.findById(id);
    if (!categorie) {
      throw httpError(404, "Catégorie introuvable");
    }

    // Vérifier si la nouvelle combinaison code/sousCategorie existe déjà
    if (payload.code || payload.sousCategorie !== undefined) {
      const code = payload.code || categorie.code;
      const sousCategorie = payload.sousCategorie !== undefined ? (payload.sousCategorie || null) : categorie.sousCategorie;
      
      const existing = await categorieRepository.findByCodeAndSousCategorie(code, sousCategorie);
      if (existing && existing.id !== id) {
        throw httpError(409, "Une catégorie avec ce code et cette sous-catégorie existe déjà");
      }
    }

    return categorieRepository.update(id, payload);
  }

  async deleteCategorie(id) {
    const categorie = await categorieRepository.findById(id);
    if (!categorie) {
      throw httpError(404, "Catégorie introuvable");
    }

    // Vérifier si la catégorie contient des produits
    const produits = await categorieRepository.findProduitsByCategorieId(id);
    if (produits && produits.length > 0) {
      throw httpError(400, "Impossible de supprimer cette catégorie car elle contient des produits. Veuillez d'abord transférer ou archiver les produits.");
    }

    return categorieRepository.delete(id);
  }
}

export default new CategorieService();