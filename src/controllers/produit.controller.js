import produitService from '../services/produit.service.js';
import cloudinaryService from '../services/cloudinary.service.js';
import { createProduitSchema, updateProduitSchema } from '../validations/produit.schema.js';
import validateMiddleware from '../middlewares/validate.js';

class ProduitController {
  async getAllProduits(req, res) {
    try {
      const produits = await produitService.getAllProduits();
      res.status(200).json({ status: 'success', data: produits, message: 'Produits récupérés avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }

  async getProduitById(req, res) {
    try {
      const produit = await produitService.getProduitById(parseInt(req.params.id));
      res.status(200).json({ status: 'success', data: produit, message: 'Produit récupéré avec succès' });
    } catch (error) {
      if (error.cause?.status === 404) {
        res.status(404).json({ message: 'Produit non trouvé' });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    }
  }

  async createProduit(req, res) {
    try {
      const payload = { ...req.body };

      if (req.file) {
        payload.image = await cloudinaryService.uploadImage(req.file);
      }

      const produit = await produitService.createProduit(payload);
      res.status(201).json({ status: 'success', data: produit, message: 'Produit créé avec succès' });
    } catch (error) {
      if (error.cause?.status === 400) {
        res.status(400).json({ message: error.message });
      } else if (error.cause?.status === 500) {
        res.status(500).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    }
  }

  async updateProduit(req, res) {
    try {
      const payload = { ...req.body };

      if (req.file) {
        payload.image = await cloudinaryService.uploadImage(req.file);
      }

      const produit = await produitService.updateProduit(parseInt(req.params.id), payload);
      res.status(200).json({ status: 'success', data: produit, message: 'Produit mis à jour avec succès' });
    } catch (error) {
      if (error.cause?.status === 404) {
        res.status(404).json({ message: 'Produit non trouvé' });
      } else if (error.cause?.status === 400) {
        res.status(400).json({ message: error.message });
      } else if (error.cause?.status === 500) {
        res.status(500).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    }
  }

  async deleteProduit(req, res) {
    try {
      await produitService.deleteProduit(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      if (error.cause?.status === 404) {
        res.status(404).json({ message: 'Produit non trouvé' });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    }
  }

  async updateStock(req, res) {
    try {
      const produit = await produitService.updateStock(parseInt(req.params.id), parseInt(req.body.quantite));
      res.status(200).json({ status: 'success', data: produit, message: 'Stock mis à jour avec succès' });
    } catch (error) {
      if (error.cause?.status === 400) {
        res.status(400).json({ message: error.message });
      } else if (error.cause?.status === 404) {
        res.status(404).json({ message: 'Produit non trouvé' });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    }
  }

  async addStock(req, res) {
    try {
      const produit = await produitService.addStock(parseInt(req.params.id), parseInt(req.body.quantite));
      res.status(200).json({ status: 'success', data: produit, message: 'Stock ajouté avec succès' });
    } catch (error) {
      if (error.cause?.status === 400) {
        res.status(400).json({ message: error.message });
      } else if (error.cause?.status === 404) {
        res.status(404).json({ message: 'Produit non trouvé' });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    }
  }

  async removeStock(req, res) {
    try {
      const produit = await produitService.removeStock(parseInt(req.params.id), parseInt(req.body.quantite));
      res.status(200).json({ status: 'success', data: produit, message: 'Stock retiré avec succès' });
    } catch (error) {
      if (error.cause?.status === 400) {
        res.status(400).json({ message: error.message });
      } else if (error.cause?.status === 404) {
        res.status(404).json({ message: 'Produit non trouvé' });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    }
  }

  async checkStock(req, res) {
    try {
      const hasStock = await produitService.checkStock(parseInt(req.params.id), parseInt(req.body.quantite));
      res.status(200).json({ status: 'success', data: hasStock, message: 'Stock vérifié avec succès' });
    } catch (error) {
      if (error.cause?.status === 400) {
        res.status(400).json({ message: error.message });
      } else if (error.cause?.status === 404) {
        res.status(404).json({ message: 'Produit non trouvé' });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    }
  }
}

const produitController = new ProduitController();
const validateCreate = validateMiddleware(createProduitSchema);
const validateUpdate = validateMiddleware(updateProduitSchema);

export { produitController, validateCreate, validateUpdate };
