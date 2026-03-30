import { produitRepository } from "../repositories/produit.repo.js";
import { createProduitSchema, updateProduitSchema } from "../validations/produit.schema.js";
import uploadService from "./upload.service.js";

class ProduitService {
  async getAllProduits() {
    try {
      const produits = await produitRepository.findAll();
      console.log('Produits récupérés du repository:', produits);
      return produits;
    } catch (error) {
      console.error('Erreur dans getAllProduits:', error);
      throw error;
    }
  }

  async getProduitById(id) {
    try {
      console.log('Recherche du produit par ID:', id);
      const produit = await produitRepository.findById(id);
      if (!produit) {
        console.log('Produit non trouvé par ID:', id);
        throw new Error("Produit non trouvé", { cause: { status: 404 } });
      }
      console.log('Produit trouvé par ID:', produit);
      return produit;
    } catch (error) {
      console.error('Erreur dans getProduitById:', error);
      throw error;
    }
  }

  async createProduit(data) {
    try {
      console.log('Données reçues pour la création:', data);
      const validatedData = createProduitSchema.parse(data);
      console.log('Données validées:', validatedData);
      const produit = await produitRepository.create(validatedData);
      console.log('Produit créé:', produit);
      return produit;
    } catch (error) {
      console.error('Erreur dans createProduit:', error);
      if (error.name === "ZodError") {
        const message = error.issues.map(issue => issue.message).join(", ");
        console.error('Erreur de validation Zod:', message);
        throw new Error(message, { cause: { status: 400 } });
      }
      throw error;
    }
  }

  async updateProduit(id, data) {
    try {
      const existingProduit = await this.getProduitById(id);
      console.log('Données reçues pour la mise à jour:', data);
      const validatedData = updateProduitSchema.parse(data);
      console.log('Données validées:', validatedData);
      if (validatedData.image && existingProduit.image) {
        await uploadService.deleteImage(existingProduit.image);
      }
      const updatedProduit = await produitRepository.update(id, validatedData);
      console.log('Produit mis à jour:', updatedProduit);
      return updatedProduit;
    } catch (error) {
      console.error('Erreur dans updateProduit:', error);
      if (error.name === "ZodError") {
        const message = error.issues.map(issue => issue.message).join(", ");
        throw new Error(message, { cause: { status: 400 } });
      }
      throw error;
    }
  }

  async deleteProduit(id) {
    try {
      const existingProduit = await this.getProduitById(id);
      console.log('Suppression du produit:', existingProduit);
      
      // Vérifier si le produit a des ventes associées
      const ventes = await produitRepository.findVentesByProduitId(id);
      if (ventes && ventes.length > 0) {
        throw new Error("Impossible de supprimer ce produit car il a des ventes associées. Veuillez d'abord archiver le produit.", { cause: { status: 400 } });
      }
      if (existingProduit.image) {
        await uploadService.deleteImage(existingProduit.image);
      }
      
      const deletedProduit = await produitRepository.delete(id);
      console.log('Produit supprimé:', deletedProduit);
      return deletedProduit;
    } catch (error) {
      console.error('Erreur dans deleteProduit:', error);
      throw error;
    }
  }

  async updateStock(id, quantite) {
    try {
      const existingProduit = await this.getProduitById(id);
      if (typeof quantite !== "number") {
        throw new Error("La quantité doit être un nombre", { cause: { status: 400 } });
      }
      if (existingProduit.qteStock + quantite < 0) {
        throw new Error("Stock insuffisant", { cause: { status: 400 } });
      }
      console.log('Mise à jour du stock:', existingProduit.libelle, quantite);
      const updatedProduit = await produitRepository.updateStock(id, quantite);
      console.log('Stock mis à jour:', updatedProduit);
      return updatedProduit;
    } catch (error) {
      console.error('Erreur dans updateStock:', error);
      throw error;
    }
  }

  async addStock(id, quantite) {
    if (typeof quantite !== "number" || quantite <= 0) {
      throw new Error("La quantité à ajouter doit être un nombre positif", { cause: { status: 400 } });
    }
    return await this.updateStock(id, quantite);
  }

  async removeStock(id, quantite) {
    if (typeof quantite !== "number" || quantite <= 0) {
      throw new Error("La quantité à retirer doit être un nombre positif", { cause: { status: 400 } });
    }
    return await this.updateStock(id, -quantite);
  }

  async checkStock(id, quantite) {
    const existingProduit = await this.getProduitById(id);
    if (typeof quantite !== "number" || quantite <= 0) {
      throw new Error("La quantité à vérifier doit être un nombre positif", { cause: { status: 400 } });
    }
    const hasStock = existingProduit.qteStock >= quantite;
    console.log('Vérification du stock:', existingProduit.libelle, quantite, hasStock);
    return hasStock;
  }
}

export default new ProduitService();
