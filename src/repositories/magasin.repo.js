import prisma from "../config/prisma.js";
import BaseRepository from "./BaseRepository.js";

class MagasinRepository extends BaseRepository {
  constructor() {
    super(prisma.magasin); // passe le modèle Prisma
  }

}

export default new MagasinRepository();
