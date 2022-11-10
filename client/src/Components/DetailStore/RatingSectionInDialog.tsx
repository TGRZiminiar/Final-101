import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { StateProps } from '../Tabs/ThirdIndex';
import { styled } from '@mui/material/styles';

interface RatingSectionInDialogProps {
    state:StateProps;
    setState:React.Dispatch<React.SetStateAction<StateProps>>;
}

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#747070',
    },
    '& .MuiRating-iconHover': {
      color: '#FFFFFF',
    },
  });

export const RatingSectionInDialog: React.FC<RatingSectionInDialogProps> = ({setState,state}) => {
    return (
    <>
        <div className='flex gap-4 bg-[#D9D9D9] rounded-xl w-fit p-2'>
            <p className="text-xl self-center font-medium" >
              &nbsp; Rating Your Experience
            </p>
            <Rating
              size="large"
              precision={1}
              value={state.rating || 0}
              onChange={(e, n) => {
                  setState(prev=>({...prev,rating:n!}))
            }}
            className="my-1"
                />
        </div>
    </>
    )
}