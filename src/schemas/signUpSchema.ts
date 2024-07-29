import { z } from "zod";


export const userNameValidation=z
      .string()
      .min(2,"Username must be atleast 2 charactor")
      .max(20,"Username must be no more then 20 charactor")
      .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special charactor")

export const signUpSchema=z.object({
     usrname:userNameValidation,
     email:z.string().email({message:'Invalid email Address'}),
     password:z.string().min(6,{message:"Password must be atleast 6 charactor"}).max(15,{message:"Pass must be no more then 15 charactor"})
})