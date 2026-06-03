import { Router } from 'express';
import * as authController from './auth.controller';

const router = Router();

// Define your Auth module routes here
// router.get('/', authController.getAuthData);

router.post('/register',authController.getAuthData)

export default router;
