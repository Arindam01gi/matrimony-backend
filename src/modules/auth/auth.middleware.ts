import { Request, Response, NextFunction }  from 'express';
import jwt from 'jsonwebtoken';



const ACCESS_SECRET  = process.env.ACCESS_SECRET || 'accessS3cert';

export interface AuthenticatedRequest extends Request {
    userId?: string;
}


export const AuthenticatedSession = (req : AuthenticatedRequest,res: Response,next : NextFunction) =>{

    const authHeader = req.headers.authorization;


    if(!authHeader || !authHeader.startsWith('Bearer ')){

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

        const decoded = jwt.verify(token,ACCESS_SECRET) as { userId : string };
        req.userId = decoded.userId
        
        return next()

    }
    catch(error :any ){
        console.error("================ JWT VERIFICATION FAILURE ================");
        console.error("❌ Error Message:", error.message); 
        console.error("🔑 Secret string utilized for verification:", ACCESS_SECRET === 'accessS3cert' ? 'FALLBACK DEFAULT (accessS3cert)' : 'LOADED FROM ENV');
        console.error("==========================================================");
        return res.status(401)
        .json({ success: false, message: 'Session expired or compromised. Please re-authenticate.' });
    }
}