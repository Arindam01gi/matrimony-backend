import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import authSwagger from '../modules/auth/auth.swagger.json';

// Base layout configurations for your system API
const baseSwaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Bengali Matrimony API Documentation',
    version: '1.0.0',
    description: 'Enterprise REST API backend built with Express, TypeScript, and Prisma.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local Development Server',
    },
  ],
  paths: {
    ...authSwagger.paths,
  },
};

export const setupSwagger = (app: Express): void => {

    const swaggerOptions = {
        swaggerOptions  : {
            filter : true
        }
    }
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(baseSwaggerDoc,swaggerOptions));
  console.log('🚀 Swagger documentation available at http://localhost:3000/api-docs');
};