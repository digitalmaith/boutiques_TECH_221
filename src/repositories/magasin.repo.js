import prisma from "../config/prisma.js";

class MagasinRepository {
  findById(id) {
    return prisma.magasin.findUnique({
      where: { id },
    });
  }

  updateById(id, data) {
    return prisma.magasin.update({
      where: { id },
      data,
    });
  }

  deleteById(id) {
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
      where: { deletedAt: null },
      orderBy: {id: "asc"}
    });
  }

  // récupérer un magasin par ID

  async findById(id){
    return prisma.magasin.findUnique({
      where: { id },
    });
  }

  async softDelete(id) {
      return prisma.magasin.update({
        where: { id },
        data: { deletedAt: new Date() }
      });
  }

  async restore(id) {
      return prisma.magasin.update({
        where: { id },
        data: { deletedAt: null }
      });
  }

  async findByIdIncludeDeleted(id) {
    return prisma.magasin.findUnique({
      where: { id }
    });
  }

  async findDeleted() {
    return prisma.magasin.findMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
    });
  }
}

export default new MagasinRepository();
