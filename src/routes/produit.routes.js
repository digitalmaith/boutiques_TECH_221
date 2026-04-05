import express from 'express';
import { produitController, validateCreate, validateUpdate } from '../controllers/produit.controller.js';
import { uploadProduitImage } from '../middlewares/upload.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authMiddleware, produitController.getAllProduits);
router.get('/:id', authMiddleware, produitController.getProduitById);
router.post('/', authMiddleware, uploadProduitImage, validateCreate, produitController.createProduit);
router.put('/:id', authMiddleware, uploadProduitImage, validateUpdate, produitController.updateProduit);
router.delete('/:id', authMiddleware, produitController.deleteProduit);
router.patch('/:id/stock', authMiddleware, produitController.updateStock);
router.patch('/:id/stock/add', authMiddleware, produitController.addStock);
router.patch('/:id/stock/remove', authMiddleware, produitController.removeStock);
router.get('/:id/stock/check', authMiddleware, produitController.checkStock);

export default router;
