import mongoose from "mongoose";
import { CheckBox, CommentSection, Contact, LocationInterface, MenuList, RatingSection, TimeOpen, TimeOpenDelivery } from "../Interface/store.interface";

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
    imageData:ImageData;
    commentSection:CommentSection[];
    ratingSection:RatingSection[];
    ratingSum:string;
    ratingCount:string;
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
        price:{type:Number}
    }],

    branch:[{
        type:String,
    }],

    imageData:[{    
        filename : {
            type : String,
            unique : true,
            required: true
        },
        contentType : {
            type: String,
            required : true
        },
        imageBase64 : {
            type : String,
            required: true
        },
    }],

    commentSection:[{
        textComment:{type:String},
        likes:[{type:mongoose.Types.ObjectId,ref:"User"}],
        disLikes:[{type:mongoose.Types.ObjectId,ref:"User"}],
        postedBy:{type:mongoose.Types.ObjectId,ref:"User"},
        postedAt:{type:Date,default:new Date()},
        replyCount:{type:Number,default:0},
    
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


},{timestamps:true});


const StoreModel = mongoose.model<StoreDocument>("Store",storeSchema);

export default StoreModel;