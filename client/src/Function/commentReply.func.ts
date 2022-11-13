import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import checkToken from "../utils/CheckAuthToken";
const authtoken = Cookies.get("access_token");

// export const CreateReplyComment = async(commentId:string, textReply:string, storeId:string) => {
//     return await axios.post("http://localhost:5000/api/create-reply",{
//         storeId, textReply, commentId
//     },{
//         headers:{
//             authorization:`Bearer ${authtoken}`
//         }
//     });
// }


export const PatchLikeReplyComment = async(parentCommentId:string, commentReplyId:string, storeId:string) => {
    if(!checkToken(authtoken as string)){
        toast.error("Please Login Again")
        return false;
    }
    else {
        return await axios.patch("http://localhost:5000/api/like-reply",{
            commentId:parentCommentId, 
            replyId:commentReplyId, 
            storeId:storeId
        },{
          headers:{
            authorization: `Bearer ${authtoken}`
          }  
        })
    }
}

export const PatchDisLikeReplyComment = async(parentCommentId:string, commentReplyId:string, storeId:string) => {
    
    if(!checkToken(authtoken as string)){
        return false;
    }
    else {
        return await axios.patch("http://localhost:5000/api/dis-like-reply",{
            commentId:parentCommentId, 
            replyId:commentReplyId, 
            storeId:storeId
        },{
        headers:{
            authorization: `Bearer ${authtoken}`
        }  
        })
    }
}