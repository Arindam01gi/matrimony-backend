import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import jwt  from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_JWT';
const TOKEN_EXPIRE_MS = 7*24*60*1000;




const sendAuthenticatedSession = (user:any ,message : String, statusCode : number , res :Response) =>{
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV==='production',
        sameSite :  'lax',
        maxAge: TOKEN_EXPIRE_MS
    })

    return res.status(statusCode).json({
        success :true,
        message : "User authenticated successfully",
        user : user
    })
}






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

        return sendAuthenticatedSession(newUser,"Account created successfully! Welcome to your Matrimony profile.",201,res)

    }catch(error){
        next(error)
    }
}
