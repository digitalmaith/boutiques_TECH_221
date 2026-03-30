import express from 'express';
import { produitController, validateCreate, validateUpdate } from '../controllers/produit.controller.js';
import { uploadProduitImage } from '../middlewares/upload.js';

const router = express.Router();

router.get('/', produitController.getAllProduits);
router.get('/:id', produitController.getProduitById);
router.post('/', uploadProduitImage, validateCreate, produitController.createProduit);
router.put('/:id', uploadProduitImage, validateUpdate, produitController.updateProduit);
router.delete('/:id', produitController.deleteProduit);
router.patch('/:id/stock', produitController.updateStock);
router.patch('/:id/stock/add', produitController.addStock);
router.patch('/:id/stock/remove', produitController.removeStock);
router.get('/:id/stock/check', produitController.checkStock);

export default router;
