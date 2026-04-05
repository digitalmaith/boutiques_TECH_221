import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repo.js";

const JWT_SECRET = process.env.JWT_SECRET || "boutique_tech_221_secret_key";
const JWT_EXPIRES_IN = "24h";

export const authService = {
  async register(email, password, nom, prenom) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Cet email est déjà utilisé");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      email,
      password: hashedPassword,
      nom,
      prenom,
    });

    const token = this.generateToken(user);
    return {
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
      },
      token,
    };
  },

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const token = this.generateToken(user);
    return {
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
      },
      token,
    };
  },

  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  },

  verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  },
};