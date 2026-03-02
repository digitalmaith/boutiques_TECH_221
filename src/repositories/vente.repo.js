import prisma from "../config/prisma.js";

class VenteRepository {
  findEmployeById(id) {
    return prisma.employe.findUnique({ where: { id } });
  }

  findProduitById(id) {
    return prisma.produit.findUnique({ where: { id } });
  }

  createWithStockUpdate({ employeId, produitId, quantite, dateVente, montantTotal }) {
    return prisma.$transaction(async (tx) => {
      const stockUpdate = await tx.produit.updateMany({
        where: {
          id: produitId,
          qteStock: { gte: quantite },
        },
        data: {
          qteStock: { decrement: quantite },
        },
      });

      if (stockUpdate.count === 0) {
        return null;
      }

      return tx.vente.create({
        data: {
          employeId,
          produitId,
          quantite,
          dateVente: dateVente ?? new Date(),
          montantTotal,
        },
        include: {
          employe: true,
          produit: true,
        },
      });
    });
  }
}

export default new VenteRepository();
