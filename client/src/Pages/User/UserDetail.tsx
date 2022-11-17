import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { LogInLogOutUser } from "../../Reducer/userReducer";
import { UpdateUser } from '../../Function/user';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import "../../Components/Tabs/TabsDetailStore.css"
import { UserDetailFirstTab } from '../../Components/Tabs/UserDetail/UserDetailFirstTab';

export interface StateProps {
    value:number;
    images:File[];
    imageURLs:any;
    userName:string;
    email:string;
    gender:string;
    currentUrl:string;
}

export const UserDetail: React.FC = () => {
    //@ts-ignore
    const user:LogInLogOutUser = useSelector(state => state.user);

    const [state,setState] = useState<StateProps>({
        value:0,
        images:[],
        imageURLs:[],
        userName:"",
        email:"",
        gender:"unknow",
        currentUrl:"",
    })

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

    console.log(state)

    return (
    <>
        <div className="bg-white w-full md:w-[60%] mx-auto h-full min-h-[120vh] pt-[7vh]">
            <div className="flex justify-center w-full h-[5rem] bg-[#857F7F] text-center ">
                <h6 className="text-white text-4xl self-center">User Profile</h6>
            </div>
            <div className="md:px-10 lg:px-20 grid grid-cols-2 gap-2 mt-4  ">
                <div 
                className={`w-full h-[3rem] md:h-[4rem] flex justify-center cursor-pointer hover:shadow-md ${state.value === 0 ? "bg-[#CCAF63] hover:bg-[#aa9256]" : "bg-[#6E845D] hover:bg-[#5b6c4e]"} `}
                
                onClick={() => setState(prev => ({...prev,value:0}))}>
                    <h6 className="text-white text-xl md:text-3xl self-center font-semibold">Edit Profile</h6>
                </div>

                <div 
                className={`w-full h-[3rem] md:h-[4rem] flex justify-center cursor-pointer hover:shadow-md ${state.value === 1 ? "bg-[#CCAF63] hover:bg-[#aa9256]" : "bg-[#6E845D] hover:bg-[#5b6c4e]"} `}
                
                onClick={() => setState(prev => ({...prev,value:1}))}>
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
                />
               </div>
               
            </div>


        </div>
    </>
    )
}