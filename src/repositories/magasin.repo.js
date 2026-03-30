import prisma from "../config/prisma.js";

class MagasinRepository {
  async findById(id) {
    return prisma.magasin.findUnique({
      where: { id },
    });
  }

  async updateById(id, data) {
    return prisma.magasin.update({
      where: { id },
      data,
    });
  }

  async deleteById(id) {
    return prisma.magasin.delete({
      where: { id },
    });
  }

  // creer magasin
  async create(data){
    return prisma.magasin.create({data})
  }

  // récupérer tous les magasins
  async findAll(){
    return prisma.magasin.findMany({
      orderBy: {id: "asc"}
    });
  }

  // récupérer les employés d'un magasin
  async findEmployesByMagasinId(magasinId){
    return prisma.employe.findMany({
      where: {
        magasinId,
        deletedAt: null
      }
    });
  }
}

export default new MagasinRepository();
