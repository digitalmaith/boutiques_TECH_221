import { authService } from "../services/auth.service.js";
import response from "../utils/response.js";
import { HttpError } from "../utils/httpError.js";

export const authController = {
  async register(req, res, next) {
    try {
      const { email, password, nom, prenom } = req.body;
      const result = await authService.register(email, password, nom, prenom);
      response(res, 201, { success: true, message: "Inscription réussie", data: result });
    } catch (error) {
      next(new HttpError(400, error.message));
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      response(res, 200, { success: true, message: "Connexion réussie", data: result });
    } catch (error) {
      next(new HttpError(401, error.message));
    }
  },

  async getProfile(req, res, next) {
    try {
      const user = req.user;
      response(res, 200, { success: true, message: "Profil récupéré", data: user });
    } catch (error) {
      next(new HttpError(500, error.message));
    }
  },
};