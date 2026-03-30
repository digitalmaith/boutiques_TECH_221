import prisma from "../config/prisma.js";

class EmployeRepository {
    // creer employe
      async create(data){
        return prisma.employe.create({data})
      }

    async findAll() {
      return prisma.employe.findMany({
        include: { magasin: true }
      });
    }

    async findById(id) {
      return prisma.employe.findFirst({
        where: { id },
        include: { magasin: true }
      });
    }

    async update(id, data) {
      return prisma.employe.update({
        where: { id },
        data
      });
    }

    async softDelete(id) {
      return prisma.employe.delete({
        where: { id }
      });
    }

    //  méthode findOne pour vérifier doublon
    async findOne(filter) {
      return prisma.employe.findFirst({
        where: filter,
      });
    }
    // Restaurer un employé (non implémenté avec le client Prisma actuel)
    async restore(id) {
      throw new Error("La restauration d'employé n'est pas disponible avec le client Prisma actuel");
    }
    async findByIdIncludeDeleted(id) {
      return prisma.employe.findUnique({
        where: { id }
      });
    }

    async findDeleted() {
      // Retourner un tableau vide car le soft delete n'est pas disponible
      return [];
    }

    // récupérer les ventes d'un employé
    async findVentesByEmployeId(employeId) {
      return prisma.vente.findMany({
        where: { employeId }
      });
    }

}

export default new EmployeRepository()


