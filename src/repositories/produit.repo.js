import prisma from '../config/prisma.js';

class ProduitRepository {

  async findAll() {
    return prisma.produit.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id) {
    return prisma.produit.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findByLibelle(libelle) {
    return prisma.produit.findFirst({
      where: {
        libelle,
        deletedAt: null,
      },
    });
  }

  async create(data) {
    return prisma.produit.create({
      data,
    });
  }


  async update(id, data) {
    return prisma.produit.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }


  async delete(id) {
    return prisma.produit.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }


  async exists(id) {
    const produit = await this.findById(id);
    return !!produit;
  }


  async updateStock(id, quantite) {
    return prisma.produit.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        qteStock: {
          increment: quantite,
        },
        updatedAt: new Date(),
      },
    });
  }
}

export const produitRepository = new ProduitRepository();