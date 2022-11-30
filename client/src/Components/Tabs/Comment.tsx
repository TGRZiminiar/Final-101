import React, { useState } from 'react'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { Avatar,Button,Divider, Rating } from '@mui/material';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { CommentSection } from '../../Interface/store.interface';
import { TabsDetailState } from './TabsDetailStore';
import { DialogReply } from '../Dialog/DialogReply';
import { toast } from 'react-toastify';
import { CreateReplyComment, GetComments, PatchDisLikeComment, PatchLikeComment } from '../../Function/comment.func';
import moment from "moment"
import { AxiosError, AxiosResponse } from 'axios';
import { CommentReply } from './CommentReply';
import { SingleStateProps } from '../../Pages/User/SingleStore';
interface CommentProps {
    comment:CommentSection;
    storeId:string;
    setState:React.Dispatch<React.SetStateAction<SingleStateProps>>;

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

export const Comment: React.FC<CommentProps> = ({comment,storeId,setState}) => {

    const [subComment,setSubComment] = useState<CommentStateProps>({
        openReply:false,
        userLike:comment.userLikeOrNot,
        userDisLike:comment.userDislikeOrNot,
        countLike:comment.countLike,
        countDisLike:comment.countDislike,
        openDialogReply:false,
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
    

    const handleSubmitReply = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await CreateReplyComment(comment._id, subComment.textReply, storeId)
        .then((res:AxiosResponse | boolean) => {
           if(!res) return;
           else {
            GetComments(storeId as string)
            .then((res:AxiosResponse) => {
                setState((prev:SingleStateProps) => ({...prev, comment:res.data.comments as CommentSection[]}))
                setSubComment((prev) => ({...prev,openReply:true,openDialogReply:false,textReply:""}));
                toast.success(res.data.message)
            })
           }
        })
        .catch((err:AxiosError) => {
            toast.error("Something Went Wronge Try Again Later.")
        })

    }

    const handleLikeComment = async(parentCommentId:string) => {
        if(subComment.userDisLike){
            return toast.error("You Need To UnDislike First To Like This Comment");
        }
        else if(subComment.userLike && !subComment.userDisLike){
            const res:AxiosResponse | boolean = await PatchLikeComment(parentCommentId,storeId);
            if(!res) return;
            else setSubComment(prev => ({...prev,countLike:prev.countLike-1, userLike:!prev.userLike}));
            
        }
        else if(!subComment.userLike && !subComment.userDisLike){
            const res:AxiosResponse | boolean = await PatchLikeComment(parentCommentId,storeId);
            if(!res) return;
            else setSubComment(prev => ({...prev,countLike:prev.countLike+1, userLike:!prev.userLike}));
        }
    }
   
    const handleDisLikeComment = async(parentCommentId:string) => {
        if(subComment.userLike){
            return toast.error("You Need To Unlike First To Like This Comment");
        }
        else if(subComment.userDisLike && !subComment.userLike){
            const res:AxiosResponse | boolean =  await PatchDisLikeComment(parentCommentId,storeId);
            if(!res) return;
            else setSubComment(prev => ({...prev,countDisLike:prev.countDisLike-1, userDisLike:!prev.userDisLike}));
        }
        else if(!subComment.userLike && !subComment.userDisLike){
            const res:AxiosResponse | boolean = await PatchDisLikeComment(parentCommentId,storeId);
            if(!res) return;
            else setSubComment(prev => ({...prev,countDisLike:prev.countDisLike+1, userDisLike:!prev.userDisLike})); 
        }
    }


    
    return (
    <>
        <div className="flex gap-2 mt-8 ">
                <div className="max-w-[3rem] max-h-[3rem] flex justify-center mt-4">
                    <Avatar 
                    className="w-full h-full self-center"
                    src={comment.postedBy.userImage}
                    />
                </div>
            <div className="flex flex-col gap-1">
                <div className="flex gap-4">
                    <p className="text-xl font-semibold">{comment.postedBy.userName}</p>
                   {comment.rating !== 0 && 
                    <Rating
                    value={comment.rating}
                    size="small"
                    className="self-center"
                    readOnly
                    />
                   }
                </div>
               <p className="flex flex-wrap flex-1">{comment.textComment}</p>
               <p className="flex flex-wrap flex-1 text-sm text-gray-400">{String(moment(comment.postedAt).format("llll"))}</p>
                <div className="flex gap-4">
                
                    <div className="flex gap-1" onClick={() => handleLikeComment(comment._id)}>
                        {subComment.userLike ? 
                        <ThumbUpAltIcon fontSize="small" className="cursor-pointer self-center text-blue-400"/> 
                        : 
                        <ThumbUpOffAltOutlinedIcon fontSize="small" className="cursor-pointer self-center text-blue-400"/>}
                        <p className="self-center">{subComment.countLike} </p>
                    </div>

                    <div className="flex gap-1" onClick={() => handleDisLikeComment(comment._id)}>
                        {subComment.userDisLike ?
                        <ThumbDownAltIcon fontSize="small" className="cursor-pointer self-center text-blue-400"/>
                        :
                        <ThumbDownOffAltOutlinedIcon fontSize="small" className="cursor-pointer self-center text-blue-400"/>
                        }
                        <p className="self-center">{subComment.countDisLike} </p>
                    </div>


                {subComment.openReply ? 
                <Button variant="text" onClick={() => setSubComment(prev => ({...prev,openReply:!prev.openReply}))}>
                    Close
                    <ArrowDropUpOutlinedIcon/>
                </Button>
                :
                comment.replyCount !== 0 && 
                <Button variant="text" onClick={() => setSubComment(prev => ({...prev,openReply:!prev.openReply}))}>
                    {String(comment.replyCount)} Replies
                    <ArrowDropDownOutlinedIcon/>
                </Button>

                }

                <Button variant="text" onClick={openDialogReply}>
                    Reply
                </Button>
               
                


                </div>
                {subComment.openReply && 
                <div className="ml-6 md:ml-12  my-2 grid">
                {comment.commentReply.map((reply,i) => (
                        <React.Fragment key={i}>
                           <CommentReply
                           storeId={storeId}
                           reply={reply}
                           parentCommentId={comment._id}
                           />
                        </React.Fragment>
                ))}
                </div>
                }
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