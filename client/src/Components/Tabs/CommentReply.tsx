import { Avatar } from '@mui/material';
import React, { useState } from 'react'
import {CommentReplyInterface} from "../../Interface/store.interface"
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import moment from "moment"
import { PatchDisLikeReplyComment, PatchLikeReplyComment } from '../../Function/commentReply.func';
import { toast } from "react-toastify"

interface CommentReplyProps {
    reply:CommentReplyInterface;
    storeId:string;
    parentCommentId:string;
}

interface StateCommentReply {
    userLike:boolean;
    userDisLike:boolean;
    countLike:number;
    countDisLike:number;
}

export const CommentReply: React.FC<CommentReplyProps> = ({reply,storeId,parentCommentId}) => {


    const [subCommentReply,setSubCommentReply] = useState<StateCommentReply>({
        userLike:reply.userLikeOrNot,
        userDisLike:reply.userDislikeOrNot,
        countLike:reply.countReplyLikes,
        countDisLike:reply.countReplyDisLikes,
    })


    
    const handleLikeComment = async(replyId:string) => {
        if(subCommentReply.userDisLike){
            return toast.error("You Need To UnDislike Reply First To Like This Reply Comment");
        }
        else if(subCommentReply.userLike && !subCommentReply.userDisLike){
            const result = await PatchLikeReplyComment(parentCommentId, replyId, storeId);
            if(!result) return;
            setSubCommentReply(prev => ({...prev,countLike:prev.countLike-1, userLike:!prev.userLike}));
        }
        else if(!subCommentReply.userLike && !subCommentReply.userDisLike){
            const result = await PatchLikeReplyComment(parentCommentId, replyId, storeId);
            if(!result) return;
            setSubCommentReply(prev => ({...prev,countLike:prev.countLike+1, userLike:!prev.userLike}));
        }
    }
   
    const handleDisLikeComment = async(replyId:string) => {
        if(subCommentReply.userLike){
            return toast.error("You Need To Unlike First To Like This Comment");
        }
        else if(subCommentReply.userDisLike && !subCommentReply.userLike){
            const result = await PatchDisLikeReplyComment(parentCommentId, replyId, storeId);
            if(!result) return;
            setSubCommentReply(prev => ({...prev,countDisLike:prev.countDisLike-1, userDisLike:!prev.userDisLike}));
        }
        else if(!subCommentReply.userLike && !subCommentReply.userDisLike){
            const result = await PatchDisLikeReplyComment(parentCommentId, replyId, storeId);
            if(!result) return;
            setSubCommentReply(prev => ({...prev,countDisLike:prev.countDisLike+1, userDisLike:!prev.userDisLike}));
        }
    }
 
    console.log(reply)

    return (
    <>
     <div className='flex gap-2 my-2 '>
            <div className="max-w-[3rem] max-h-[3rem] flex justify-center mt-4">
            <Avatar 
            className="w-full h-full self-center"
            src={reply.postedBy.userImage   }
            />
            </div>
        
        <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">{reply.postedBy.userName}</p>
            <p className="flex flex-wrap flex-1">{reply.textCommentReply}</p>
            <p className="flex flex-wrap flex-1 text-sm  text-gray-400">{String(moment(reply.postedAt).format("llll"))}</p>
            <div className="flex gap-4">
            
                <div className="flex gap-1" onClick={() => handleLikeComment(reply._id)}>
                    {subCommentReply.userLike ? 
                    <ThumbUpAltIcon fontSize="small" className="cursor-pointer self-center text-blue-400"/> 
                    : 
                    <ThumbUpOffAltOutlinedIcon fontSize="small" className="cursor-pointer self-center text-blue-400"/>}
                    <p className="self-center">{subCommentReply.countLike} </p>
                </div>

                <div className="flex gap-1" onClick={() => handleDisLikeComment(reply._id)}>
                    {subCommentReply.userDisLike ?
                    <ThumbDownAltIcon fontSize="small" className="cursor-pointer self-center text-blue-400"/>
                    :
                    <ThumbDownOffAltOutlinedIcon fontSize="small" className="cursor-pointer self-center text-blue-400"/>
                    }
                    <p className="self-center">{subCommentReply.countDisLike} </p>
                </div>
            </div>
        </div>
        </div>
    </>
    )
}