import { prisma } from '../../config/prisma';
import { Prisma } from '@prisma/client';
import bycrypt from 'bcryptjs';



export const createUser = async(payload : {
    email :string,
    phone : string,
    firstName : string,
    lastName : string,
    passwordRaw : string
})=>{

    const saltRounds = 12;
    const passwordHash = await bycrypt.hash(payload.passwordRaw,saltRounds)
    
    return await prisma.user.create ({
        data :{
            email : payload.email || null,
            phone : payload.phone || null,
            firstName : payload.firstName,
            lastName : payload.lastName,
            passwordWithHash : passwordHash
        },
        select :{
            id: true,
            email: true,
            phone: true,
            isVerified: true,
            createdAt: true,
        }
    })

    
}


// export const findUniqueUser = async (where: Prisma.UserWhereUniqueInput) => {
//   return await prisma.user.findUnique({
//     where,
//     include: {
//       profile: {
//         select: {
//           id: true,
//           fullName: true,
//         },
//       },
//     },
//   });
// };


export const findUserByEmail = async(email : string ) =>{
     return await prisma.user.findUnique({
            where :{
                email : email
            }
      })
}


export const findUserByPhone  = async(phone :string) =>{
    return await prisma.user.findUnique({
        where :{
            phone : phone 
        }
    })
}