import mongoose,{ Schema,Document, ObjectId } from "mongoose";

export interface ITags{
    name:string,
    slug:string,
}
export interface IComments{
    content:string,
    user:ObjectId,
}
export interface IBlog extends Document{
    title:string,
    body:string,
    author:ObjectId,
    tags:ITags[]
    comments:IComments[]
}
const tagSchema:Schema<ITags>=new Schema({
    name:{
        type:String,
        slug:String
    }
},{timestamps:true});
const commentSchema:Schema<IComments>=new Schema({
    content:{
        type:String,
    },
    user:{
        user:mongoose.Types.ObjectId,
        ref:"User"
    }
})
const blogSchema:Schema<IBlog>=new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    tags:{
        type:[tagSchema]
    },
    comments:{
        type:[commentSchema]
    }
},{timestamps:true})