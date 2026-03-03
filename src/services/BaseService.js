import httpError from "../utils/httpError.js";

export default class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    async create(payload) {
        return this.repository.create(payload);
    }

    async getAll() {
        return this.repository.findAll();
    }

    async getById(id) {
        if (!id) {
            return null;
        }
        return this.repository.findById(id);
    }

    async update(id, payload) {
        const resource = await this.repository.findById(id);

        if (!resource) {
            return null;
        }

        return this.repository.updateById(id, payload);
    }

    async delete(id) {
        const resource = await this.repository.findById(id);

        if (!resource) {
            return null;
        }

        await this.repository.softDelete(id);
        return true;
    }

    async softDelete(id) {
        const resource = await this.repository.findById(id);

        if (!resource) {
            return null;
        }

        await this.repository.updateById(id, { deletedAt: new Date() });
        return true;
    }

    async restore(id) {
        const resource = await this.repository.findByIdIncludeDeleted(id);

        if (!resource) {
            return null;
        }

        await this.repository.updateById(id, { deletedAt: null });
        return true;
    }
}