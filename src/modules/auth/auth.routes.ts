import { Router,Request, Response,NextFunction } from 'express';
import * as authController from './auth.controller';
import { AnyZodObject } from 'zod';
import { resgisterSchema } from './auth.validation';

const router = Router();


const validator = (schema:AnyZodObject) =>(req:Request,res:Response,next:NextFunction)=>{
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



router.post('/register',validator(resgisterSchema))

export default router;
