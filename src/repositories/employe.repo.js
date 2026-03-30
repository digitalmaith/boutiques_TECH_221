import BaseRepository from "./BaseRepository.js";
import prisma from "../config/prisma.js";

class EmployeRepository extends BaseRepository {
  constructor() {
    super(prisma.employe); // passe le modèle Prisma
  }

  // Récupère le dernier employé créé cette année (incluant soft-deleted)
  async findLastMatriculeOfYear(year) {
    return prisma.employe.findFirst({
      where: {
        matricule: {
          startsWith: `EMP-${year}-`,
        },
      },
      orderBy: { matricule: "desc" },
    });
  }

    // récupérer les ventes d'un employé
    async findVentesByEmployeId(employeId) {
      return prisma.vente.findMany({
        where: { employeId }
      });
    }

}

export default new EmployeRepository();