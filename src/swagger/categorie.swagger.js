/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestion des catégories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CategorieCreatePayload:
 *       type: "object"
 *       additionalProperties: false
 *       required: ["code", "libelle"]
 *       properties:
 *         code: { type: "string", minLength: 2, maxLength: 100, example: "ELEC" }
 *         libelle: { type: "string", minLength: 1, maxLength: 255, example: "Électronique" }
 *         sousCategorie: { type: "string", maxLength: 255, example: "Ordinateurs portables" }
 * 
 *     CategorieUpdatePayload:
 *       type: "object"
 *       additionalProperties: false
 *       properties:
 *         code: { type: "string", minLength: 2, maxLength: 100, example: "ELEC" }
 *         libelle: { type: "string", minLength: 1, maxLength: 255, example: "Électronique" }
 *         sousCategorie: { type: "string", maxLength: 255, example: "Ordinateurs portables" }
 * 
 *     Categorie:
 *       type: "object"
 *       properties:
 *         id: { type: "integer", example: 1 }
 *         code: { type: "string", example: "ELEC" }
 *         libelle: { type: "string", example: "Électronique" }
 *         sousCategorie: { type: "string", nullable: true, example: "Ordinateurs portables" }
 *         createdAt: { type: "string", format: "date-time" }
 *         updatedAt: { type: "string", format: "date-time" }
 * 
 * /api/categories:
 *   get:
 *     summary: Récupère la liste de toutes les catégories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 $ref: "#/components/schemas/Categorie"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 * 
 *   post:
 *     summary: Crée une nouvelle catégorie
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CategorieCreatePayload"
 *           example:
 *             code: "ELEC"
 *             libelle: "Électronique"
 *             sousCategorie: "Ordinateurs portables"
 *     responses:
 *       201:
 *         description: Créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Categorie"
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 * 
 * /api/categories/{id}:
 *   get:
 *     summary: Récupère une catégorie par son ID
 *     tags: [Categories]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *         description: "ID de la catégorie à récupérer"
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Categorie"
 *       404:
 *         description: Catégorie non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 * 
 *   put:
 *     summary: Met à jour une catégorie
 *     tags: [Categories]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *         description: "ID de la catégorie à mettre à jour"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CategorieUpdatePayload"
 *     responses:
 *       200:
 *         description: Mise à jour réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Categorie"
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Catégorie non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 * 
 *   delete:
 *     summary: Supprime une catégorie
 *     tags: [Categories]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *         description: "ID de la catégorie à supprimer"
 *     responses:
 *       204:
 *         description: Suppression réussie (sans contenu)
 *       404:
 *         description: Catégorie non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */