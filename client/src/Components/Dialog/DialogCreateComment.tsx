import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { StateProps } from "../Tabs/ThirdIndex"
import { RatingSectionInDialog } from '../DetailStore/RatingSectionInDialog';
interface DialogCreateCommentProps {
  subState:StateProps;
    handleClose:() => void;
    setSubState:React.Dispatch<React.SetStateAction<StateProps>>;
    handleSubmitComment:(e:React.FormEvent<HTMLFormElement>) => void;
}


export const DialogCreateComment: React.FC<DialogCreateCommentProps> = ({subState,handleClose,setSubState,handleSubmitComment}) => {


    return (
     <form onSubmit={(e) => handleSubmitComment(e)} id="form1">
    
      <Dialog  fullWidth open={subState.open} onClose={handleClose} 
      sx={{ '& .MuiDialog-paper': { backgroundColor:"#D7C7B4" } }}
      >
            <div className="flex justify-between bg-[#9C7C57] p-4">
              <h6 className="text-2xl text-[#D9D9D9] font-semibold">Review Your Experience</h6>
              <div>
               
                <CloseIcon
                  sx={{cursor:'pointer',color:"#D9D9D9"}}
                  onClick={handleClose}
                />
              </div>
            </div>
            <Divider />
            <Divider />

            <DialogContent>
             <RatingSectionInDialog
             state={subState}
             setState={setSubState}
             />
            </DialogContent>
            <Divider />

            <Grid container>
              <Grid item xs={12}>
                <DialogTitle>Review This Restaurant</DialogTitle>

                <DialogContent>
                  <TextField
                    autoFocus
                    multiline
                    placeholder='Type Your Review Here . . .'
                    type="text"
                    fullWidth
                    value={subState.comment}
                    onChange={(e) => setSubState(prev=>({...prev,comment:e.target.value}))}
                    variant="filled"
                    rows={6}
                    helperText={'If you have already commented or rated your comment or rated will be updated'}
                  />
                </DialogContent>
              </Grid>
            </Grid>

            <DialogActions>
              <Button onClick={handleClose} ><p className="">CANCLE</p></Button>
              <button form="form1" type="submit" className="hover:bg-[#6a7d5b] text-white bg-[#6E845D] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal">SUBMIT</button>
            </DialogActions>
          </Dialog>
    </form>
    )
}