import { z } from "zod";

export const signUpSchema=z.object({
     accepted:z.boolean(),
});