import z from "../config/zod.js";

const magasinSchema = z.object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(255),
    adresse: z.string().min(3, "L'adresse doit contenir au moins 3 caractères").max(255),
    ville: z.string().min(1, "La ville est obligatoire").max(255),
});

export default magasinSchema;