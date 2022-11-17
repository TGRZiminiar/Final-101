import axios from "axios";
import Cookies from "js-cookie";
const authtoken = Cookies.get("access_token");

export const CreateComment = async(content:string, rating:number, hasRating:boolean, storeId:string) => {
    return await axios.post("http://localhost:5000/api/create-comment",{
        content, rating, hasRating, storeId
    },{
        headers:{
            authorization:`Bearer ${authtoken}`
        }
    });
}


export const PatchLikeComment = async(commentId:string, storeId:string) => {
    return await axios.patch("http://localhost:5000/api/like-comment",{
        commentId, storeId
    },{
        headers:{
            authorization:`Bearer ${authtoken}`
        }
    });
}


export const PatchDisLikeComment = async(commentId:string, storeId:string) => {
    return await axios.patch("http://localhost:5000/api/disLike-comment",{
       commentId, storeId
    },{
        headers:{
            authorization:`Bearer ${authtoken}`
        }
    });
}


export const CreateReplyComment = async(commentId:string, textReply:string, storeId:string) => {
    return await axios.post("http://localhost:5000/api/create-reply",{
        storeId, textReply, commentId
    },{
        headers:{
            authorization:`Bearer ${authtoken}`
        }
    });
}


export const GetComments = async(storeId:string) => {
    return await axios.get("http://localhost:5000/api/get-comment",{
        headers:{
            authorization:`Bearer ${authtoken}`,
            storeid:storeId
        }
    });
    
}