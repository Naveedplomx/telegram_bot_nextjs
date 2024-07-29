import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number
}
const connection:ConnectionObject={}

export const dbConnect=async():Promise<void>=>{
    if(connection?.isConnected){
        console.log("Already database connected");
        return;
    }
    try {
        const db=await mongoose.connect(process.env.MONGODB_URL||"");
        connection.isConnected=db.connections[0].readyState;
        console.log("Database connected")
    } catch (error) {
        console.log("Database connection Error",error)
    }
}