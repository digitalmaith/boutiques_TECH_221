import { Prisma } from "@prisma/client";
import BaseService from "./BaseService.js";
import employeRepository from "../repositories/employe.repo.js";
import magasinRepository from "../repositories/magasin.repo.js";
import httpError from "../utils/httpError.js";

class EmployeService extends BaseService {
  constructor() {
    super(employeRepository);
  }

  // ==========================
  // CREATE
  // ==========================
  async create(payload) {
    try {
      const magasin = await magasinRepository.findById(payload.magasinId);
      if (!magasin) {
        throw httpError(400, "Le magasin spécifié n'existe pas");
      }

      return await super.create(payload);

    } catch (error) {

      // 🔥 Interception Prisma
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return Promise.reject(
          httpError(409, "Le téléphone est déjà utilisé")
        );
      }

      throw error;
    }
  }

  // ==========================
  // UPDATE
  // ==========================
  async update(id, data) {
    const employe = await this.repository.findById(id);
    if (!employe) return null;

    try {
      if (data.magasinId) {
        const magasin = await magasinRepository.findById(data.magasinId);
        if (!magasin) {
          throw httpError(400, "Le magasin spécifié n'existe pas");
        }
      }

      return await super.update(id, data);

    } catch (error) {

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return Promise.reject(
          httpError(409, "Le téléphone est déjà utilisé")
        );
      }

      throw error;
    }
  }

  async getDeleted() {
    return this.repository.findDeleted();
  }

  async restore(id) {
    return this.repository.restore(id);
  }
}

export default new EmployeService();