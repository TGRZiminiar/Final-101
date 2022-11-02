import axios from "axios";
import Cookies from "js-cookie";
import { ResultRegister } from "../Interface/Auth.Interface";
import { CurrentUser, CurrentUserData } from "../Interface/user.interface";
const authtoken = Cookies.get("access_token");

export const GetCurrentUser = async(authtoken:string) => {

    return await axios.get(`http://localhost:5000/api/current-user`,{
        headers:{
            authorization:`Bearer ${authtoken}`
        }
    })
}

export const LoginUser = async(password:string, email:string) => {

    return await axios.post(`http://localhost:5000/api/login`,{
        password:password,
        email:email,
    })

}

export const RegisterUser = async(userName:string, email:string, password:string, confirmPassword:string) => {

    return await axios.post(`http://localhost:5000/api/register`,{
        userName:userName,
        password:password,
        passwordConfirmation:confirmPassword,
        email:email,
    })

}
