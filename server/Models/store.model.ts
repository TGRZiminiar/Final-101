import mongoose from "mongoose";
import { CheckBox, CommentSection, Contact, ImageData, ImageHeader, LocationInterface, MenuList, RatingSection, TimeOpen, TimeOpenDelivery } from "../Interface/store.interface";

export interface StoreDocument extends mongoose.Document{
    storeName:string;
    category:string[];
    location:LocationInterface;
    seatNumber:string;
    timeOpen:TimeOpen[];
    timeOpenDelivery:TimeOpenDelivery[];
    rangePrice:string;
    checkBox:CheckBox[];
    otherDetail:string;
    contact:Contact[];
    menuList:MenuList[];
    branch:string[];
    imageData:ImageData[];
    imageHeader:ImageHeader;
    userBookMark:string[];
    commentSection:CommentSection[];
    ratingSection:RatingSection[];
    ratingSum:number;
    ratingCount:number;
    commentCount:number;
    createdAt:Date;
    updatedAt:Date;
}

const storeSchema = new mongoose.Schema({
    
    storeName:{
        type:String
    },

    category:[{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    }],

    location:{
        textLocation:{type:String},
        link:{type:String},
    },

    seatNumber:{
        type:Number,
    },

    timeOpen:[{
        date:{type:String},
        time:{type:String}
    }],

    timeOpenDelivery:[{
        date:{type:String},
        time:{type:String}
    }],

    rangePrice:{
        type:String
    },

    checkBox:[{
        text:{type:String},
        check:{
            type:Boolean,
            default:false,
        }
    }],

    otherDetail:{
        type:String,
    },

    contact:[{
        platform:{
            type:String,
            enum:[
                "Facebook",
                "Line",
                "Instagram",
                "Phone",
            ]
        },
        link:{type:String},
    }],

    

    menuList:[{
        text:{type:String},
        price:{type:Number},
        urlImage : {
            type : String,
            default: "",
        },
        contentType : {
            type: String,
            
        },
    }],

    branch:[{
        type:String,
    }],

    imageData:[{    
        urlImage : {
            type : String,
        },
        contentType : {
            type: String,
        },
    }],

    imageHeader:{
        urlImage:{
            type:String,
            default:"",
        },
    },

    userBookMark:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],

    commentSection:[{
        textComment:{type:String},
        likes:[{type:mongoose.Types.ObjectId,ref:"User"}],
        disLikes:[{type:mongoose.Types.ObjectId,ref:"User"}],
        postedBy:{type:mongoose.Types.ObjectId,ref:"User"},
        postedAt:{type:Date,default:new Date()},
        replyCount:{type:Number,default:0},
        rating:{
            type:Number,
            default:0,
        },
        commentReply:[{
            textCommentReply:{type:String},
            postedBy:{type:mongoose.Types.ObjectId,ref:"User"},
            postedAt:{type:Date,default:new Date()},
            likes:[{type:mongoose.Types.ObjectId,ref:"User"}],
            disLikes:[{type:mongoose.Types.ObjectId,ref:"User"}],
        }],
     
    }],
    
    ratingSection:[{
        rating:{type:Number},
        ratingBy:{type:mongoose.Types.ObjectId,ref:"User"},
        ratingAt:{type:Date,default:new Date()}
    }],
    
    ratingSum:{type:Number,default:0},

    ratingCount:{type:Number,default:0},
    commentCount:{type:Number,default:0},


},{timestamps:true});


const StoreModel = mongoose.model<StoreDocument>("Store",storeSchema);

export default StoreModel;