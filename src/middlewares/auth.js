import { authService } from "../services/auth.service.js";
import { HttpError } from "../utils/httpError.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpError(401, "Token manquant");
    }

    const token = authHeader.split(" ")[1];
    const decoded = authService.verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next(new HttpError(401, "Token invalide"));
    } else if (error.name === "TokenExpiredError") {
      next(new HttpError(401, "Token expiré"));
    } else {
      next(error);
    }
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = authService.verifyToken(token);
      req.user = decoded;
    }

    next();
  } catch (error) {
    next();
  }
};