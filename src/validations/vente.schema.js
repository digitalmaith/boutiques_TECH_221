import z from "../config/zod.js";

const venteSchema = z.object({
  employeId: z.number().int().positive(),
  produitId: z.number().int().positive(),
  quantite: z.number().int().positive(),
  dateVente: z.coerce.date()
    .refine((date) => date <= new Date(), {
      message: "La date de vente ne peut pas être dans le futur",
    })
    .optional(),
});

export default venteSchema;
