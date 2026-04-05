import prisma from "../config/prisma.js";

export const userRepository = {
  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async findById(id) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async create(data) {
    return prisma.user.create({
      data,
    });
  },

  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nom: true,
        prenom: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
};