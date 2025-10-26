const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.3',
    info: { title: 'API Recetas', version: '1.0.0' },
    servers: [{ url: 'http://localhost:5000' }]
  },
  apis: [path.join(__dirname, '..', 'routes', '*.js')]
};

// Agregamos components aquí para que $ref funcione siempre
options.definition.components = {
  schemas: {
    ImageObj: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'http://localhost:5000/uploads/abc.png' },
        caption: { type: 'string', example: '' }
      }
    },
    Recipe: {
      type: 'object',
      properties: {
        _id: { type: 'string', example: '671b6be6f0b8d8d2b3c12345' },
        name: { type: 'string', example: 'Masaco de yuca' },
        baureName: { type: 'string', example: 'Tunu Masako' },
        description: { type: 'string', example: 'Plato tradicional con yuca y queso.' },
        ingredients: { type: 'array', items: { type: 'string' }, example: ['yuca','queso','sal'] },
        preparation: { type: 'string', example: 'Rallar yuca, mezclar con queso, dorar...' },
        utensils: { type: 'array', items: { type: 'string' }, example: ['rallador','sartén'] },
        consumption: { type: 'string', example: 'Consumir caliente' },
        conservation: { type: 'string', example: 'Refrigerar hasta 24h' },
        sourcePerson: { type: 'string', example: 'Relato de: Adil Arredondo' },
        tags: { type: 'array', items: { type: 'string' }, example: ['Tradicional','Yuca'] },
        imageUrl: { type: 'string', nullable: true, example: 'http://localhost:5000/uploads/abc.png' },
        images: { type: 'array', items: { $ref: '#/components/schemas/ImageObj' } }
      }
    },
    ErrorResponse: {
      type: 'object',
      properties: { message: { type: 'string', example: 'El campo "name" es requerido' } }
    }
  }
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
  console.log('📘 Swagger UI en: http://localhost:5000/api/docs');
}

module.exports = swaggerDocs;
