import e from "../config/express.js";
import { produitController, validateCreate, validateUpdate } from '../controllers/produit.controller.js';

const router = e.router;

router.get('/', produitController.getAllProduits);
router.get('/:id', produitController.getProduitById);
router.post('/', validateCreate, produitController.createProduit);
router.put('/:id', validateUpdate, produitController.updateProduit);
router.delete('/:id', produitController.deleteProduit);
router.patch('/:id/stock', produitController.updateStock);
router.patch('/:id/stock/add', produitController.addStock);
router.patch('/:id/stock/remove', produitController.removeStock);
router.get('/:id/stock/check', produitController.checkStock);

export default router;