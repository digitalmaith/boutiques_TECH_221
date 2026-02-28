import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Boutiques TECH 221 API',
      version: '1.0.0',
      description: 'API documentation for the Boutiques TECH 221 application',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;   