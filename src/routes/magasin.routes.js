import e from "../config/express.js";
import magasinController from "../controllers/magasin.controller.js";
import validateMiddleware from "../middlewares/validate.js";
import magasinSchema from "../validations/magasin.schema.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = e.router;

// CRUD Magasin - toutes les routes nécessitent une authentification
router.post("/", authMiddleware, validateMiddleware(magasinSchema), magasinController.create);
/**
 * @swagger
 * /api/magasins/{id}:
 *   put:
 *     tags:
 *       - Magasins
 *     summary: Mettre a jour un magasin
 *     description: Met a jour partiellement un magasin par son identifiant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID du magasin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MagasinUpdatePayload'
 *           examples:
 *             simple:
 *               value:
 *                 nom: Tech Center
 *                 adresse: 12 Rue des Lilas
 *                 ville: Dakar
 *     responses:
 *       200:
 *         description: Magasin mis a jour avec succes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Magasin'
 *       400:
 *         description: Payload invalide ou identifiant invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Magasin introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/:id", authMiddleware, validateMiddleware(magasinSchema), magasinController.update);
router.delete("/:id", authMiddleware, magasinController.delete);
router.get("/", authMiddleware, magasinController.getAll);
router.get("/:id", authMiddleware, magasinController.getById);

export default router;