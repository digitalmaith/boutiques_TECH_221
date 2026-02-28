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
      schemas: {
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
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;   
