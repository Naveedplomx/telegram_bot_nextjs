import { IMessage } from "@/model/User"
export interface ApiResponse{
    success:boolean,
    message:string,
    isAcceptedMessage?:boolean,
    messages?:Array<IMessage>
}