import React,{useEffect, useState} from 'react'
/* import TextField from '../Components/TextField/TextField'
import { Typography } from '../Components/Typography/Typography'
import { RegisterFunction } from "../Function/Auth.function"
import { ResultRegister } from '../Interface/Auth.Interface'; */
// import { setCookie } from "../utils/cookie"
import Cookies from 'js-cookie'
import { Link, useNavigate } from "react-router-dom"
import { RegisterUser } from '../Function/user';
import { ResultRegister } from '../Interface/Auth.Interface';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import Logo from "../Image/logo.png"
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Checkbox } from "@mui/material";
import { useSelector } from 'react-redux';

interface StateProps {
    userName:string;
    email:string;
    password:string;
    confirmPassword:string;
    showPassword:boolean;
    Plength:boolean;
    upper:boolean;
    lower:boolean;
    confirmStatus:boolean;
}

export const Register: React.FC = ({}) => {
    const navigate = useNavigate();
    //@ts-ignore
    const user:LogInLogOutUser = useSelector(state => state.user);
    const [state,setState] = useState<StateProps>({
        userName:"",
        email:"",
        password:"",
        confirmPassword:"",
        showPassword:false,
        Plength:false,
        upper:false,
        lower:false,
        confirmStatus:false,
    })

    // const validateForm = () => {
    //     const {userName, password, confirmPassword} = state;
    //     if(userName === "") return false;
    //     else if(password !== confirmPassword) return false;
    //     else if(password === "" || confirmPassword === "") return false;
    //     else return true;
    // }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const {userName, email, password, confirmPassword, Plength, upper, lower, confirmStatus} = state;

            if(!userName){
                toast.error("UserName Is Required");
            }
            else if (!password){
                toast.error("Password Is Required");
            }
            else if(!Plength){
                toast.error("Your Password Need To Be More Than 6 Characters");
            }
            
            else if(!upper){
                toast.error("Your Password Need To 1 Upper Character");
            }

            else if(!lower){
                toast.error("Your Password Need To 1 Lower Character");
            }
            
            else if(!confirmStatus){
                toast.error("Your New Password Field And New Password Confirm Need To Be Equal");
            }

            else {

                await RegisterUser(userName,email,password,confirmPassword)
                .then((res) => {
                const data:ResultRegister = res.data
                Cookies.set('access_token',`${data.token!}`,{expires:3})
                window.location.reload();
                navigate("/");
                toast.success(data.message);
            })
            .catch((err:AxiosError) => {
                // console.log("THIS ISSS ERROR" ,err?.response!.data[0].message)
                //@ts-ignore
                toast.error(String(err?.response!.data[0].message))
            })
            }
           /* .then((res:ResultRegister) =>  {
                navigate("/select-avatar")
            })
            .catch((err:any) => console.log(err)) */

    }

    const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setState(prev=>({...prev,password:e.target.value}))
        if(e.target.value.length >= 6)  setState(prev=>({...prev,Plength:true}))
        if(e.target.value.length <= 6)  setState(prev=>({...prev,Plength:false}))
        if(e.target.value.length <= 0)  setState(prev=>({...prev,Plength:false,upper:false,lower:false}))
        if(/[a-z]/.test(e.target.value)) setState(prev=>({...prev,upper:false,lower:true}))
        if(!/[a-z]/.test(e.target.value)) setState(prev=>({...prev,lower:false}))
        if(/[A-Z]/.test(e.target.value))  setState(prev=>({...prev,upper:true}))
    }

    const handleConfirmPassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({...prev, confirmPassword:e.target.value}));
        if(e.target.value === state.password){
            setState(prev => ({...prev, confirmStatus:true}));
        }
        else {
            setState(prev => ({...prev, confirmStatus:false}));
        }
    }

    useEffect(() => {
      
        if(user){
           navigate("/"); 
        }

    }, [user])
    
    
    return (
        <div className="w-full flex justify-center align-middle overflow-y-hidden">
        <div className="lg:mx-auto lg:my-auto mt-[4vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-[3.55rem] lg:w-[80%] mx-auto h-full max-h-[60%]">
            <div className="">
                <div className="hidden lg:block w-full h-full">
                    <img
                    src={Logo}
                    className="w-full h-full object-fill"
                    />
                </div>
            </div>
            
            <div className="p-6 bg-slate-50 flex flex-col  justify-center sm:min-w-[45vh] md:min-w-[65vh] lg:min-w-[40vh] lg:w-auto">
                <h6 className="text-4xl text-center font-semibold mt-4 text-[#9d805f]">Register Account</h6>
                <div className="grid gap-4 mt-8">
                    <h6 className="text-2xl text-[#ac8b65] font-semibold">UserName</h6>
                    <input
                    className="outline-none  border-[1px] text-md focus:bg-gray-50 rounded-lg p-3.5 bg-gray-100 border-l-8 focus:border-l-8 border-l-amber-700 focus:border-[1px] focus:border-amber-600 focus:border-l-amber-700"
                    placeholder="UserName"
                    value={state.userName}
                    onChange={(e) => setState((prev) => ({...prev,userName:e.target.value}))}
                    required={true}
                    />
                </div>
                
                <div className="grid gap-4 mt-8">
                    <h6 className="text-2xl text-[#ac8b65] font-semibold">Email</h6>
                    <input
                    className="outline-none  border-[1px] text-md focus:bg-gray-50 rounded-lg p-3.5 bg-gray-100 border-l-8 focus:border-l-8 border-l-amber-700 focus:border-[1px] focus:border-amber-600 focus:border-l-amber-700"
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
                    className="w-full outline-none focus:bg-gray-50 border-[1px] text-md rounded-lg p-3.5 bg-gray-100 border-l-8 focus:border-l-8 border-l-amber-700 focus:border-[1px] focus:border-amber-600 focus:border-l-amber-700"
                    placeholder="Password"
                    type={state.showPassword ? "text" : "password"}
                    value={state.password}
                    onChange={(e) => handleChangePassword(e)}
                    required
                    />
                    <div className="absolute top-3.5 right-2 cursor-pointer" onClick={() => setState(prev => ({...prev,showPassword:!prev.showPassword}))}>
                    {state.showPassword ? 
                    <VisibilityOutlinedIcon/>
                    :
                    <VisibilityOffOutlinedIcon/>
                    }
                    </div>

                    <div className="flex flex-col mt-2">
                        <div className="flex flex-row ">
                        <Checkbox checked={state.Plength} readOnly />
                            <h6 className="text-xl font-semibold text-gray-600 self-center">
                            Your Password Need To Be More Than 6 Characters
                        </h6>
                        </div>  
                        <div className="flex flex-row ">
                        <Checkbox checked={state.upper} readOnly />
                            <h6 className="text-xl font-semibold text-gray-600 self-center">
                            Your Password Need To 1 Upper Character
                        </h6>
                        </div>  
                        <div className="flex flex-row ">
                        <Checkbox checked={state.lower} readOnly />
                            <h6 className="text-xl font-semibold text-gray-600 self-center">
                            Your Password Need To 1 Lower Character
                        </h6>
                        </div>  
                        
                    </div>
                    </div>
                </div>

                   
                <div className="grid gap-4 mt-8">
                    <h6 className="text-2xl text-[#ac8b65] font-semibold">Confirm Password</h6>
                    <input
                    className="outline-none  border-[1px] text-md focus:bg-gray-50 rounded-lg p-3.5 bg-gray-100 border-l-8 focus:border-l-8 border-l-amber-700 focus:border-[1px] focus:border-amber-600 focus:border-l-amber-700"
                    placeholder="Confirm Password"
                    value={state.confirmPassword}
                    onChange={(e) => handleConfirmPassword(e)}
                    required
                    type={"password"}
                    />
                    <div className="flex flex-row">
                        <Checkbox checked={state.confirmStatus} readOnly />
                            <h6 className="text-xl font-semibold text-gray-600 self-center">
                            Password And Confirm Password Need To Be Same
                        </h6>
                        </div>  
                </div>

                <h4 className="text-blue-400 text-sm text-right cursor-pointer"><Link to="/login">Have Account?</Link></h4>

                <button className='bg-amber-500 h-auto hover:bg-amber-600 p-2 rounded-lg mt-4' onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>
                    <h2 className="text-xl font-bold text-white">Submit</h2>
                </button>

            </div>
            </div>
        </div>
    
    </div>
    )
}

 /* { <div className="bg-[#131324] w-screen h-screen">
    <br/>
    <div className="mt-4 p-4 max-w-[80vw] lg:max-w-[40vw]     relative  bg-[#00000076] text-white   mx-auto">
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