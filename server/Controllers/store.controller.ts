import {Request, Response} from "express";
import { CommentSection, CommentToSend, CreateStoreInterface, ReplyToSend } from "../Interface/store.interface";
import StoreModel, { StoreDocument } from "../Models/store.model";
import fs from "fs"
import mongoose from "mongoose";

export const CreateStore = async(req:Request, res:Response) => {
    try {
        //@ts-ignore
        // const files = req.files;
        // if(!files){
        //     return res.status(400).json("Something Went Wronge");
        // }
        // console.log("THIS IS REQ FILE",req.files)
        // console.log(req.body)
        //   //@ts-ignore
        // let imgArray = files.map((file) => {
        //     let img = fs.readFileSync(file.path)

        //     return img.toString('base64')
        // })

        // let tempImageArray:ImageData[] = [];
        // await Promise.all( imgArray.map((src:string, index:number) => {

        //     // create object to store data in the collection
        //     let finalImg:ImageData = {
        //         //@ts-ignore
        //         filename : files[index].originalname,
        //         //@ts-ignore
        //         contentType : files[index].mimetype,
        //         imageBase64 : src
        //     }
        //     tempImageArray.push(finalImg);
        // }))

        const data:CreateStoreInterface = req.body;
        
        // console.log(data)

        await new StoreModel({
            "storeName":data.storeName,
            "category":data.category,
            "location":data.location,
            "seatNumber":data.seatNumber,
            "timeOpen":data.timeOpen,
            "timeOpenDelivery":data.timeOpenDelivery,
            "rangePrice":data.rangePrice,
            "checkBox":data.checkBox,
            "otherDetail":data.otherDetail,
            "contact":data.contact,
            "menuList":data.menuList,
            "branch":data.branch,
        }).save();
        return res.status(200).json({"message":"Create Store Success"});
    } catch (error) {
        console.log(`Current Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const GetStore = async(req:Request, res:Response) => {
    try {
      
        const data = await StoreModel.find({})
        .select("storeName category")
        .populate({
            path:"category",
            select:"name"
        })
        .sort({"createdAt":-1})
        .lean();

        return res.status(200).json({"store":data});

    } catch (error) {
        console.log(`Get Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const GetSingleStoreForUploadImage = async(req:Request, res:Response) => {
    try {
        
        const {storeid} = req.headers;

        const singleStore = await StoreModel.findById({_id:storeid})
        .select("storeName imageData")
        .lean()

        return res.status(200).json({"store":singleStore});

    } catch (error) {
        console.log(`Get Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const UploadImageStore = async(req:Request, res:Response) => {
    try {
        
        //@ts-ignore
        const files = req.files;
        //@ts-ignore
        console.log("THIS IS REQ FILE",req.files)
        if(!files){
            return res.status(400).json("Something Went Wronge");
        }

        const {storeid} = req.headers;

        //@ts-ignore
        let imgArray = files.map((file) => {
            let img = fs.readFileSync(file.path)

            return img.toString('base64')
        })

        let tempImageArray:ImageData[] = [];
        await Promise.all( imgArray.map((src:string, index:number) => {

            // create object to store data in the collection
            let finalImg:ImageData = {
                //@ts-ignore
                filename : files[index].originalname,
                //@ts-ignore
                contentType : files[index].mimetype,
                imageBase64 : src
            }
            tempImageArray.push(finalImg)
        }))
        
        await StoreModel.updateOne(

            {_id:new mongoose.Types.ObjectId(`${storeid}`)},
            {$push:{"imageData":{$each:tempImageArray}}},
            
            )

        return res.status(200).json({"messaage":"success"})

    } catch (error) {
        console.log(`Upload Image Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const DeleteImageStore = async(req:Request, res:Response) => {
    try {
        const {storeId,arrImgId, arrImgFileName} = req.body;        

        await StoreModel.updateOne(
            {
                _id:new mongoose.Types.ObjectId(`${storeId}`),
                // $elemMatch:{"imageData":{$each:{"_id":arrImgId}}}
            },{
                $pull:{"imageData":{"_id":{"$in":arrImgId}}}
            }
        )
        
        // for (let i = 0; i < arrImgFileName.length; i++) {
            
        //     fs.unlinkSync(`../uploads/${arrImgFileName[i]}`)
        // }

        for (let i = 0; i < arrImgFileName.length; i++) {
            fs.readdirSync("C:\\Users\\User\\Desktop\\final\\server\\uploads").map((r) => {
                if(r.includes(arrImgFileName[i])){
                    fs.unlinkSync(`C:\\Users\\User\\Desktop\\final\\server\\uploads\\${r}`)
                }
            })

        }

        // fs.readdirSync('./routes').map((r)=>app.use(("/api"),require(`./routes/${r}`)))
        return res.status(200).json({"message":"Remove Image Success"})
    } catch (error) {
        console.log(`Delete Upload Image Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
    
}

export const DeleteStore = async(req:Request, res:Response) => {
    try {
        
        const {storeid} = req.headers;
        await StoreModel.findByIdAndDelete({
            _id:new mongoose.Types.ObjectId(`${storeid}`)
        })
        .exec();

        return res.status(200).json({"messaage":"Delete Store Success"});


    } catch (error) {
        console.log(`Delete Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const GetStoreDetailUpdate = async(req:Request, res:Response) => {
    try {
        
        const {storeid} = req.headers;
        const data = await StoreModel.findById({_id:new mongoose.Types.ObjectId(`${storeid}`)})
        .select("storeName location seatNumber timeOpen timeOpenDelivery rangePrice checkBox otherDetail contact menuList branch category")
        .lean()
        
        return res.status(200).json({"store":data})

    } catch (error) {
        console.log(`Get Store Detail Update Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
        
    }
}

export const GetAllStore = async(req:Request, res:Response) => {
    try {
        
        const data = await StoreModel.find({})
        .sort({"createdAt":-1})
        .limit(10)
        .select("storeName ratingSum ratingCount commentCount")
        .slice("imageData",1)
        .populate({
            path:"category",
            select:"name _id"
        })
        .lean()

        return res.status(200).json({"store":data})

    } catch (error) {
        console.log(`Get All Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const GetSingleStore = async(req:Request, res:Response) => {
    try {
        
        const { storeid } = req.headers;
        let userId:string|null = null;
        //@ts-ignore
        if(req.user){
            //@ts-ignore
            userId = req.user.userId as string;
        }
        userId = "63623495930fb6a0cd070cf3"
        const data:StoreDocument = await StoreModel.findById({_id:storeid})
        .select(
            "storeName location seatNumber timeOpen timeOpenDelivery rangePrice checkBox otherDetail contact menuList branch ratingSum ratingCount commentCount imageData commentSection createdAt"
        )
        .populate({
            path:"category",
            select:"name _id"
        })
        .populate({
            path:"commentSection.postedBy commentSection.commentReply.postedBy",
            select:"-_id userName userImage gender"
        })  
        .lean();
       

        let comments:any = null;

        if(userId){
            comments = await checkCommentAndCommentReply(data, userId);
        }

        else {
            comments = await checkCommentAndCommentReplyNoUserId(data)
        }

        // console.log(comments);

        return res.status(200).json({"store":data,"comments":comments});

    } catch (error) {
        console.log(`Get All Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}



const checkCommentAndCommentReply = async(data:StoreDocument, userId:string) => {
    
    let comments:CommentToSend[] = data.commentSection;
    let commentsToReturn:CommentToSend[] = [];
    
    let userLikeOrNot:boolean = false;
    let userDisLikeOrNot:boolean = false;

    for (let i = 0; i < comments.length; i++) {

        for (let j = 0; j < comments[i].likes!.length; j++) {
            if(String(comments[i].likes![j]) === userId){
                comments[i].userLikeOrNot = true;
                break;
            }
        }        
        
        for (let j = 0; j < comments[i].disLikes!.length; j++) {
            if(String(comments[i].disLikes![j]) === userId){
                comments[i].userDislikeOrNot = true;
                break;
            }
        }        

        comments[i].countLike = comments[i].likes!.length as number;
        comments[i].countDislike = comments[i].disLikes!.length as number;
        console.log(`THIS IS USER LIKE OR NOT => ${userLikeOrNot}`);
        console.log(`THIS IS USER DISLIKE OR NOT => ${userDisLikeOrNot}`);
        
        if(userLikeOrNot === true){
            comments[i].userLikeOrNot = userLikeOrNot; 
        }
        else if(userLikeOrNot === false){
            comments[i].userLikeOrNot = userLikeOrNot;
        }

        if(userDisLikeOrNot === true){
            comments[i].userDislikeOrNot = userDisLikeOrNot;
        }
        else if(userDisLikeOrNot === false){
            comments[i].userDislikeOrNot = userDisLikeOrNot;
        }

        delete comments[i].likes;
        delete comments[i].disLikes;
        let replyArr:ReplyToSend[] = comments[i].commentReply;

        for (let j = 0; j < comments[i].commentReply.length; j++) {
            let userLikeReplyOrNot:boolean = false;
            let userDisLikeReplyOrNot:boolean = false;
            
            for (let k = 0; k < comments[i].commentReply[j].likes!.length; k++) {
                if(String(comments[i].commentReply[j].likes![k]) === userId){
                    userLikeReplyOrNot = true;
                    break;
                }                
            }
            
            for (let k = 0; k < comments[i].commentReply[j].disLikes!.length; k++) {
                if(String(comments[i].commentReply[j].disLikes![k]) === userId){
                    userDisLikeReplyOrNot = true;
                    break;
                }                
            }

            comments[i].commentReply[j].countReplyLike = comments[i].commentReply[j].likes!.length as number;
            comments[i].commentReply[j].countReplyDislike = comments[i].commentReply[j].disLikes!.length as number;

            if(userLikeReplyOrNot){
                comments[i].commentReply[j].userLikeOrNot = userLikeReplyOrNot;
            }
            else if(!userLikeReplyOrNot){
                comments[i].commentReply[j].userLikeOrNot = userLikeReplyOrNot;
            }

            if(userDisLikeReplyOrNot){
                comments[i].commentReply[j].userDislikeOrNot = userDisLikeOrNot;
            }
            else if(!userDisLikeReplyOrNot){
                comments[i].commentReply[j].userDislikeOrNot = userDisLikeOrNot;
            }

            delete comments[i].commentReply[j].likes;
            delete comments[i].commentReply[j].disLikes;
            replyArr.push(comments[i].commentReply[j]);
        }
        comments[i].commentReply = replyArr

        commentsToReturn.push(comments[i])

    }
    return commentsToReturn;

}



const checkCommentAndCommentReplyNoUserId = async(data:StoreDocument) => {
    
    let comments:CommentToSend[] = data.commentSection;

    for (let i = 0; i < comments.length; i++) {
        
        comments[i].userLikeOrNot = false;
        comments[i].userDislikeOrNot = false;

      
        comments[i].countLike = comments[i].likes!.length as number;
        comments[i].countDislike = comments[i].disLikes!.length as number;

        delete comments[i].likes;
        delete comments[i].disLikes;
        let replyArr:ReplyToSend[] = comments[i].commentReply;
        
        for (let j = 0; j < comments[i].commentReply.length; j++) {

            replyArr[j].userDislikeOrNot = true;
            replyArr[j].userLikeOrNot = true;

            replyArr[j].countReplyLike = replyArr[j].likes!.length;
            replyArr[j].countReplyDislike = replyArr[j].disLikes!.length;

            delete replyArr[j].likes;
            delete replyArr[j].disLikes;
        }
        comments[i].commentReply = replyArr;
    }
    return comments;

}

