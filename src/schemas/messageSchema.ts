import { z } from "zod";



export const signUpSchema=z.object({
     content:z.string(),
     createdAt:z.date()
})