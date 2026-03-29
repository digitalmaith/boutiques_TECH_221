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
 *           examples:
 *             sample:
 *               value:
 *                 nom: Tech Store
 *                 adresse: Avenue Cheikh Anta Diop
 *                 ville: Dakar
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
 *           examples:
 *             sample:
 *               value:
 *                 nom: Tech Center
 *                 adresse: 12 Rue des Lilas
 *                 ville: Dakar
 *     responses:
 *       200:
 *         description: Magasin mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Magasin'
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

/**
 * @swagger
 * /api/magasins:
 *   get:
 *     summary: Récupérer tous les magasins
 *     tags: [Magasins]
 *     responses:
 *       200:
 *         description: Liste des magasins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Magasin'
 *
 * /api/magasins/{id}:
 *   get:
 *     summary: Récupérer un magasin par ID
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
 *       200:
 *         description: Magasin trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Magasin'
 *       400:
 *         description: Identifiant invalide
 *       404:
 *         description: Magasin introuvable
 */

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
