import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface DialogCreateCommentProps {

    state:any;
    handleClose:() => void;
    setState:React.Dispatch<React.SetStateAction<any>>;

}

export const DialogCreateComment: React.FC<DialogCreateCommentProps> = ({state,handleClose,setState}) => {

    

    return (
     <div>
    
      <Dialog open={state.open} onClose={handleClose} fullWidth>
        <DialogTitle>You Are Commenting To Mix Store</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}