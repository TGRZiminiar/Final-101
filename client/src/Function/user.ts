import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ResultRegister } from "../Interface/Auth.Interface";
import { CurrentUser, CurrentUserData } from "../Interface/user.interface";
const authtoken = Cookies.get("access_token");

export const GetCurrentUser = async(authtoken:string) => {
   if(authtoken === undefined) return false;
   else {
    return await axios.get(`http://localhost:5000/api/current-user`,{
        headers:{
            authorization:`Bearer ${authtoken}`
        }
    })
   }
}

export const LoginUser = async(password:string, email:string) => {

    return await axios.post(`http://localhost:5000/api/login`,{
        password:password,
        email:email,
    })

}

export const RegisterUser = async(userName:string, email:string, password:string, confirmPassword:string, ) => {

    return await axios.post(`http://localhost:5000/api/register`,{
        userName:userName,
        password:password,
        passwordConfirmation:confirmPassword,
        email:email,

    })
    
}

export const UpdateUser = async(userName:string, email:string, gender:string, images:File[], currentUrl:string) => {
    
    const formData = new FormData();

    formData.append("images",images[0]);
    
    if(gender === "male" || gender === "female" || gender === "lgbtq+" || gender === "unknow") {

        return await axios({
            method:"patch",
            url:"http://localhost:5000/api/update-user",
            data: formData,
            headers: {
            "Content-Type":"singlepart/form-data",
            authorization:`Bearer ${authtoken}`,
            username:userName,
            email:email,
            gender:gender,
            currenturl:currentUrl,
        }
    
    })}
    
    else {
        return toast.error("Gender Is Wronge Please Select Correct Gender");
        
    }

}

export const PatchUpdatePassword = async(oldPassword:string, newPassword:string, confirmPassword:string) => {
    return await axios.patch(`http://localhost:5000/api/update-password`,{
        oldPassword:oldPassword,
        newPassword:newPassword,
        confirmPassword:confirmPassword,
    },{
        headers:{
            authorization:`Bearer ${authtoken}`
        }
    })   
}

export const GetUserBookMark = async() => {
    
    if(!authtoken){
        toast.error("You need to Login First");
        return false;
    }
    else {
        return await axios.get("http://localhost:5000/api/get-bookMark",{
            headers:{
                authorization:`Bearer ${authtoken}`,
            }
        });
    }

}
export type Popular = "rating" | "comment" | "";

export const SearchFunction = async(name:string, location:string, categoryId:string, popular:Popular) => {
    return await axios.post("http://localhost:5000/api/search",{
        name:name,
        location:location,
        categoryId:categoryId,
        popular:popular,
    });
}