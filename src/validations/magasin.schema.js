import z from "../config/zod.js";

const magasinSchema = z.object({
    nom: z.string().min(1).max(255).optional(),
    adresse: z.string().min(1).max(255).optional(),
    ville: z.string().min(1).max(255).optional(),
});

export default magasinSchema;