import z from "../config/zod.js";

const employeSchema = z.object({
    prenom: z.string().min(2).max(100),
  nom: z.string().min(2).max(100),

  poste: z.enum(["CAISSIER", "VENDEUR", "MANAGER"]),

  telephone: z
    .string()
    .min(8)
    .regex(/^[0-9+ ]+$/, "Format téléphone invalide"),

  magasinId: z.number().int().positive()
});
const employeUpdateSchema = employeSchema.partial();

export { employeUpdateSchema };
export default employeSchema;
