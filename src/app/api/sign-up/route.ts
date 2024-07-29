

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";
export async function POST(request:Request){
    await dbConnect();
   
    try {
        const {username,email,password}=await request.json();
        const existingUserVerifiedWithUsername=await UserModel.findOne({username,isVerified:true});
        let verifyCode=Math.floor(10000 + Math.random() * 90000).toString();
        if(existingUserVerifiedWithUsername){
            return Response.json({
                success:false,
                message:"Username already taken"
            },{status:400})
        }
        
        const existingUserByEmail=await UserModel.findOne({email});
        if(existingUserByEmail){
            return Response.json({
                success:false,
                message:"Email already taken"
            },{status:400});
        }else{
            const hashPassword=await bcrypt.hash(password, 12);
            const expiryDate=new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
          
         const newUser=  new  UserModel({
                username,
                email,
                password:hashPassword,
                verifyCode,
                verifyCodeExpairy:expiryDate,
                isVerified:false,
                isAcceptingMessage:true,
                message:[]
            });
            await newUser.save();
        }
        // Send Verification Email
        const emailResponse=await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        if(!emailResponse.success){
            return Response.json({
                success:false,
                message:"Faild to send Email",
            },{status:500})
        }else{
            return Response.json({
                success:true,
                message:"Send Email for verifcation user"
            },{status:200})
        }
       
    } catch (error) {
        
    }
}