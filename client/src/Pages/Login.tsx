import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from "js-cookie";
import { LoginUser } from '../Function/user';
import { toast } from 'react-toastify';
import { ResultRegister } from '../Interface/Auth.Interface';
import { AxiosError } from 'axios';
import {useNavigate} from "react-router-dom"


interface State {
    email:string;
    password:string
}

export const Login: React.FC = () => {
    const navigate = useNavigate();

    const [state,setState] = useState<State>({
        email:"",
        password:"",
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
        })
        .catch((err:AxiosError) => {
            console.log("THIS IS ERROR" ,err)
            toast.error("Something Went Wronge Try Again")
        })
        
    }

    return (
    <>
     <div className="w-full h-[100vh] flex justify-center align-middle ">
        <div className="w-[50vh] h-[50vh] my-auto p-8 self-center bg-white">
            <h2 className='text-4xl font-bold text-blue-400'> Login Here!</h2>
            <h2 className='pt-2 text-lg font-bold text-slate-500'> Let's have fun!</h2>
            <div className="grid mt-8 gap-4">
                <h2 className="text-slate-400 text-2xl font-semibold">Email</h2>
                <input type="text" className="outline-none border text-sm rounded-lg  w-full p-2.5 bg-gray-700 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 focus:text-white" 
                placeholder="John@gmail.com"
                required
                value={state.email}
                onChange={(e) => setState((prev) => ({...prev,email:e.target.value}))}
                />
                <h2 className="text-slate-400 text-2xl font-semibold">Password</h2>
                <input type="password" className="outline-none border text-sm rounded-lg  w-full p-2.5 bg-gray-700 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 focus:text-white" 
                placeholder="******"
                required
                value={state.password}
                onChange={(e) => setState((prev) => ({...prev,password:e.target.value}))}
                />
               
                <button className='bg-indigo-400 h-auto hover:bg-indigo-500 p-2 rounded-lg mt-2' onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>
                    <h2 className="text-xl font-bold text-white">Submit</h2>
                </button>
                <h4 className="text-blue-400 text-sm text-right cursor-pointer"><Link to="/register">No Account?</Link></h4>
            </div>
           
        </div>
    </div>
    </>
    )
}