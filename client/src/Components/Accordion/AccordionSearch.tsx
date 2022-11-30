import React, { ReactText } from 'react'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';

const Accordion = styled((props) => (   
    <MuiAccordion children={''} disableGutters elevation={3} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));
  
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
  

interface AccordionProps {
  state:any;
  setState:React.Dispatch<React.SetStateAction<any>>
}

export const AccordionSearch: React.FC<AccordionProps> = ({state,setState}) => {


    return (
    <>

    <MuiAccordion  
      style={{transition:'none',borderRadius:'16px'}}
      TransitionProps={{ timeout:0,unmountOnExit: true }}  >
        <MuiAccordionSummary>
          <Typography> ตามสถิติต่างๆ</Typography>
        </MuiAccordionSummary>

        <AccordionDetails>
        <FormControl>
            <RadioGroup             
            >
              <FormControlLabel
                value="view"
                control={<Radio />}
                label="ยอดวิว"
                // onChange={(e) => setState(prev=>({...prev,rank:e.target.value}))}
              />
              <FormControlLabel 
              value="bookshelf" 
              control={<Radio />} 
              label="เพิ่มเข้าชั้นหนังสือ"
              // onChange={(e) => setState(prev=>({...prev,rank:e.target.value}))}
              />
              <FormControlLabel
                value="update"
                control={<Radio />}
                label="อัพเดตบ่อยที่สุด"
                // onChange={(e) => setState(prev=>({...prev,rank:e.target.value}))}
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </MuiAccordion>


    </>
    )
}