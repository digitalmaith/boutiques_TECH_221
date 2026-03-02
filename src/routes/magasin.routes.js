import e from "../config/express.js";
import magasinController from "../controllers/magasin.controller.js";
import validateMiddleware from "../middlewares/validate.js";
import magasinSchema from "../validations/magasin.schema.js";

const router = e.router;

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
router.put("/:id", validateMiddleware(magasinSchema), magasinController.update);
/**
 * @swagger
 * /api/magasins/{id}:
 *   delete:
 *     tags:
 *       - Magasins
 *     summary: Supprimer un magasin
 *     description: Supprime un magasin par son identifiant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID du magasin
 *     responses:
 *       204:
 *         description: Magasin supprime avec succes
 *       400:
 *         description: Identifiant invalide
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
router.delete("/:id", magasinController.delete);

export default router;
