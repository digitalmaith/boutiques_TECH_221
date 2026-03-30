import prisma from "../config/prisma.js";

class CategorieRepository {
  async create(data) {
    return prisma.categorie.create({ data });
  }

  async findAll() {
    return prisma.categorie.findMany({
      orderBy: { id: "asc" }
    });
  }

  async findById(id) {
    return prisma.categorie.findUnique({
      where: { id }
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

  async update(id, data) {
    return prisma.categorie.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return prisma.categorie.delete({
      where: { id }
    });
  }

  async findProduitsByCategorieId(categorieId) {
    return prisma.produit.findMany({
      where: { categorieId }
    });
  }
}

export default new CategorieRepository();