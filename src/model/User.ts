import mongoose, {Schema,Document } from "mongoose";


export interface IMessage extends Document{
        content:string
        createdAt:Date
}

export interface IUser extends Document{
        username:string,
        email:string,
        password:string,
        verifyCode:string,
        verifyCodeExpairy:Date,
        isVerified:boolean,
        isAcceptingMessage:boolean,
        message:IMessage[]
}

const messageSchema:Schema<IMessage>=new Schema({
        content:{
            type:String,
        },
        createdAt:{
            type:Date,
        }
});
const userSchema:Schema<IUser>=new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        match:[/.+\@.+\..+/,"Please use a valid email address"],
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    verifyCode:{
        type:String,
        required:[true,'VerifyCode is required']
    },
    verifyCodeExpairy:{
        type:Date,
        required:[true,"verify Code Expiry is required"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    message:{
        type:[messageSchema]
    }
},{timestamps:true});


const UserModel=mongoose.models.User as mongoose.Model<IUser> || mongoose.model<IUser>("User",userSchema)
export default UserModel;