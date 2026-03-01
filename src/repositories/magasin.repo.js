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

  async create(data){
    return prisma.magasin.create({data})
  }
}

export default new MagasinRepository();
