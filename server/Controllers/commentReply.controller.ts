
import {Request, Response} from "express"
import mongoose from "mongoose";
import StoreModel from "../Models/store.model";

export const CreateReplyComment = async(req:Request, res:Response) => {
    try {
        
        const { commentId, textReply, storeId } = req.body;
        //@ts-ignore
        const { userId } = req.user;
        
        // const checkReply = await StoreModel.aggregate([
        //     {$match:{_id:new mongoose.Types.ObjectId(`${storeId}`)}},
        //     {$unwind:"$commentSection"},
        //     {$match:{"commentSection._id":new mongoose.Types.ObjectId(`${commentId}`)}},
        //     {$project:{
        //         _id:1,
        //         replySection:"$commentSection.commentReply",
        //         commentId:"$commentSection._id",
        //     }}
        // ])
        
        // const replyExistOrNot = await checkReply[0].replySection.find((elem)=>(String(elem.postedBy)===String(userId)))

        // if(!replyExistOrNot){
            const createReply = await StoreModel.findOneAndUpdate({
                _id:new mongoose.Types.ObjectId(`${storeId}`),
                commentSection:{$elemMatch:{_id:new mongoose.Types.ObjectId(`${commentId}`)}}
            },{
                $push:{"commentSection.$.commentReply":{textCommentReply:textReply,postedBy:userId}},
                $inc:{"commentSection.$.replyCount":+1},
            })
            return res.status(200).json(createReply)
        // }



    } catch (error) {
        console.log(`Create Reply Comment Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const LikeReplyComment = async(req:Request, res:Response) => {
    try {

        //@ts-ignore
        const {userId} = req.user;

        const {commentId, replyId, storeId} = req.body;
        
        const checkComment = await StoreModel.aggregate([
            {$match:{_id:new mongoose.Types.ObjectId(`${storeId}`)}},
            {$unwind:"$commentSection"},
            {$match:{"commentSection._id":new mongoose.Types.ObjectId(`${commentId}`)}},
            {$unwind:"$commentSection.commentReply"},
            {$match:{"commentSection.commentReply._id":new mongoose.Types.ObjectId(`${replyId}`)}},
            {$project:{
                _id:1,
                commentId:"$commentSection._id",
                replySection:"$commentSection.commentReply"
            }} 
        ]);

        const userDisLikeReplyExistOrNot = await checkComment[0].replySection.likes!.some((elem:string) => String(elem) === String(userId));

        if(!userDisLikeReplyExistOrNot){

            await StoreModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${storeId}`),
                "commentSection.commentReply":{$elemMatch:{_id:new mongoose.Types.ObjectId(`${replyId}`)}}
            },{
                $push:{"commentSection.$[outer].commentReply.$[inner].likes":userId}
            },{
                "arrayFilters": [{ "outer._id": new mongoose.Types.ObjectId(`${commentId}`) },{ "inner._id": new mongoose.Types.ObjectId(`${replyId}`) }] 
            })
            return res.status(200).json({"message":"Like Reply Success"})
        }

        else {
            await StoreModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${storeId}`),
                "commentSection.commentReply":{$elemMatch:{_id:new mongoose.Types.ObjectId(`${replyId}`)}}
            },{
                $pull:{"commentSection.$[outer].commentReply.$[inner].likes":userId}
            },{
                "arrayFilters": [{ "outer._id": new mongoose.Types.ObjectId(`${commentId}`) },{ "inner._id": new mongoose.Types.ObjectId(`${replyId}`) }] 
            })
            return res.status(200).json({"message":"UnLike Reply Success"})
        }


    } catch (error) {
        console.log(`Like Reply Comment Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}

export const DisLikeReplyComment = async(req:Request, res:Response) => {
    try {

        //@ts-ignore
        const {userId} = req.user;

        const {commentId, replyId, storeId} = req.body;
        
        const checkComment = await StoreModel.aggregate([
            {$match:{_id:new mongoose.Types.ObjectId(`${storeId}`)}},
            {$unwind:"$commentSection"},
            {$match:{"commentSection._id":new mongoose.Types.ObjectId(`${commentId}`)}},
            {$unwind:"$commentSection.commentReply"},
            {$match:{"commentSection.commentReply._id":new mongoose.Types.ObjectId(`${replyId}`)}},
            {$project:{
                _id:1,
                commentId:"$commentSection._id",
                replySection:"$commentSection.commentReply"
            }} 
        ]);

        const userDisLikeReplyExistOrNot = await checkComment[0].replySection.disLikes!.some((elem:string) => String(elem) === String(userId));

        if(!userDisLikeReplyExistOrNot){

            await StoreModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${storeId}`),
                "commentSection.commentReply":{$elemMatch:{_id:new mongoose.Types.ObjectId(`${replyId}`)}}
            },{
                $push:{"commentSection.$[outer].commentReply.$[inner].disLikes":userId}
            },{
                "arrayFilters": [{ "outer._id": new mongoose.Types.ObjectId(`${commentId}`) },{ "inner._id": new mongoose.Types.ObjectId(`${replyId}`) }] 
            })
            return res.status(200).json({"message":"DisLike Reply Success"})
        }

        else {
            await StoreModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${storeId}`),
                "commentSection.commentReply":{$elemMatch:{_id:new mongoose.Types.ObjectId(`${replyId}`)}}
            },{
                $pull:{"commentSection.$[outer].commentReply.$[inner].disLikes":userId}
            },{
                "arrayFilters": [{ "outer._id": new mongoose.Types.ObjectId(`${commentId}`) },{ "inner._id": new mongoose.Types.ObjectId(`${replyId}`) }] 
            })
            return res.status(200).json({"message":"UnDisLike Reply Success"})
        }


    } catch (error) {
        console.log(`DisLike Reply Comment Error => ${error}`);
        return res.status(400).send("Something Went Wronge Try Again Later");
    }
}