/**
 * @swagger
 * tags:
 *   name: Employes
 *   description: Gestion des employés
 */

/**
 * @swagger
 * /api/employes:
 *   get:
 *     summary: Récupérer tous les employés
 *     tags: [Employes]
 *     responses:
 *       200:
 *         description: Liste des employés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employe'
 */

/**
 * @swagger
 * /api/employes/{id}:
 *   get:
 *     summary: Récupérer un employé par ID
 *     tags: [Employes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de l'employé
 *     responses:
 *       200:
 *         description: Employé trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employe'
 *       404:
 *         description: Employé introuvable
 */

/**
 * @swagger
 * /api/employes:
 *   post:
 *     summary: Créer un employé
 *     tags: [Employes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - prenom
 *               - nom
 *               - poste
 *               - telephone
 *               - magasinId
 *             properties:
 *               prenom:
 *                 type: string
 *                 example: Ali
 *               nom:
 *                 type: string
 *                 example: Ndiaye
 *               poste:
 *                 type: string
 *                 enum: [CAISSIER, VENDEUR, MANAGER]
 *               telephone:
 *                 type: string
 *                 example: "771234567"
 *               magasinId:
 *                 type: integer
 *                 example: 1
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Photo de l'employé (JPEG/PNG, max 2Mo) - optionnelle
 *     responses:
 *       201:
 *         description: Employé créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employe'
 *       400:
 *         description: Données invalides, magasin inexistant ou fichier invalide
 */
/**
 * @swagger
 * /api/employes/{id}:
 *   put:
 *     summary: Mettre à jour un employé
 *     tags: [Employes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - prenom
 *               - nom
 *               - poste
 *               - telephone
 *               - magasinId
 *             properties:
 *               prenom:
 *                 type: string
 *                 example: modifier
 *               nom:
 *                 type: string
 *                 example: modifier
 *               poste:
 *                 type: string
 *                 enum: [CAISSIER, VENDEUR, MANAGER]
 *                 example: CAISSIER
 *               telephone:
 *                 type: string
 *                 example: "771234567"
 *               magasinId:
 *                 type: integer
 *                 example: 1
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Nouvelle photo (JPEG/PNG, max 2Mo) - optionnelle
 *     responses:
 *       200:
 *         description: Employé mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employe'
 *       404:
 *         description: Employé introuvable
 */
/**
 * @swagger
 * /api/employes/{id}:
 *   delete:
 *     summary: Supprimer un employé (soft delete)
 *     tags: [Employes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       204:
 *         description: Employé archivé avec succès
 *       404:
 *         description: Employé introuvable
 */

/**
 * @swagger
 * /api/employes/{id}/restore:
 *   patch:
 *     summary: Restaurer un employé soft-deleted
 *     tags: [Employes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de l'employé à restaurer
 *     responses:
 *       200:
 *         description: Employé restauré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employe'
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Employé introuvable
 */

/**
 * @swagger
 * /api/employes/deleted:
 *   get:
 *     summary: Récupérer tous les employés soft-deleted
 *     tags: [Employes]
 *     responses:
 *       200:
 *         description: Liste des employés supprimés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employe'
 */