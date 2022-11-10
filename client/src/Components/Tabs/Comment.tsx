import React, { useState } from 'react'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { Avatar,Button,Divider } from '@mui/material';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { CommentSection } from '../../Interface/store.interface';
import { TabsDetailState } from './TabsDetailStore';
import { DialogReply } from '../Dialog/DialogReply';
import { toast } from 'react-toastify';
import { PatchDisLikeComment, PatchLikeComment } from '../../Function/comment.func';
import moment from "moment"
interface CommentProps {
    comment:CommentSection;
    mainState:TabsDetailState;
    storeId:string
}

export interface CommentStateProps {
    openReply:boolean;
    userLike:boolean;
    userDisLike:boolean;
    countLike:number;
    countDisLike:number;
    openDialogReply:boolean;
    textReply:string;
}

export const Comment: React.FC<CommentProps> = ({comment, mainState,storeId}) => {

    const [subComment,setSubComment] = useState<CommentStateProps>({
        openReply:false,
        userLike:comment.userLikeOrNot,
        userDisLike:comment.userDislikeOrNot,
        countLike:comment.countLike,
        countDisLike:comment.countDislike,
        openDialogReply:true,
        textReply:"",

    })

    
    const openDialogReply = () => {
        setSubComment((prev) => ({...prev,openDialogReply:true}))
    }
      
    const closeDialogReply = () => {
        setSubComment((prev) => ({...prev,openDialogReply:false}))
    }


    const handleTextReplyChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSubComment(prev => ({...prev, textReply:e.target.value}));
    }
    

    const handleSubmitReply = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



    }

    const handleLikeComment = async(parentCommentId:string) => {
        if(subComment.userDisLike){
            return toast.error("You Need To UnDislike First To Like This Comment");
        }
        else if(subComment.userLike && !subComment.userDisLike){
            await PatchLikeComment(parentCommentId,storeId);
            setSubComment(prev => ({...prev,countLike:prev.countLike-1, userLike:!prev.userLike}));
        }
        else if(!subComment.userLike && !subComment.userDisLike){
            await PatchLikeComment(parentCommentId,storeId);
            setSubComment(prev => ({...prev,countLike:prev.countLike+1, userLike:!prev.userLike}));
        }
    }
   
    const handleDisLikeComment = async(parentCommentId:string) => {
        if(subComment.userLike){
            return toast.error("You Need To Unlike First To Like This Comment");
        }
        else if(subComment.userDisLike && !subComment.userLike){
            setSubComment(prev => ({...prev,countDisLike:prev.countDisLike-1, userDisLike:!prev.userDisLike}));
            await PatchDisLikeComment(parentCommentId,storeId);
        }
        else if(!subComment.userLike && !subComment.userDisLike){
            setSubComment(prev => ({...prev,countDisLike:prev.countDisLike+1, userDisLike:!prev.userDisLike}));
            await PatchDisLikeComment(parentCommentId,storeId);
        }
    }

    console.log(subComment)

    
    return (
    <>
        <div className="flex gap-2 mt-8 ">
            <div className="max-w-[3rem] max-h-[3rem] flex justify-center mt-4">
                <Avatar className="w-full h-full self-center"/>
            </div>
            <div className="flex flex-col gap-1">
               <p className="text-xl font-semibold">{comment.postedBy.userName}</p>
               <p className="flex flex-wrap flex-1">{comment.textComment}</p>
               <p className="flex flex-wrap flex-1 text-sm text-gray-400">{String(moment(comment.postedAt).format("llll"))}</p>
                <div className="flex gap-4">
                
                    <div className="flex gap-1" onClick={() => handleLikeComment(comment._id)}>
                        {subComment.userLike ? 
                        <ThumbUpAltIcon fontSize="small" className="cursor-pointer self-center"/> 
                        : 
                        <ThumbUpOffAltOutlinedIcon fontSize="small" className="cursor-pointer self-center"/>}
                        <p className="self-center">{subComment.countLike} </p>
                    </div>

                    <div className="flex gap-1" onClick={() => handleDisLikeComment(comment._id)}>
                        {subComment.userDisLike ?
                        <ThumbDownAltIcon fontSize="small" className="cursor-pointer self-center"/>
                        :
                        <ThumbDownOffAltOutlinedIcon fontSize="small" className="cursor-pointer self-center"/>
                        }
                        <p className="self-center">{subComment.countDisLike} </p>
                    </div>

                <Button variant="text" onClick={openDialogReply}>
                    Reply
                </Button>
               
                {subComment.openReply ? 
                <Button variant="text" onClick={() => setSubComment(prev => ({...prev,openReply:!prev.openReply}))}>
                    Close
                    <ArrowDropUpOutlinedIcon/>
                </Button>
                :
                comment.replyCount !== 0 && 
                <Button variant="text" onClick={() => setSubComment(prev => ({...prev,openReply:!prev.openReply}))}>
                    {comment.replyCount} Replies
                    <ArrowDropDownOutlinedIcon/>
                </Button>

                }
                </div>
            </div>
            </div>        

            <DialogReply
            subComment={subComment}
            closeDialogReply={closeDialogReply}
            handleTextReplyChange={handleTextReplyChange}
            handleSubmitReply={handleSubmitReply}
            comment={comment}
            />

        <Divider />
    </>
    )
}