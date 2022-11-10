import { Request,Response } from "express";
import mongoose from "mongoose";
import { CommentSection, RatingSection } from "../Interface/store.interface";
import StoreModel, { StoreDocument } from "../Models/store.model";
import {createCommentAndRatingNoExist, updateCommentButCreateRating, updateRatingButCreateComment, updateRatingAndComment} from "../utils/comment.utils"

export const AddCommentToStore = async(req:Request, res:Response) => {
    try {
        //@ts-ignore
        const { userId } = req.user;
        const {content, rating, hasRating, storeId} = req.body;

        const findStore:StoreDocument = await StoreModel.findById({_id:storeId})
        .select('commentSection ratingSection commentCount')
        .lean()

        const existCommentOrNot : CommentSection | undefined = await findStore?.commentSection.find((elem) =>elem.postedBy === userId);
        const existRatingOrNot : RatingSection | undefined = await findStore?.ratingSection.find((elem) =>elem.ratingBy === userId);

         //ไม่เคยคอมเมนต์กับ rating เลย
        if(existCommentOrNot === undefined && existRatingOrNot === undefined) {
        
            createCommentAndRatingNoExist(storeId,content,rating,hasRating,userId)
            return res.status(200).json({"message":"Create Comment Or Rating Success"});
        }   
        
        //เคยคอมเมนต์แตไม่เคยให้ rating
        
        else if(existCommentOrNot !== undefined && existRatingOrNot === undefined) {
            
            updateCommentButCreateRating(storeId,content,rating,hasRating,userId,existCommentOrNot)
            return res.status(200).json({"message":"Update Comment And Create Rating"});
            
        }
        
        //ไม่เคยคอมเมนต์แต่เคย rating
        
        else if(existCommentOrNot === undefined && existRatingOrNot !== undefined) {
            
            updateRatingButCreateComment(storeId,content,rating,hasRating,userId,existRatingOrNot)
            return res.status(200).json({"message":"Update Rating And Create Comment"});
            
        }
        
        //เคยทั้งสองอย่าง
        
        else if(existCommentOrNot !== undefined && existRatingOrNot !== undefined) {
            
            updateRatingAndComment(storeId,content,rating,hasRating,userId,existRatingOrNot,existCommentOrNot)
            return res.status(200).json({"message":"Update Rating And Update Comment"});
         
        }

    } catch (error) {
        console.log(`Current Store Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}


export const LikeComment = async(req:Request, res:Response) => {
    try {
        
        //@ts-ignore
        const { userId } = req.user
        const {commentId, storeId} = req.body

        const findComment:StoreDocument = await StoreModel.findById({
            _id:new mongoose.Types.ObjectId(`${storeId}`),
            "commentSection.$":{$elemMatch:{_id:new mongoose.Types.ObjectId(`${commentId}`)}}
        })
        .select('commentSection')
        .lean()
        const userLikeExistOrNot:boolean = await findComment!.commentSection[0].likes!.some(element=>String(element)===String(userId))
        if(!userLikeExistOrNot){
            await StoreModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${storeId}`),
                "commentSection":{$elemMatch:{_id:new mongoose.Types.ObjectId(`${commentId}`)}}
            },{
                $addToSet:{"commentSection.$.likes":userId}
            },{multi:true,new:true})
            return res.status(200).json({"message":"Like Comment Success"});
        }
        if(userLikeExistOrNot){
            await StoreModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${storeId}`),
                "commentSection":{$elemMatch:{_id:new mongoose.Types.ObjectId(`${commentId}`)}}
            },{
                $pull:{"commentSection.$.likes":userId}
            },{multi:true,new:true})
            return res.status(200).json({"message":"Like Comment Success"});
        }

    } catch (error) {
        console.log(`Like Comment Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const DisLikeComment = async(req:Request, res:Response) => {
    try {

        //@ts-ignore
        const { userId } = req.user
        const {commentId, storeId} = req.body

        const findComment = await StoreModel.findById({
            _id:new mongoose.Types.ObjectId(`${storeId}`),
            "commentSection.$":{$elemMatch:{_id:new mongoose.Types.ObjectId(`${commentId}`)}}
        })
        .select('commentSection')
        .lean()

        const userDisLikeExistOrNot:boolean = await findComment!.commentSection[0].disLikes!.some(element=>String(element)===String(userId))
        
        if(!userDisLikeExistOrNot){
            await StoreModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${storeId}`),
                "commentSection":{$elemMatch:{_id:new mongoose.Types.ObjectId(`${commentId}`)}}
            },{
                $addToSet:{"commentSection.$.disLikes":userId}
            })
            return res.status(200).json({"message":"Like Comment Success"});
        }
        if(userDisLikeExistOrNot){
            await StoreModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${storeId}`),
                "commentSection":{$elemMatch:{_id:new mongoose.Types.ObjectId(`${commentId}`)}}
            },{
                $pull:{"commentSection.$.disLikes":userId}
            })
            return res.status(200).json({"message":"Like Comment Success"});
        }

    } catch (error) {
        console.log(`Like Comment Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}