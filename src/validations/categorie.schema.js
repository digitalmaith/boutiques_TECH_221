import z from "../config/zod.js";

const categorieSchema = z.object({
  code: z.string().min(2, "Le code doit contenir au moins 2 caractères").max(100),
  libelle: z.string().min(1, "Le libellé est obligatoire").max(255),
  sousCategorie: z.string().max(255).optional(),
});

export default categorieSchema;