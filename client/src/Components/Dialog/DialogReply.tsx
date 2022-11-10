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
import { CommentStateProps } from '../Tabs/Comment';
import { Avatar } from '@mui/material';
import { CommentSection } from '../../Interface/store.interface';

interface DialogReplyProps {
    closeDialogReply : () => void;
    subComment:CommentStateProps;
    handleTextReplyChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    comment:CommentSection;
    handleSubmitReply:(e:React.FormEvent<HTMLFormElement>) => void;
}


export const DialogReply: React.FC<DialogReplyProps> = ({subComment, closeDialogReply, handleTextReplyChange, comment ,handleSubmitReply}) => {



    return (
     <form  id="form2" onSubmit={handleSubmitReply} >
    
      <Dialog  fullWidth open={subComment.openDialogReply} onClose={closeDialogReply} 
      sx={{ '& .MuiDialog-paper': { backgroundColor:"#D7C7B4" } }}
      >
            <div className="flex justify-between bg-[#9C7C57] p-4">
              <h6 className="text-2xl text-[#D9D9D9] font-semibold">Replying</h6>
              <div>
               
                <CloseIcon
                  sx={{cursor:'pointer',color:"#D9D9D9"}}
                  onClick={closeDialogReply}
                />
              </div>
            </div>
            <Divider />
            <Divider />


            <Grid container>
              <Grid item xs={12}>
                <DialogTitle>You Are Replying Comment</DialogTitle>

                <DialogContent>
                <div className="flex gap-2 my-2 mb-6 rounded-md p-2 " style={{backgroundColor:"rgba(0, 0, 0, 0.09)"}}>
                <div className="max-w-[3rem] max-h-[3rem] flex justify-center">
                    <Avatar className="w-full h-full self-center"/>
                </div>
                <div className="flex flex-col gap-1">
               <p className="text-xl font-semibold">{comment.postedBy.userName}</p>
               <p className="flex flex-wrap flex-1">{comment.textComment}</p>
               </div>
                </div>

                  <TextField
                    autoFocus
                    multiline
                    placeholder='Type Your Reply Here . . .'
                    type="text"
                    fullWidth
                    value={subComment.textReply}
                    onChange={handleTextReplyChange}
                    variant="filled"
                    rows={6}
                  />
                </DialogContent>
              </Grid>
            </Grid>

            <DialogActions>
              <Button onClick={closeDialogReply} ><p className="">CANCLE</p></Button>
              <button form="form2" type="submit" className="hover:bg-[#6a7d5b] text-white bg-[#6E845D] rounded-md px-4 py-2 leading-6 shadow-md text-sm font-normal">Reply</button>
            </DialogActions>
          </Dialog>
    </form>
    )
}