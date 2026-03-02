/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: Gestion des produits
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProduitCreatePayload:
 *       type: "object"
 *       additionalProperties: false
 *       required: ["libelle", "prix", "qteStock"]
 *       properties:
 *         libelle: { type: "string", minLength: 1, maxLength: 255, example: "Laptop Dell XPS" }
 *         prix: { type: "number", minimum: 0, example: 1299.99 }
 *         qteStock: { type: "integer", minimum: 0, example: 50 }
 * 
 *     ProduitUpdatePayload:
 *       type: "object"
 *       additionalProperties: false
 *       properties:
 *         libelle: { type: "string", minLength: 1, maxLength: 255, example: "Laptop Dell XPS" }
 *         prix: { type: "number", minimum: 0, example: 1299.99 }
 *         qteStock: { type: "integer", minimum: 0, example: 50 }
 * 
 *     Produit:
 *       type: "object"
 *       properties:
 *         id: { type: "integer", example: 1 }
 *         libelle: { type: "string", example: "Laptop Dell XPS" }
 *         prix: { type: "number", example: 1299.99 }
 *         qteStock: { type: "integer", example: 50 }
 *         deletedAt: { type: "string", format: "date-time", nullable: true }
 *         createdAt: { type: "string", format: "date-time" }
 *         updatedAt: { type: "string", format: "date-time" }
 * 
 * /api/produits:
 *   get:
 *     summary: Récupère la liste de tous les produits (non supprimés)
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 $ref: "#/components/schemas/Produit"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 * 
 *   post:
 *     summary: Crée un nouveau produit
 *     tags: [Produits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProduitCreatePayload"
 *     responses:
 *       201:
 *         description: Créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Produit"
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
 * /api/produits/{id}:
 *   get:
 *     summary: Récupère un produit par son ID
 *     tags: [Produits]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *         description: "ID du produit à récupérer"
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Produit"
 *       404:
 *         description: Produit non trouvé
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
 *     summary: Met à jour un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *         description: "ID du produit à mettre à jour"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProduitUpdatePayload"
 *     responses:
 *       200:
 *         description: Mise à jour réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Produit"
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Produit non trouvé
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
 *     summary: Supprime un produit (soft delete)
 *     tags: [Produits]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *         description: "ID du produit à supprimer"
 *     responses:
 *       204:
 *         description: Suppression réussie (sans contenu)
 *       404:
 *         description: Produit non trouvé
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
 * /api/produits/{id}/stock:
 *   patch:
 *     summary: Met à jour le stock d'un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *         description: "ID du produit"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             additionalProperties: false
 *             required: ["qteStock"]
 *             properties:
 *               qteStock: { type: "integer", minimum: 0, example: 60 }
 *     responses:
 *       200:
 *         description: Stock mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Produit"
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Produit non trouvé
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
 * /api/produits/{id}/stock/add:
 *   patch:
 *     summary: Ajoute du stock à un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *         description: "ID du produit"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             additionalProperties: false
 *             required: ["quantite"]
 *             properties:
 *               quantite: { type: "integer", minimum: 1, example: 10 }
 *     responses:
 *       200:
 *         description: Stock ajouté
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Produit"
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Produit non trouvé
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
 * /api/produits/{id}/stock/remove:
 *   patch:
 *     summary: Retire du stock d'un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *         description: "ID du produit"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             additionalProperties: false
 *             required: ["quantite"]
 *             properties:
 *               quantite: { type: "integer", minimum: 1, example: 5 }
 *     responses:
 *       200:
 *         description: Stock retiré
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Produit"
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Produit non trouvé
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
 * /api/produits/{id}/stock/check:
 *   get:
 *     summary: Vérifie le stock d'un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *         description: "ID du produit"
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 id: { type: "integer", example: 1 }
 *                 libelle: { type: "string", example: "Laptop Dell XPS" }
 *                 qteStock: { type: "integer", example: 50 }
 *       404:
 *         description: Produit non trouvé
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