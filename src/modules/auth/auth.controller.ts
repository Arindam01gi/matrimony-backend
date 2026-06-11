import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import { sendAuthenticatedSession } from './auth.utils';
import bcrypt from 'bcryptjs';




export const registerUser = async (req : Request, res :Response , next : NextFunction) =>{
    
    try{
        const { firstName ,lastName , email, password,phone} = req.body;

        if(email){
            const existingEmail  = await authService.findUserByEmail(email);
            if(existingEmail) return res.status(400).json({
                 success : false ,
                 message : "Email already exists"
            })
        }

        if(phone) {
            const existingPhone = await authService.findUserByPhone(phone);
            if(existingPhone) return res.status(400) .json({
                success : false,
                message : "Phone number already exists"
            })
        }

        const newUser = await authService.createUser({
            firstName,
            lastName,
            email,
            phone,
            passwordRaw: password
        })

        return sendAuthenticatedSession(res ,201, newUser,"Account created successfully! Welcome to your Matrimony profile.")

    }catch(error){
        next(error)
    }
}


export const loginUser = async (req : Request , res: Response , next : NextFunction) =>{

       try{
        const {email , phone , password } = req.body;
        let user = null;
        if(email) {
           user = await authService.findUserByEmail(email)
        }else if(phone) {
           user = await authService.findUserByPhone(phone);
        }


        if(!user) {
            return res.status(401)
            .json({
                success : false,
                message : 'Invalid credntial. Please try again'
            })
        }


        const isPasswordValid = await bcrypt.compare(password,user.passwordWithHash)
        
        if(!isPasswordValid) return res.status(401).json({
            success : false,
            message : 'Invalid credntial. Please try again'
        })


        const userPayload = {
            id : user.id,
            email : user.email,
            phone : user.phone
        }


        return sendAuthenticatedSession(
            res,200,userPayload, 'Login verified successfully'
        )




       }catch(error) {
        next(error)
       }


}
