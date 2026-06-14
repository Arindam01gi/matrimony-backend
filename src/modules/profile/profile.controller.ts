import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../auth/auth.middleware";
import { getUserbyId, updateProfileProgress } from "./profile.service";



export const saveOnboardingProgress = async (req : AuthenticatedRequest , res : Response , next : NextFunction): Promise<void> =>{

        try {
            const userId = req.userId;

            if(!userId){
             res.status(401).json({
                success: false,
                message: "User is not authenticated"
             })
             return ;
            }


            const updateProfile = await updateProfileProgress(userId,req.body)


            res.status(201).json({
                success : true,
                message : 'User updated successfully',
                profileData : updateProfile
            })



        }catch(err){
            next(err)
        }
}


export const getMyProfile = async( req :AuthenticatedRequest, res : Response , next : NextFunction) :Promise<void> =>{

    try{
        const userId = req.userId
        const profile = await getUserbyId(userId!)
        
        if(!userId) {
            res.status(404).json({
                success : false,
                message : "User not found"
            })
            return ;
        }
        res.status(200).json({
            success : true,
            message : "User  profile retrived successfully",
            data : profile
        })
    }catch(error){
        next(error)
    }

}