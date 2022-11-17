import { Radio, TextField } from '@mui/material'
import React from 'react'
import { StateProps } from '../../../Pages/User/UserDetail';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

interface UserDetailFirstTabProps {
    state:StateProps;
    setState:React.Dispatch<React.SetStateAction<StateProps>>; 
    handleSubmit:(e:React.FormEvent<HTMLFormElement>) => void; 
    handleImageChange:(e:React.ChangeEvent<HTMLInputElement>) => void; 
    handleChangeEvent:(e:React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserDetailFirstTab: React.FC<UserDetailFirstTabProps> = ({state, setState, handleSubmit, handleImageChange, handleChangeEvent}) => {



    return (
    <>
        <div className="mt-8 px-8 md:px-20">
                <form className="grid gap-2" onSubmit={handleSubmit}>
                    <h6 className="text-2xl text-gray-500 font-semibold">Upload User Image</h6>
                    <div className="w-[15rem] h-[15rem] mt-8 mx-auto relative">
                        <img
                        className="w-full h-full rounded-full object-fill border-[1px]"
                        src={state.imageURLs[0] ? state.imageURLs[0] : `https://www.w3schools.com/howto/img_avatar.png`}
                        />
                    <div className="absolute bottom-4 right-2 cursor-pointer">
                        <label htmlFor='file-upload' className="w-[3rem] h-[3rem] rounded-full bg-[#94734D] flex justify-center text-white hover:bg-[#ac865a] relative">
                        <AddOutlinedIcon fontSize='large' className="relative top-0 left-0text-white self-center"  />
                        </label>
                        <input
                        type="file"
                        id="file-upload"
                        className="input-btn"
                        hidden
                        onChange={handleImageChange}
                        />
                    </div>
                    </div>

                <h6 className="text-2xl text-gray-500 font-semibold">UserName</h6>
                <div className="mt-2">
                <TextField
                fullWidth
                placeholder="userName"
                value={state.userName ? state?.userName : ""}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, userName:e.target.value}))}
                variant="filled"
                />
                </div>
                
                <h6 className="text-2xl text-gray-500 font-semibold">Email</h6>
                <div className="mt-2">
                <TextField
                fullWidth
                placeholder="userName"
                value={state.email ? state?.email : ""}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, email:e.target.value}))}
                variant="filled"
                />
                </div>
                
                <h6 className="text-2xl text-gray-500 font-semibold">Gender</h6>
                    <div className="flex gap-2">
                    <div className="flex gap-2 mb-1">
                    <Radio
                        checked={state.gender === 'male'}
                        onChange={handleChangeEvent}
                        value="male"
                    />
                    <h6 className="text-lg font-medium self-center text-gray-400">Male</h6>
                    </div>
                    <div className="flex gap-2 mb-1">
                    <Radio
                        checked={state.gender === 'female'}
                        onChange={handleChangeEvent}
                        value="female"
                    />
                    <h6 className="text-lg font-medium self-center text-gray-400">Female</h6>
                    </div>
                    <div className="flex gap-2 mb-1">
                    <Radio
                        checked={state.gender === 'lgbtq+'}
                        onChange={handleChangeEvent}
                        value="lgbtq+"
                    />
                    <h6 className="text-lg font-medium self-center text-gray-400">lgbtq+</h6>
                    </div>

                    <div className="flex gap-2 mb-1">
                    <Radio
                        checked={state.gender === "unknow"}
                        onChange={handleChangeEvent}
                        value="unknow"
                    />
                    <h6 className="text-lg font-medium self-center text-gray-400">Unknow</h6>
                    </div>
                    </div>
                
                <button 
                type={"submit"} 
                className="w-full hover:bg-[#6a7d5b] text-white bg-[#6E845D] rounded-md px-8 py-4 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                    Update Store
                </button>
                </form>



            </div>    
            <div className="mt-8">
                <hr className="border-[1px] border-gray-500" />
                <div className=" px-8 md:px-20 mt-2 ">
                    <div className="flex justify-center gap-4">
                        <h6 className="text-4xl text-gray-500 font-semibold mt-4">Change Password</h6>
                        <AppRegistrationOutlinedIcon
                        className="mt-4"
                        fontSize="large"
                        />
                    </div>
                    
                    <div className="mt-2 pt-3 border-t-[1px] border-gray-500">
                        <h6 className="text-2xl text-gray-500 font-semibold">Current Password</h6>
                    </div>

                </div>

                <div>

                </div>
            </div>
    </>
    )
}