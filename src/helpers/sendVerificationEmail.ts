import resend from "@/lib/resendEmail";
import {VerificationEmail} from '../../email/email-template'
import { ApiResponse } from "@/types/ApiResponse";
export async function sendVerificationEmail(email:string,username:string,verifyCode:string):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'hello world',
            react: VerificationEmail({username,otp:verifyCode}),
          });
        return {success:true,message:"Emaill Send Sucessfuly"}
    } catch (error) {
        return {success:false,message:"Faild to send verification email"}
    }
   
  }