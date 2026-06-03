 import { z } from 'zod';

 export const resgisterSchema = z.object({
  body : z.object({
     email : z.string().email('Invalid email address format'),
     password: z.string().min(6, `Password must be minimum 6 letters`),
     phone: z.string().min(10, 'Phone no must be 10 digits')
  })
 })

export const emailLoginSchema = z.object({
  body:z.object({
     email : z.string().email('Invalid email address format'),
     password: z.string().min(6, `Password must be minimum 6 letters`),
  })
})


export const phoneLoginSchema = z.object({
  body:z.object({
     phone: z.string().min(10, 'Phone no must be 10 digits'),
     password: z.string().min(6, `Password must be minimum 6 letters`),
  })
})
