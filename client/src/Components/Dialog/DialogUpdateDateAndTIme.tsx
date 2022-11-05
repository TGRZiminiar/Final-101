import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface FormDialogProps {
    open:boolean;
    handleClose:() => void;
    title:string;
    value:any;
    handleChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitEditing: () => void;
}

export const DialogUpdateDateAndTIme:React.FC<FormDialogProps> = ({open,handleClose,title,value,handleChange, handleSubmitEditing}) => {
  

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <h6 className="my-2 text-xl font-semibold">
           After Editing Your Data Click Updated
          </h6>
         <div className="grid grid-cols-2 gap-8 mt-20">
         <TextField
            label="Email Address"
            type="email"
            fullWidth
            variant="filled"
            value={value}
            onChange={handleChange}
            />
         <TextField
            label="Email Address"
            type="email"
            fullWidth
            variant="filled"
            value={value}
            onChange={handleChange}
          />
         </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmitEditing} variant="contained" >Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
