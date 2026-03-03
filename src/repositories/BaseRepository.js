// src/repositories/BaseRepository.js
import prisma from "../config/prisma.js";

export default class BaseRepository {
  constructor(model) {
    this.model = model; // ex: prisma.employe ou prisma.magasin
  }

  // Création
  async create(data) {
    return this.model.create({ data });
  }

  // Récupérer tous (non supprimés)
  async findAll(options = {}) {
    return this.model.findMany({
      where: { deletedAt: null },
      ...options,
    });
  }

  // Récupérer par ID (non supprimé)
  async findById(id, options = {}) {
    return this.model.findFirst({
      where: { id, deletedAt: null },
      ...options,
    });
  }

  // Récupérer par ID incluant supprimés
  async findByIdIncludeDeleted(id, options = {}) {
    return this.model.findUnique({
      where: { id },
      ...options,
    });
  }

  // Mettre à jour
  async updateById(id, data) {
    return this.model.update({
      where: { id },
      data,
    });
  }

  // Soft delete
  async softDelete(id) {
    return this.model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // Restaurer
  async restore(id) {
    return this.model.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  // Récupérer supprimés
  async findDeleted(options = {}) {
    return this.model.findMany({
      where: { deletedAt: { not: null } },
      ...options,
    });
  }

  // Vérifier doublon
  async findOne(filter, options = {}) {
    return this.model.findFirst({
      where: filter,
      ...options,
    });
  }
}