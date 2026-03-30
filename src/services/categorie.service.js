import categorieRepository from "../repositories/categorie.repo.js";
import httpError from "../utils/httpError.js";
import BaseService from "./BaseService.js";

class CategorieService extends BaseService{
  constructor() {
    super(categorieRepository);
  }

  async createCategorie(payload) {
    // Vérifier si la catégorie existe déjà avec le même code et sousCategorie
    const existing = await this.categorieRepository.findByCodeAndSousCategorie(
      payload.code,
      payload.sousCategorie
    );
    
    if (existing) {
      throw httpError(409, "Une catégorie avec ce code et cette sous-catégorie existe déjà");
    }

    return this.categorieRepository.create(payload);
  }

  async getAllCategories() {
    return this.categorieRepository.findAll();
  }

  async getCategorieById(id) {
    const categorie = await this.categorieRepository.findById(id);
    if (!categorie) {
      throw httpError(404, "Catégorie introuvable");
    }
    return categorie;
  }

  async updateCategorie(id, payload) {
    const categorie = await this.categorieRepository.findById(id);
    if (!categorie) {
      throw httpError(404, "Catégorie introuvable");
    }

    // Vérifier si la nouvelle combinaison code/sousCategorie existe déjà
    if (payload.code || payload.sousCategorie !== undefined) {
      const code = payload.code || categorie.code;
      const sousCategorie = payload.sousCategorie !== undefined ? payload.sousCategorie : categorie.sousCategorie;
      
      const existing = await this.categorieRepository.findByCodeAndSousCategorie(code, sousCategorie);
      if (existing && existing.id !== id) {
        throw httpError(409, "Une catégorie avec ce code et cette sous-catégorie existe déjà");
      }
    }

    return this.categorieRepository.update(id, payload);
  }

  async deleteCategorie(id) {
    const categorie = await this.categorieRepository.findById(id);
    if (!categorie) {
      throw httpError(404, "Catégorie introuvable");
    }

    // Vérifier si la catégorie contient des produits
    const produits = await this.categorieRepository.findProduitsByCategorieId(id);
    if (produits && produits.length > 0) {
      throw httpError(400, "Impossible de supprimer cette catégorie car elle contient des produits. Veuillez d'abord transférer ou archiver les produits.");
    }

    return this.categorieRepository.delete(id);
  }
}

export default new CategorieService();