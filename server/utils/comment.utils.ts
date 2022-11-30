const mongoose = require('mongoose')
import { CommentSection, RatingSection } from "../Interface/store.interface"
import StoreModel from "../Models/store.model"

export const createCommentAndRatingNoExist = async( storeId:string, content:string, rating:number, hasRating:boolean, userId:string) => {

    //comment only
    if(content.length > 2 && !hasRating) {
        
        console.log('comment only running')
        
        await StoreModel.updateOne({
            _id:new mongoose.Types.ObjectId(`${storeId}`)
        },{
            $push:{commentSection:{textComment:content,postedBy:userId}},
            $inc:{"commentCount":1}
        })
        
        return 
        // return res.status(200).json('Create Comment Success')
    
    }
    
    //rating only
    if(content.length < 1 && hasRating){
    
        console.log('rating only running')
    
        await StoreModel.updateOne({
            _id:new mongoose.Types.ObjectId(`${storeId}`)
        },{
            $push:{ratingSection:{rating:rating,ratingBy:userId}},
            $inc:{
                "ratingCount":+1,
                "ratingSum":+rating,
        }
        })
        return 
        // return res.status(200).json('Create Rating Success')
        
    }

    //comment and rating
    if(content.length > 2 && hasRating)  {
    
        console.log('two condition running')
    
        await StoreModel.updateOne({
            _id:new mongoose.Types.ObjectId(`${storeId}`)
        },{
            $push:{commentSection:{textComment:content,postedBy:userId,rating:rating},ratingSection:{rating:rating,ratingBy:userId}},
            $inc:{
                "ratingCount":+1,
                "commentCount":1, 
                "ratingSum":+rating,
            }
        })
        return 
        // return res.status(200).json('Create Comment And Rating Success')
    
    }
} 

export const updateCommentButCreateRating = async( storeId:string, content:string, rating:number, hasRating:boolean, userId:string, existCommentOrNot:CommentSection) => {
    
    if(!hasRating){
    
        await StoreModel.updateOne({commentSection:{$elemMatch:existCommentOrNot}}
            ,{$set:{'commentSection.$':{textComment:content}}}
            ,{multi:true}).exec()
            
        // return res.status(200).json('Update Comment Success')
    
    } 
    
    if(hasRating){
    
        console.log(existCommentOrNot)
        
        const updateComment = await StoreModel.updateOne({commentSection:{$elemMatch:existCommentOrNot}}
            ,{
                $set:{'commentSection.$.textComment':content,"commentSection.$.rating":rating},
                $push:{ratingSection:{rating:rating,ratingBy:userId}},
                $inc:{
                    "ratingCount":+1, 
                    "ratingSum":+rating,
                }
            }
            ,{multi:true}).exec()
        

        
        // return res.status(200).json('Create Rating And Update Comment Success')
    
    } 
}


export const updateRatingButCreateComment = async( storeId:string, content:string, rating:number, hasRating:boolean, userId:string, existRatingOrnot:RatingSection) => {
        
    const createCommentToBook = await StoreModel.updateOne({
        _id:new mongoose.Types.ObjectId(`${storeId}`)
    },{
        $push:{commentSection:{textComment:content,postedBy:userId,rating:rating}},
        $inc:{"commentCount":1}
    })
    
        if(hasRating) {

            //ต้อง queries หา rating sum ตรงนี้
            
            const updateRating = await StoreModel.updateOne({
            ratingSection:{$elemMatch:existRatingOrnot}
            },{
                $set:{'ratingSection.$':{
                rating:rating,
                ratingBy:userId,
                _id:existRatingOrnot._id
            }}},{
                multi:true
            })
            .exec()

            const getSum = await StoreModel.aggregate([
                {$match:{_id:new mongoose.Types.ObjectId(`${storeId}`)}}, 
                {$project:{_id:0,
                    RatingSum:{$sum:'$ratingSection.ratingSum'},
                }}
           ])
            

            const updateSum = await StoreModel.updateOne({
                _id:new mongoose.Types.ObjectId(`${storeId}`)
            },{
                $set:{
                    'ratingSum':getSum[0].RatingSum,
                }
            })

        }
        return
        // return res.status(200).json('Create Comment And Update Rating If User Make New Rating')
        
}

export const updateRatingAndComment = async( storeId:string, content:string, rating:number, hasRating:boolean, userId:string, existRatingOrnot:RatingSection, existCommentOrnot:CommentSection) => {

    const updateComment = await StoreModel.updateOne({
        commentSection:{$elemMatch:existCommentOrnot}
    },{
        $set:{'commentSection.$.textComment':content,"commentSection.$.rating":rating},
    },{
        multi:true
    })
    .exec()
    
    if(hasRating) {
    
        const updateRatingIfExist = await StoreModel.updateOne({
            ratingSection:{$elemMatch:existRatingOrnot}
        },{
            $set:{'ratingSection.$':{
                rating:rating,
                ratingBy:userId,
                _id:existRatingOrnot._id
            }}},{
                multi:true
        })
        console.log(updateRatingIfExist)
            const getSum = await StoreModel.aggregate([
                {$match:{_id:new mongoose.Types.ObjectId(`${storeId}`)}},
                {$project:{_id:0,
                    RatingSum:{$sum:'$ratingSection.rating'},
                }}
            ])
            
            const updateSum = await StoreModel.updateOne({_id:new mongoose.Types.ObjectId(`${storeId}`)},{
                $set:{
                    'ratingSum':getSum[0].RatingSum,
                }
            })

    }

    // return res.status(200).json('UPDATE COMMENT AND RATING SUCCESS')

}

