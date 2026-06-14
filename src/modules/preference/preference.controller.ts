import { Request, Response, NextFunction } from 'express';
import * as preferenceService from './preference.service';
import { AuthenticatedRequest } from '../auth/auth.middleware';


export const getMyPreference = async(req : AuthenticatedRequest, res : Response , next : NextFunction) =>{

  try{

    const userId = req.userId;
    const preference = await preferenceService.getPartnerPreferenceByUserId(userId!)

    if(!userId){
     return   res.status(404).json({
        success : false,
        message : "User not available"
      })
    }

    return res.status(200).json({
      success : true,
      message : "Preference retrived successfully",
      data : preference || {}
    })

  }catch(err){
    next(err)
  }

}

export const savePrefereneceProgress = async(req : AuthenticatedRequest, res :Response , next :NextFunction)=> {

  try{
    const userId = req.userId!;
    const updatePreference = await  preferenceService.updateUserPreference(userId,req.body)

    if(!userId){
     return   res.status(404).json({
        success : false,
        message : "User not available"
      })
    }

    return res.status(200).json({
      success : true,
      message : "Preference updated successfully",
      data : updatePreference
    })


  }catch(err) {
    next(err)
  }

}