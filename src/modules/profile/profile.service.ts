import { prisma } from '../../config/prisma';

export const updateProfileProgress = async ( userId : string , data : any) =>{


    return await prisma.userProfile.upsert({
        where: { id: userId },
        // If it doesn't exist, create it with whatever data we have so far
        create :{
            id : userId ,
            ...data
        },
        // else update the exsting data
        update: data,
    })

}


export const getUserbyId  = async (userId : string) =>{


    return prisma.userProfile.findUnique({
        where: { id: userId },
        include :{
            user :{
                select : {
                    email : true ,
                    phone :true
                }

            }
        }

    })
}