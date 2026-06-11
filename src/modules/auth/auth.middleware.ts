import { Request, Response, NextFunction }  from 'express';
import jwt from 'jsonwebtoken';



const JWT_SECRET  = process.env.JWT_SECRET || 'se3r2et';

export interface AuthenticatedRequest extends Request {
    userId?: string;
}


export const AuthenticatedSession = async (req : AuthenticatedRequest,res: Response,next : NextFunction) =>{

    const authHeader = req.headers.authorization;


    if(!authHeader || !authHeader.startsWith('Bearer')){

        return res.status(401).json({
            success : false,
            message: 'Access denied. Active session token missing.'
        })
    }

    const token = authHeader.split(' ')[1];


    if(!token) return res.status(401).json({
        success : false,
        message: 'Access denied. Active session token missing.'
    })

    try{

        const decoded = jwt.verify(token,JWT_SECRET) as { userId : string };
        req.userId = decoded.userId
        
        return next()

    }
    catch(error){
        return res.status(401)
        .json({ success: false, message: 'Session expired or compromised. Please re-authenticate.' });
    }
}