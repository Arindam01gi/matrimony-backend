import { prisma } from '../../config/prisma';


export const getPartnerPreferenceByUserId = async (userId: string) => {
  return await prisma.partnerPreference.findUnique({
    where: { id: userId },
  });
};


export const updateUserPreference = async (userId :string, data:any) =>{
    
     return await prisma.partnerPreference.upsert({
       where : {id :userId},
       create : {
         id : userId,
         ...data
       },
       update : data
     })
}