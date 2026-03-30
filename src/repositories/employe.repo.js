import BaseRepository from "./BaseRepository.js";
import prisma from "../config/prisma.js";

class EmployeRepository extends BaseRepository {
  constructor() {
    super(prisma.employe); // passe le modèle Prisma
  }


}

export default new EmployeRepository();