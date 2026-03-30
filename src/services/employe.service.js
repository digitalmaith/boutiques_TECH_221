import { Prisma } from "@prisma/client";
import BaseService from "./BaseService.js";
import employeRepository from "../repositories/employe.repo.js";
import magasinRepository from "../repositories/magasin.repo.js";
import httpError from "../utils/httpError.js";
import uploadService from "./upload.service.js";

class EmployeService extends BaseService {
  constructor() {
    super(employeRepository);
  }

  // ==========================
  // GENERATE MATRICULE
  // ==========================
  async generateMatricule() {
    const year = new Date().getFullYear();
    const last = await this.repository.findLastMatriculeOfYear(year);

    let nextNumber = 1;
    if (last) {
      // EMP-2026-0042 → extraire 42
      const lastNumber = parseInt(last.matricule.split("-")[2]);
      nextNumber = lastNumber + 1;
    }

    // Padder sur 4 chiffres → 0001, 0042, 0100
    const padded = String(nextNumber).padStart(4, "0");
    return `EMP-${year}-${padded}`;
  }

  // ==========================
  // CREATE
  // ==========================
  async create(payload, file) {
    try {
      const magasin = await magasinRepository.findById(payload.magasinId);
      if (!magasin) throw httpError(400, "Le magasin spécifié n'existe pas");

      // Upload photo si fournie
      let photoUrl = null;
      if (file) {
        const result = await uploadService.uploadImage(file, { folder: "employes" });
        photoUrl = result.secure_url;
      }

      // Générer le matricule
      const matricule = await this.generateMatricule();

      return await super.create({ ...payload, photoUrl, matricule });

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        return Promise.reject(httpError(409, "Le téléphone est déjà utilisé"));
      }
      throw error;
    }
  }

  // ==========================
  // UPDATE
  // ==========================
  async update(id, data, file) {
    const employe = await this.repository.findById(id);
    if (!employe) return null;

    try {
      if (data.magasinId) {
        const magasin = await magasinRepository.findById(data.magasinId);
        if (!magasin) throw httpError(400, "Le magasin spécifié n'existe pas");
      }

      if (file) {
        if (employe.photoUrl) await uploadService.deleteImage(employe.photoUrl);
        const result = await uploadService.uploadImage(file, { folder: "employes" });
        data.photoUrl = result.secure_url;
      }

      // ✅ On s'assure que matricule n'est jamais modifiable
      delete data.matricule;

      return await super.update(id, data);

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        return Promise.reject(httpError(409, "Le téléphone est déjà utilisé"));
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

  // ==========================
  // DELETE (soft) + delete image
  // ==========================
  async delete(id) {
    const employe = await this.repository.findById(id);
    if (!employe) return null;

    if (employe.photoUrl) {
      await uploadService.deleteImage(employe.photoUrl);
    }

    await this.repository.softDelete(id);
    return true;
  }
}

export default new EmployeService();
