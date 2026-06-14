import { Router } from 'express'
import { AuthenticatedSession } from '../auth/auth.middleware';
import { validator } from '../auth/auth.routes';
import { saveProfileProgressSchema } from './profile.validation';
import { getMyProfile, saveOnboardingProgress } from './profile.controller';


const router = Router();


router.post(
    "/onboard/save",
    AuthenticatedSession,
    validator(saveProfileProgressSchema),
    saveOnboardingProgress
)

router.get(
    "/me", 
    AuthenticatedSession, 
    getMyProfile
)



export default router;


