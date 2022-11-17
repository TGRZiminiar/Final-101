import React,{useState} from 'react'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { Avatar,Button,Divider, Rating } from '@mui/material';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { DialogCreateComment } from '../Dialog/DialogCreateComment';
import { Comment } from './Comment';
import { CreateComment, GetComments } from '../../Function/comment.func';
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
    setState:React.Dispatch<React.SetStateAction<SingleStateProps>>;
}

export const ThirdIndex: React.FC<ThirdIndexProps> = ({state, storeId, setState}) => {
    
    
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
            GetComments(storeId as string)
            .then((res:AxiosResponse) => {
                setState(prev => ({...prev, comment:res.data.comments as CommentSection[]}))
                toast.success(res.data.message)
            })
            .catch((err:AxiosError) => {
                toast.error("Please Refresh And Try Again")
            })
            
        })
        .catch((err:AxiosError) => {
            toast.error("Something Went Wronge Try Again Later.")
        })

    }

    console.log(state)
    //p-8 md:p-12
    return (
    <>
    <div className="mt-8">
        <div className="min-h-[7rem] h-auto  border-y-[1px] border-gray-400 w-full grid md:grid-cols-2">
            <div className='flex gap-8 lg:gap-16 justify-center md:border-r-[1px] border-gray-400  py-4 md:py-0'>
                <h6 className="text-2xl text-semibold self-center">500 Reviews</h6>
                <div className="flex gap-4">
                    <Rating
                    value={5}
                    readOnly
                    className="self-center"
                    />
                    <h6 className="text-2xl self-center text-semibold">4.46</h6>
                </div>
            </div>
            
            <div className="justify-center self-center place-self-center">
            <button className="bg-[#55412A] text-[#D9D9D9] text-xl px-4 py-2 rounded-xl flex gap-4 hover:bg-[#6f5536]"  onClick={handleClickOpen}>
                <p>Write Your Own Comment</p>
                <CommentOutlinedIcon fontSize="large" />
            </button>
            <h6 className="text-center text-gray-500 font-semibold italic">Share your thoughts with others</h6>
            </div>
        </div>

        <div className="p-8 md:p-12">

        {state.comment && state.comment?.map((comment,i) => (
           <Comment key={i} comment={comment} storeId={storeId}         setState={setState}
           />
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