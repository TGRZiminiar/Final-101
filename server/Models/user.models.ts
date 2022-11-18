import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document{
    userName:string;
    email:string;
    password:string;
    userImage:string;
    role: "user" | "onwer" | "admin";
    gender: "male" | "female" | "lgbtq+" | "unknow";
    bookMark:string[];
}

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        min:3,
        max:100,
        unique:true,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
        max:100,
    },
    password:{
        type:String,
        rqeuire:true,
        min:6,
    },
    userImage:{
        type:String,
        default:"https://www.w3schools.com/howto/img_avatar.png",
    },

    gender:{
        type:String,
        default:'unknow',
        enum:[
            "male",
            "female",
            "lgbtq+",
            "unknow"
        ]
    },

    role:{
        type:String,
        enum:[
            "user",
            "owner",
            "admin",
        ],
        default:'user',
    },

    bookMark:[{
        type:mongoose.Types.ObjectId,
        ref:"Store",
    }],


},{timestamps:true});

const UserModel = mongoose.model<UserDocument>("User",userSchema);

export default UserModel;