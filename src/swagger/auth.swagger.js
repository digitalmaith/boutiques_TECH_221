export const authSwagger = {
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Inscription d'un nouvel utilisateur",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password", "nom", "prenom"],
              properties: {
                email: { type: "string", format: "email" },
                password: { type: "string", minLength: 6 },
                nom: { type: "string" },
                prenom: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Inscription réussie",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Inscription réussie",
                data: {
                  user: { id: 1, email: "test@test.com", nom: "Dupont", prenom: "Jean", role: "USER" },
                  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
            },
          },
        },
        400: { description: "Erreur de validation ou email déjà utilisé" },
      },
    },
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Connexion d'un utilisateur",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string", format: "email" },
                password: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Connexion réussie",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Connexion réussie",
                data: {
                  user: { id: 1, email: "test@test.com", nom: "Dupont", prenom: "Jean", role: "USER" },
                  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
            },
          },
        },
        401: { description: "Email ou mot de passe incorrect" },
      },
    },
  },
};