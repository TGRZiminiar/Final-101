import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookies from "js-cookie";
import { LoginUser } from '../Function/user';
import { toast } from 'react-toastify';
import { ResultRegister } from '../Interface/Auth.Interface';
import { AxiosError } from 'axios';
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Image/logo.png"
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

interface State {
    email:string;
    password:string;
    showPassword:boolean;
}

export const Login: React.FC = () => {
    const navigate = useNavigate();
    //@ts-ignore
    const user:LogInLogOutUser = useSelector(state => state.user);
    const [state,setState] = useState<State>({
        email:"",
        password:"",
        showPassword:false,
    })

    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const {email, password} = state;
        
        
        LoginUser(password, email)
        .then((res) => {
            const data:ResultRegister = res.data
            Cookies.set('access_token',`${data.token!}`,{expires:3})
            toast.success(data.message);
            navigate("/");
            window.location.reload();
            
        })
        .catch((err:AxiosError) => {
            console.log("THIS IS ERROR" ,err)
            toast.error("Something Went Wronge Try Again")
        })
        
    }

    useEffect(() => {
      
        if(user){
           navigate("/"); 
        }

    }, [user])

    return (
    <div className="w-full flex justify-center align-middle pt-[24vh] max-h-screen overflow-y-hidden">
        <div className="lg:mx-auto lg:my-auto ">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-[100%] mx-auto h-full max-h-[60%]">
            <div className="">
                <div className="hidden lg:block w-full h-full">
                    <img
                    src={Logo}
                    className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="p-8 bg-slate-50 flex flex-col justify-center sm:min-w-[50vh] md:min-w-[65vh] lg:min-w-[55vh] ">
                <h6 className="text-4xl text-center font-semibold mt-4 text-[#9d805f]">Login Account</h6>

                <div className="grid gap-4 mt-8">
                    <h6 className="text-2xl text-[#ac8b65] font-semibold">Email</h6>
                    <input
                    className="outline-none  border text-md focus:bg-gray-50 rounded-lg p-3.5 bg-gray-100 border-l-8 focus:border-l-8 border-l-amber-700 focus:border-2 focus:border-amber-600 focus:border-l-amber-700"
                    placeholder="Email"
                    value={state.email}
                    onChange={(e) => setState((prev) => ({...prev,email:e.target.value}))}
                    required
                    />
                </div>

                <div className="grid gap-4 mt-8">
                    <h6 className="text-2xl text-[#ac8b65] font-semibold">Password</h6>
                    <div className="relative ">
                    <input
                    className="w-full  outline-none focus:bg-gray-50 border text-md rounded-lg p-3.5 bg-gray-100 border-l-8 focus:border-l-8 border-l-amber-700 focus:border-2 focus:border-amber-600 focus:border-l-amber-700"
                    placeholder="Password"
                    type={!state.showPassword ? "password" : "text"}
                    value={state.password}
                    onChange={(e) => setState((prev) => ({...prev,password:e.target.value}))}
                    required
                    />
                    <div className="absolute top-3.5 right-2 cursor-pointer" onClick={() => setState(prev => ({...prev,showPassword:!prev.showPassword}))}>
                    {state.showPassword ? 
                    <VisibilityOutlinedIcon/>
                    :
                    <VisibilityOffOutlinedIcon/>
                    }
                    </div>
                    </div>
                </div>
                <h4 className="text-blue-400 text-sm text-right cursor-pointer"><Link to="/register">No Account?</Link></h4>

                <button className='bg-amber-500 h-auto hover:bg-amber-600 p-2 rounded-lg mt-4' onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>
                    <h2 className="text-xl font-bold text-white">Submit</h2>
                </button>

            </div>
            </div>
        </div>
    
    </div>
    )
}