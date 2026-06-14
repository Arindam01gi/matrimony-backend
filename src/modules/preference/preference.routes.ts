import { Router } from 'express';
import * as preferenceController from './preference.controller';
import { AuthenticatedSession } from '../auth/auth.middleware';
import { validator } from '../auth/auth.routes';
import { savePreferenceSchema } from './preference.validation';

const router = Router();



router.post(
    "/save",
    AuthenticatedSession,
    validator(savePreferenceSchema),
    preferenceController.savePrefereneceProgress
)


router.get(
    "/me",
    AuthenticatedSession,
    preferenceController.getMyPreference
)

export default router;
