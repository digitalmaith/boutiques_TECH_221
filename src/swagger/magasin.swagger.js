/**
 * @swagger
 * tags:
 *   name: Magasins
 *   description: Gestion des magasins
 */

/**
 * @swagger
 * /api/magasins:
 *   post:
 *     summary: Créer un nouveau magasin
 *     tags: [Magasins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MagasinCreatePayload'
 *     responses:
 *       201:
 *         description: Magasin créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Magasin'
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Magasin déjà existant
 */

/**
 * @swagger
 * /api/magasins/{id}:
 *   put:
 *     summary: Mettre à jour un magasin
 *     tags: [Magasins]
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
 *     responses:
 *       200:
 *         description: Magasin mis à jour
 *       400:
 *         description: Payload invalide ou identifiant invalide
 *       404:
 *         description: Magasin introuvable
 *
 *   delete:
 *     summary: Supprimer un magasin
 *     tags: [Magasins]
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
 *         description: Magasin supprimé
 *       400:
 *         description: Identifiant invalide
 *       404:
 *         description: Magasin introuvable
 */