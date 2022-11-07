import React,{useState} from 'react'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { Avatar,Button,Divider } from '@mui/material';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { DialogCreateComment } from '../Dialog/DialogCreateComment';


interface StateProps {
    open:boolean;

}

export const ThirdIndex: React.FC = () => {
    
    
    const arr = [1,2,3]

    const [state,setState] = useState<StateProps>({
        open:true,


    })

    const handleClickOpen = () => {
        setState(prev => ({...prev,open:true}))
    }

    const handleClose = () => {
        setState(prev => ({...prev,open:false}))
    }


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

        {arr.map((i) => (
            <>
            <div className="flex gap-2 mt-8 ">
            <div className="max-w-[3rem] max-h-[3rem] flex justify-center">
                <Avatar className="w-full h-full self-center"/>
            </div>
            <div className="flex flex-col gap-1">
               <p className="text-xl font-semibold">MIX_LUMLUKKA</p>
               <p className="flex flex-wrap flex-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, saepe.</p>
                <div className="flex gap-4">
                <div className="flex gap-1">
                <ThumbUpOffAltOutlinedIcon className="cursor-pointer self-center"/>
                <p className="self-center">2 likes</p>
                </div>
                <div className="flex gap-1">
                <ThumbDownOffAltOutlinedIcon className="cursor-pointer self-center"/>
                <p className="self-center">2 disLikes</p>
                </div>
                <Button variant="text">
                    Reply
                </Button>
               
                <Button variant="text">
                    View 25 Replies
                    <ArrowDropDownOutlinedIcon/>
                </Button>
                </div>
            </div>
            </div>        
            <Divider  />
            </>
        ))}

        <DialogCreateComment
        state={state}
        handleClose={handleClose}
        setState={setState}
        />

        </div>

    </div>
    </>
    )
}