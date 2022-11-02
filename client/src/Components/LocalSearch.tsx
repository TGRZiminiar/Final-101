import React from 'react'
import Proptypes from 'prop-types'
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface LocalSearchProps {
    title:string,
    value:string,
    label:string,
    handleChange:(e:any) => void,
}

export const LocalSearch: React.FC<LocalSearchProps> = ({title,value,handleChange,label}) => {
    return (
   
    <Box>
        <Typography variant="h5" className="text-center mb-8">
            {title}
        </Typography>
        <OutlinedInput
                required
                fullWidth
                margin="dense"
                placeholder={label}
                value={value}
                onChange={handleChange}
                sx={{borderRadius:'20px'}}
                
            ></OutlinedInput>
    </Box>
    )
}