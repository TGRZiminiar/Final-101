import mongoose from "mongoose";

export interface UserLogDocument extends mongoose.Document{
    userName:string;
    email:string;
    password:string;
    userImage:string;
}

const userLogSchema = new mongoose.Schema({

    date:{
        type:Date,
        default:new Date(),
    },
    
    countLogIn:{
        type:Number,
        default:0
    },

    Log:[{
        userId:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            require:true,
        },
    
        userAgent:{
            type:String,
            require:true
        }
    }]


},{timestamps:true})

const UserLogModel = mongoose.model<UserLogDocument>("User",userLogSchema);

export default UserLogModel;