import prisma from "../config/prisma.js";

class EmployeRepository {
    // creer employe
      async create(data){
        return prisma.employe.create({data})
      }

    async findAll() {
      return prisma.employe.findMany({
        where: { deletedAt: null },
        include: { magasin: true }
      });
    }

    async findById(id) {
      return prisma.employe.findFirst({
        where: { id, deletedAt: null },
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
      return prisma.employe.update({
        where: { id },
        data: { deletedAt: new Date() }
      });
    }

    //  méthode findOne pour vérifier doublon
    async findOne(filter) {
      return prisma.employe.findFirst({
        where: filter,
      });
    }


}

export default new EmployeRepository()


