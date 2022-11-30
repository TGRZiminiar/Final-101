import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { LogInLogOutUser } from "../../Reducer/userReducer";
import { GetUserBookMark, PatchUpdatePassword, UpdateUser } from '../../Function/user';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import "../../Components/Tabs/TabsDetailStore.css"
import { UserDetailFirstTab } from '../../Components/Tabs/UserDetail/UserDetailFirstTab';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserBookMark } from '../../Interface/user.interface';
import { UserDetailSecondTab } from '../../Components/Tabs/UserDetail/UserDetailSecondTab';
export interface StateProps {
    value:number;
    images:File[];
    imageURLs:any;
    userName:string;
    email:string;
    gender:string;
    currentUrl:string;
    showCurrentPassword:boolean;
    showChangePassword:boolean;
    currentPassword:string;
    confirmPassword:string;
    passwordChange:string;
    Plength:boolean;
    upper:boolean;
    lower:boolean;
    confirmStatus:boolean;

    bookMark:UserBookMark | null;
}

export const UserDetail: React.FC = () => {
    //@ts-ignore
    const user:LogInLogOutUser = useSelector(state => state.user);
    const url = window.location.search;
    const navigate = useNavigate(); 

    const [state,setState] = useState<StateProps>({
        value:0,
        images:[],
        imageURLs:[],
        userName:"",
        email:"",
        gender:"unknow",
        currentUrl:"",

        
        showCurrentPassword:false,
        showChangePassword:false,
        currentPassword:"",
        confirmPassword:"",
        passwordChange:"",
        Plength:false,
        upper:false,
        lower:false,
        confirmStatus:false,

        bookMark:null,
        
    })
    
    
    useEffect(() => {
        console.log("RUNNING")
        if(window.location.search.substring(5) === "edit"){
            setState(prev => ({...prev,value:0}))
        }
        else if (window.location.search.substring(5) === "bookMark"){
            setState(prev => ({...prev,value:1}));
            // if(state.bookMark !== null){
                loadBookMark();
            // }
        }
        else {
            return;
        }
        
    }, [url])
    

    useEffect(() => {
        setState(prev => ({...prev,userName:user?.userName, email:user?.email,currentUrl:user?.userImage,imageURLs:[user?.userImage], gender:user?.gender}))
    }, [user])
    

    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore  
      setState(prev=>({...prev,images:[...e.target.files]}))
    }
    

    useEffect(() => {
        if (state.images.length < 1) return;
        //@ts-ignore
        const newImageUrls = [];
        //@ts-ignore
        state.images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        //@ts-ignore
        setState(prev=>({...prev,imageURLs:newImageUrls}))
    }, [state.images]);


    const handleChangeEvent = (e:React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({...prev, gender:e.target.value}))
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {userName, email, gender, images, currentUrl} = state;
        await UpdateUser(userName, email, gender, images, currentUrl)
        .then((res) => {
            toast.success("Update User Success")
        })
        .catch((err:AxiosError) => {
            toast.error("Something Went Wronge Try Again Later")
        })

    }

    const loadBookMark = async() => {
        await GetUserBookMark()
        .then((res:AxiosResponse | boolean) => {
            if(typeof(res) !== "boolean"){
                // console.log(res.data)
                setState(prev => ({...prev, bookMark:res.data.user}))
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }


    const handleConfirmPassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setState(prev=>({...prev,confirmPassword:e.target.value}))
        if(e.target.value === state.passwordChange){
          setState(prev=>({...prev,confirmStatus:true}))
        }
        else{
          setState(prev=>({...prev,confirmStatus:false}))
        }
    }
    
    const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setState(prev=>({...prev,passwordChange:e.target.value}))
        if(e.target.value.length >= 6)  setState(prev=>({...prev,Plength:true}))
        if(e.target.value.length <= 6)  setState(prev=>({...prev,Plength:false}))
        if(e.target.value.length <= 0)  setState(prev=>({...prev,Plength:false,upper:false,lower:false}))
        if(/[a-z]/.test(e.target.value)) setState(prev=>({...prev,upper:false,lower:true}))
        if(!/[a-z]/.test(e.target.value)) setState(prev=>({...prev,lower:false}))
        if(/[A-Z]/.test(e.target.value))  setState(prev=>({...prev,upper:true}))
    }

    const handleSubmitPassword = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
          if(state.passwordChange !== state.confirmPassword) return toast.error("New Password And Confirm New Password Is Not Equal") 
         
          if(state.passwordChange === state.confirmPassword) {
            const {currentPassword,passwordChange, confirmPassword} = state
            PatchUpdatePassword(currentPassword,passwordChange,confirmPassword)
            .then(res=>{
              window.location.reload();
              return  toast.success("Update Password Success"); 
            })
            .catch((err:AxiosError)=>{
              if(err.response?.status === 403) return toast.error("Your Current Password Is Wronge") 
              if(err.response?.status === 402) return toast.error("New Password And Confirm New Password Is Not Equal") 
            })
          }
      }
    
    const handleClick = (value:number, link:string) => {
        setState(prev => ({...prev,value:value}));
        navigate(`/user/${user.userId}?tab=${link}`);
    }


    // console.log(state)

    return (
    <>
        <div className="bg-white w-full md:w-[60%] mx-auto h-auto min-h-[100vh] pt-[7vh]">
            <div className="flex justify-center w-full h-[5rem] bg-[#857F7F] text-center ">
                <h6 className="text-white text-4xl self-center">User Profile</h6>
            </div>
            <div className="md:px-10 lg:px-20 grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4  ">
                <div 
                className={`w-full h-[3rem] md:h-[4rem] flex justify-center cursor-pointer hover:shadow-md ${state.value === 0 ? "bg-[#CCAF63] hover:bg-[#aa9256]" : "bg-[#6E845D] hover:bg-[#5b6c4e]"} `}
                
                onClick={() => handleClick(0,"edit")}>
                    <h6 className="text-white text-xl md:text-3xl self-center font-semibold">Edit Profile</h6>
                </div>

                <div 
                className={`w-full h-[3rem] md:h-[4rem] flex justify-center cursor-pointer hover:shadow-md ${state.value === 1 ? "bg-[#CCAF63] hover:bg-[#aa9256]" : "bg-[#6E845D] hover:bg-[#5b6c4e]"} `}
                
                onClick={() => handleClick(1,"bookMark")}>
                    <h6 className="text-white text-xl md:text-3xl self-center font-semibold">BookMark</h6>
                </div>

            </div>

            <div className="mt-8 px-8 md:px-20">
               <div className={`w-full ${state.value === 0 ? "shown" : "hide"}`}>
                <UserDetailFirstTab
                    state={state}
                    setState={setState}
                    handleSubmit={handleSubmit}
                    handleImageChange={handleImageChange}
                    handleChangeEvent={handleChangeEvent}
                    handleConfirmPassword={handleConfirmPassword}
                    handleChangePassword={handleChangePassword}
                    handleSubmitPassword={handleSubmitPassword}
                />
               </div>
            
               <div className={`w-full ${state.value === 1 ? "shown" : "hide"}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                   
                   {state.bookMark && 
                    <UserDetailSecondTab
                    book={state?.bookMark}
                    
                    />
                   }
                
                </div>
                </div>

            </div>


        </div>
    </>
    )
}