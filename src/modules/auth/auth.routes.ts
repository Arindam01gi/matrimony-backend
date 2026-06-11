import { Router,Request, Response,NextFunction } from 'express';
import { loginUser, registerUser }  from './auth.controller';
import { AnyZodObject, ZodEffects, ZodUnion } from 'zod';
import { loginSchema, resgisterSchema } from './auth.validation';

const router = Router();


const validator = (schema: AnyZodObject | ZodEffects<any> | ZodUnion<any>) =>(req:Request,res:Response,next:NextFunction)=>{
  try{
     schema.parseAsync({
        body : req.body,
        query : req.query,
        params  : req.params
     })

     return next();
  }catch(error :Error | unknown){
    return res.status(400).json({success: false , error: error instanceof Error ? error.message : 'Validation error'})
  }
}



router.post('/register',validator(resgisterSchema),registerUser)
router.post('/login',validator(loginSchema),loginUser)

export default router;
