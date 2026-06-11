import  { Response } from 'express';
import jwt from 'jsonwebtoken';


const ACCESS_SECRET = process.env.ACCESS_SECRET || "accessS3cert";
const RESFRESH_SECRET = process.env.RESFRESH_SECRET || "refereshS3cert";



const REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;


export const sendAuthenticatedSession = (
    res: Response,
    statusCode : number,
    userPayload : { id: String , email?: string | null , phone?: string|null},
    customMessage : String
) =>{


    // Generate access token

    const accessToken = jwt.sign(
        {userId : userPayload.id},
        ACCESS_SECRET,
        {expiresIn : '15m'}
    )


    // generate referesh token

    const refreshToken = jwt.sign (
        {userId : userPayload.id},
        RESFRESH_SECRET,
        { expiresIn : '7d' }
    )


    res.cookie('refreshToken',refreshToken,{
        httpOnly : true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: REFRESH_TOKEN_EXPIRY_MS,
        path: '/api/v1/auth/refresh',
    })


    return res.status(statusCode).json({
        success: true,
        message: customMessage,
        accessToken, // Send the short-lived access token back in the JSON body
        user: {
            id: userPayload.id,
            email: userPayload.email,
            phone: userPayload.phone
        }
    });





}