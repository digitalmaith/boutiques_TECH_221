import prisma from "../config/prisma.js";
import BaseRepository from "./BaseRepository.js";

class CategorieRepository extends BaseRepository {

  constructor () {
    super(prisma.categorie)
  }

  // Categorie n'a pas de deletedAt, donc on surcharge les méthodes
  async findAll(options = {}) {
    return this.model.findMany({
      ...options,
    });
  }

  async findById(id, options = {}) {
    return this.model.findFirst({
      where: { id },
      ...options,
    });
  }

  async findByIdIncludeDeleted(id, options = {}) {
    return this.model.findUnique({
      where: { id },
      ...options,
    });
  }

  // Pas de soft delete sur Categorie => suppression directe
  async softDelete(id) {
    return this.model.delete({
      where: { id },
    });
  }

  async findByCodeAndSousCategorie(code, sousCategorie) {
    return prisma.categorie.findUnique({
      where: {
        code_sousCategorie: {
          code,
          sousCategorie: sousCategorie || null
        }
      }
    });
  }

  async findProduitsByCategorieId(categorieId) {
    return prisma.produit.findMany({
      where: { categorieId }
    });
  }
}

export default new CategorieRepository();
