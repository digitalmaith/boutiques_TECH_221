import { z } from 'zod';

const numberField = (fieldName, schema) =>
  z.preprocess((value) => {
    if (value === undefined || value === null || value === "") {
      return value;
    }

    if (typeof value === "number") {
      return value;
    }

    return Number(value);
  }, schema);

// Schéma de validation pour la création d'un produit
export const createProduitSchema = z.object({
  libelle: z.string().min(2, 'Le libellé doit contenir au moins 2 caractères').max(100, 'Le libellé ne peut pas dépasser 100 caractères'),
  prix: numberField("Le prix", z.number({
    invalid_type_error: 'Le prix doit etre un nombre',
  }).positive('Le prix doit être positif').min(0.01, 'Le prix minimum est de 0.01')),
  qteStock: numberField("La quantite", z.number({
    invalid_type_error: 'La quantite doit etre un nombre',
  }).int('La quantité doit être un entier').min(0, 'La quantité ne peut pas être négative')),
  categorieId: numberField("La categorie", z.number({
    invalid_type_error: 'La categorie doit etre un nombre',
  }).int().positive('La catégorie est obligatoire')),
  image: z.string().url('L\'image doit être une URL valide').optional().nullable(),
});

// Schéma de validation pour la mise à jour d'un produit
export const updateProduitSchema = createProduitSchema.partial();
