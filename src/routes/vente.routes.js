
import express from 'express';
import venteController from "../controllers/vente.controller.js";
import validateMiddleware from "../middlewares/validate.js";
import venteSchema from "../validations/vente.schema.js";
import { authMiddleware } from "../middlewares/auth.js";


const router = express.Router();

router.post("/", authMiddleware, validateMiddleware(venteSchema), venteController.create);

/**
 * @swagger
 * /api/ventes:
 *   post:
 *     tags:
 *       - Ventes
 *     summary: Creer une vente
 *     description: Cree une vente, verifie le stock, calcule le montant total et met a jour le stock produit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeId
 *               - produitId
 *               - quantite
 *             properties:
 *               employeId:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *               produitId:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *               quantite:
 *                 type: integer
 *                 minimum: 1
 *                 example: 3
 *               dateVente:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-03-02T10:30:00.000Z"
 *     responses:
 *       201:
 *         description: Vente creee avec succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 dateVente:
 *                   type: string
 *                   format: date-time
 *                 montantTotal:
 *                   type: number
 *                 quantite:
 *                   type: integer
 *                 employeId:
 *                   type: integer
 *                 produitId:
 *                   type: integer
 *       400:
 *         description: Payload invalide ou stock insuffisant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Employe ou produit introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export default router;
