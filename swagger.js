import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Boutiques TECH 221 API',
      version: '1.0.0',
      description: 'Documentation des routes de l API Boutiques TECH 221',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // Auth schemas
        RegisterPayload: {
          type: "object",
          required: ["email", "password", "nom", "prenom"],
          properties: {
            email: { type: "string", format: "email", example: "test@test.com" },
            password: { type: "string", minLength: 6, example: "123456" },
            nom: { type: "string", example: "Dupont" },
            prenom: { type: "string", example: "Jean" }
          }
        },
        LoginPayload: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "test@test.com" },
            password: { type: "string", example: "123456" }
          }
        },
        AuthResponse: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                email: { type: "string", example: "test@test.com" },
                nom: { type: "string", example: "Dupont" },
                prenom: { type: "string", example: "Jean" },
                role: { type: "string", example: "USER" }
              }
            },
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
          }
        },
        // Magasin schemas
        MagasinCreatePayload: {
          type: "object",
          additionalProperties: false,
          required: ["nom", "adresse", "ville"],
          properties: {
            nom: { type: "string", minLength: 1, maxLength: 255, example: "Tech Center" },
            adresse: { type: "string", minLength: 1, maxLength: 255, example: "12 Rue des Lilas" },
            ville: { type: "string", minLength: 1, maxLength: 255, example: "Dakar" }
          }
        },
        MagasinUpdatePayload: {
          type: "object",
          additionalProperties: false,
          properties: {
            nom: { type: "string", minLength: 1, maxLength: 255, example: "Tech Center" },
            adresse: { type: "string", minLength: 1, maxLength: 255, example: "12 Rue des Lilas" },
            ville: { type: "string", minLength: 1, maxLength: 255, example: "Dakar" }
          }
        },
        Magasin: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nom: { type: "string", example: "Tech Center" },
            adresse: { type: "string", example: "12 Rue des Lilas" },
            ville: { type: "string", example: "Dakar" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        EmployeCreatePayload: {
          type: "object",
          required: ["prenom", "nom", "poste", "telephone", "magasinId"],
          properties: {
            prenom: { type: "string", example: "Ali" },
            nom: { type: "string", example: "Ndiaye" },
            poste: { 
              type: "string",
              enum: ["CAISSIER", "VENDEUR", "MANAGER"],
              example: "CAISSIER"
            },
            telephone: { type: "string", example: "771234567" },
            magasinId: { type: "integer", example: 1 }
          }
        },

        Employe: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            prenom: { type: "string", example: "Ali" },
            nom: { type: "string", example: "Ndiaye" },
            poste: { 
              type: "string",
              enum: ["CAISSIER", "VENDEUR", "MANAGER"]
            },
            telephone: { type: "string", example: "771234567" },
            magasinId: { type: "integer", example: 1 },
            isDeleted: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "id invalide" },
            status: { type: "integer", example: 400 },
            stack: { type: "string", nullable: true }
          }
        }
      }
    }
  },
  apis: ['./src/swagger/*.js' , './src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;   
