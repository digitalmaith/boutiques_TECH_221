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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeCreatePayload'
 *           example:
 *             prenom: Ali
 *             nom: Ndiaye
 *             poste: CAISSIER
 *             telephone: "771234567"
 *             magasinId: 1
 *     responses:
 *       201:
 *         description: Employé créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employe'
 *       400:
 *         description: Données invalides ou magasin inexistant
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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeCreatePayload'
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