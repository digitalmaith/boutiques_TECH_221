import z from "../config/zod.js";

const venteSchema = z.object({
  employeId: z.number().int().positive(),
  produitId: z.number().int().positive(),
  quantite: z.number().int().positive(),
  dateVente: z.coerce.date().optional(),
});

export default venteSchema;
