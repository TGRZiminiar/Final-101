import React,{useState} from 'react'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { Avatar,Button,Divider } from '@mui/material';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { DialogCreateComment } from '../Dialog/DialogCreateComment';
import { Comment } from './Comment';
import { CreateComment } from '../../Function/comment.func';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { CommentSection } from '../../Interface/store.interface';
import { SingleStateProps } from '../../Pages/User/SingleStore';


export interface StateProps {
    open:boolean;
    comment:string;
    rating:number;
}

interface ThirdIndexProps {
    state:SingleStateProps;
    storeId:string;
  
}

export const ThirdIndex: React.FC<ThirdIndexProps> = ({state, storeId}) => {
    
    
    const arr = [1,2,3]

    const [subState,setSubState] = useState<StateProps>({
        open:false,
        comment:"",
        rating:0,

    })

    const handleClickOpen = () => {
        setSubState(prev => ({...prev,open:true}))
    }

    const handleClose = () => {
        setSubState(prev => ({...prev,open:false}))
    }


    const handleSubmitComment = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let hasRating:boolean = true;
        
        const {rating, comment} = subState;
        if(rating === 0){
            hasRating = false;
        }
        await CreateComment(comment ,rating ,hasRating ,storeId)
        .then((res:AxiosResponse) => {
            toast.success(res.data.message)
        })
        .catch((err:AxiosError) => {
            toast.error("Something Went Wronge Try Again Later.")
        })

    }

    console.log(state)

    return (
    <>
    <div className="">
        <div>
            <button className="bg-[#55412A] text-white text-xl p-4 rounded-xl flex gap-4 hover:bg-[#6f5536]"  onClick={handleClickOpen}>
            <p>Write Your  Comment</p>
            <CommentOutlinedIcon fontSize="large" />
            </button>
        </div>

        <div className="">

        {state.comment?.map((comment,i) => (
           <Comment key={i} comment={comment} mainState={state} storeId={storeId} />
        ))}


        <DialogCreateComment
        subState={subState}
        handleClose={handleClose}
        setSubState={setSubState}
        handleSubmitComment={handleSubmitComment}
        />

        </div>

    </div>
    </>
    )
}