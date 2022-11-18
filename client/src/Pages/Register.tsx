import React,{useState} from 'react'
/* import TextField from '../Components/TextField/TextField'
import { Typography } from '../Components/Typography/Typography'
import { RegisterFunction } from "../Function/Auth.function"
import { ResultRegister } from '../Interface/Auth.Interface'; */
// import { setCookie } from "../utils/cookie"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"
import { RegisterUser } from '../Function/user';
import { ResultRegister } from '../Interface/Auth.Interface';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

interface StateProps {
    userName:string;
    email:string;
    password:string;
    confirmPassword:string;
    showPassword:boolean;
}

export const Register: React.FC = ({}) => {
    const navigate = useNavigate();

    const [state,setState] = useState<StateProps>({
        userName:"",
        email:"",
        password:"",
        confirmPassword:"",
        showPassword:true
    })

    const validateForm = () => {
        const {userName, password, confirmPassword} = state;
        if(userName === "") return false;
        else if(password !== confirmPassword) return false;
        else if(password === "" || confirmPassword === "") return false;
        else return true;
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(!validateForm()){
            console.log("Something Went Wronge")
        }


        else if(validateForm()){
            const {userName, email, password, confirmPassword} = state;

           RegisterUser(userName,email,password,confirmPassword)
            .then((res) => {
                const data:ResultRegister = res.data
                Cookies.set('access_token',`${data.token!}`,{expires:3})
                window.location.reload();
                navigate("/");
                toast.success(data.message);
            })
            .catch((err:AxiosError) => {
                console.log("THIS ISSS ERROR" ,err)
                toast.error(err.response?.data as string)
            })
           /* .then((res:ResultRegister) =>  {
                navigate("/select-avatar")
            })
            .catch((err:any) => console.log(err)) */
        }

    }

    
    return (

    <div className="w-screen h-screen flex justify-center align-middle ">
        <div className="w-[50vh] h-[70vh] p-8 self-center bg-white">
            <h2 className='text-4xl font-bold text-blue-400'> Register Here!</h2>
            <h2 className='pt-2 text-lg font-bold text-slate-500'> Let's join us :)</h2>
            <div className="grid mt-8 gap-4">
                <h2 className="text-slate-400 text-2xl font-semibold">UserName</h2>
                <input type="text" className="outline-none border text-sm rounded-lg  w-full p-2.5 bg-gray-700 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 focus:text-white" 
                placeholder="John"
                required
                value={state.userName}
                onChange={(e) => setState((prev) => ({...prev,userName:e.target.value}))}
                />
                <h2 className="text-slate-400 text-2xl font-semibold">Email</h2>
                <input type="email" className="outline-none border text-sm rounded-lg  w-full p-2.5 bg-gray-700 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 focus:text-white" 
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
                <h2 className="text-slate-400 text-2xl font-semibold">ConfrimPassword</h2>
                <input type="password" className="outline-none border text-sm rounded-lg  w-full p-2.5 bg-gray-700 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 focus:text-white" 
                placeholder="******"
                required
                value={state.confirmPassword}
                onChange={(e) => setState((prev) => ({...prev,confirmPassword:e.target.value}))}
                />
                <button className='bg-indigo-400 h-auto hover:bg-indigo-500 p-2 rounded-lg mt-2' onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>
                    <h2 className="text-xl font-bold text-white">Submit</h2>
                </button>
                <h4 className="text-blue-400 text-sm text-right cursor-pointer">forgot password?</h4>
            </div>
        </div>
    </div>

  
    )
}

 /* { <div className="bg-[#131324] w-screen h-screen">
    <br/>
    <div className="mt-4 p-4 max-w-[80vw] md:max-w-[40vw]     relative  bg-[#00000076] text-white   mx-auto">
        <Typography variant='h4' className="pt-4 text-center self-center">Register</Typography>
        <hr className="mt-4"/>
        <form onSubmit={(e) => handleSubmit(e)}>
        <div className="grid place-content-center p-8">
            <Typography variant='h6' className="font-medium text-center mb-6">UserName</Typography>
            <TextField typeInput="text" label='UserName'  className=" rounded-sm bg-[#40404076] " type='standart' value={state.userName} onChange={(e) => setState((prev)=>({...prev,userName:e.target.value}))} />

            <Typography variant='h6' className="font-medium text-center mb-6">Email</Typography>
            <TextField typeInput="email" label='Email'  className=" rounded-sm bg-[#40404076]" type='standart' value={state.email} onChange={(e) => setState((prev)=>({...prev,email:e.target.value}))} />
            
            <Typography variant='h6' className="font-medium text-center mb-6">Password</Typography>
            <TextField typeInput={state.showPassword === true ? "text" : "password"} label='Password' className=" rounded-sm bg-[#40404076]" type='standart' value={state.password} onChange={(e) => setState((prev)=>({...prev,password:e.target.value}))} />
            
            <Typography variant='h6' className="font-medium text-center mb-6">Confirm Password</Typography>
            <TextField typeInput="password" label='Password' className=" rounded-sm bg-[#40404076]" type='standart' value={state.confirmPassword} onChange={(e) => setState((prev)=>({...prev,confirmPassword:e.target.value}))} />

            <button className='bg-indigo-400 h-8 hover:bg-indigo-500' onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>
                Submit
            </button>

        </div>
        </form>

    </div>
    </div> }*/