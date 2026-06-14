import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import authSwagger from '../modules/auth/auth.swagger.json';
import profileSwagger from '../modules/profile/profile.swagger.json';

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
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Input your active session JWT token into the field below to unlock the secure AuthenticatedSession routing endpoints.',
      },
    },
    // 🛠️ SAFE OPTIONAL CHAINING FIX HERE
    schemas: {
      ...(authSwagger as any).components?.schemas,
      ...profileSwagger.components?.schemas // Works fine since profile.swagger.json has components defined
    }
  },
  paths: {
    ...authSwagger.paths,
    ...profileSwagger.paths,
  },
};

export const setupSwagger = (app: Express): void => {
  const swaggerOptions = {
    swaggerOptions: {
      filter: true,
    },
  };
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(baseSwaggerDoc, swaggerOptions));
  console.log('🚀 Swagger documentation available at http://localhost:3000/api-docs');
};