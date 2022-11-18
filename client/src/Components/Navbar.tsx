import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { LogInLogOutUser } from "../Reducer/userReducer";
import "./Tabs/FirstIndex.css"
import { Avatar, TextField } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CottageIcon from '@mui/icons-material/Cottage';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { styled } from '@mui/material/styles';
import { SearchBox } from './SearchBox/SearchBox';



// export const SearchBox = styled(TextField)(() => ({

//     '& fieldset': {
//       borderRadius: '30px',
//     },
//     // "& .MuiFilledInput-root": {
//     //     background: "#ffffff"
//     //   }
// }));

interface StateProps {
    open:boolean;
    img:any;
    search:string;
}

export const Navbar: React.FC = () => {
    //@ts-ignore
    const user:LogInLogOutUser = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state,setState] = useState<StateProps>({
        open:false,
        img:[],
        search:""
    })

    const handleOpen = ():void => {
        setState(prev=>({...prev,open:!prev.open}));
    }
    const name = "นายชิษณุพงศ์ เจตน์อัศวภิรมย์";
   
    const onClose = () => {
        // setTimeout(() => {
        //     console.log("ON CLOSE")
        setState(prev =>({...prev,open:false}))
        // }, 50);

    }

    const handleNavigate = (e:any,location:string) => {
        // console.log("THIS IS LOCATION",location);
        (e as Event).stopPropagation();
        navigate(`/${location}`)
        setState(prev => ({...prev,open:false}));
    }

    const logout = () => {
        setState(prev=>({ ...prev, open: false }));
        Cookies.remove('access_token');
        dispatch({
          type:"LOGIN_USER",
            payload:null,
        });
        navigate('/');
        toast.success("You Have Been Logout");
    }

    console.log(user)
    return (
    <>

    <div className="bg-white   h-[7vh] text-black text-xl border-b-2 shadow-sm  w-full fixed z-50">
    <div className="flex justify-around self-center items-center bg-[#94734D]  h-[7vh] text-black text-xl border-b-2 border-[#7e6140] shadow-sm">
                <div className="cursor-pointer" onClick={() => navigate("/")}>
                    <h6>LOGO</h6>
                </div>

                <div>
                {/* <SearchBox
                        placeholder="Search By Address Or Location"
                        fullWidth
                        className='rounded-md '
                        InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlinedIcon />
                        </InputAdornment>
                        ),
                        }}
                        variant="outlined"
                    />  */}
                    <SearchBox
                    value={state.search}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev,search:e.target.value}))}

                    />
                </div>

                <div className="flex gap-4 md:gap-8">
                

                

                {user ? 
                <div className="relative" onClick={handleOpen}  tabIndex={0} onBlur={onClose}>
                <div className="bg-white flex border-2 rounded-3xl gap-4 p-1  max-h-[5vh]" >
                    <div className="max-w-[2rem] cursor-pointer">
                        <img src={user.userImage ? user.userImage : "https://www.w3schools.com/howto/img_avatar.png"} className="rounded-full w-full h-full" />
                    </div>
                    <div className="self-center text-base font-bold cursor-pointer pr-2">
                        {user.userName.length > 15 ? (`${user.userName.substring(0,15)}...`) : user.userName}
                    </div>
                    
                </div>


           {state.open && 
            <div className="absolute border-[1px] border-gray-700 bg-white shadow-xl drop-shadow-lg w-[180%] h-auto top-[5vh]  z-50 transform-center min-w-[15rem]"   >
            <div className="grid">
                <div className="flex gap-2 hover:bg-slate-50 p-2 border-b-[1px] border-gray-700">
                    <div className="w-[4rem] h-[4rem]">
                        <img
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        className="rounded-full w-full h-full"
                        />
                    </div>
                    <h6 className="text-lg self-center font-semibold">{user.userName.length > 35 ? (`${user.userName.substring(0,35)}...`) : user.userName}</h6>
                </div>

                <div className="px-2 mt-2 pb-2 w-full ">
                    <button 
                    className="bg-sky-200 hover:bg-sky-300 text-blue-600 transition-colors w-full py-2 rounded-xl text-base"
                    onClick={(e:any) => handleNavigate(e,`user/${user.userId}?tab=edit`)}
                    >View Profile</button>
                </div>

                {user && user.role === "admin" && 
                <div 
                className="flex gap-4 px-2 pb-2 pt-4 w-full  hover:bg-slate-50  border-b-[1px] border-gray-200 cursor-pointer hover:underline" 
                onClick={(e:any) => {
                    e.stopPropagation()
                    navigate("/admin")
                    setState(prev => ({...prev,open:false}))
                }}
                >
                    <SupervisorAccountOutlinedIcon className="self-center text-[#6E845D]"/>
                    <h6 className="self-center ">Admin</h6>
                </div>      
                }
                <div 
                className="flex gap-4 px-2 pb-2 pt-4 w-full  hover:bg-slate-50  border-b-[1px] border-gray-200 cursor-pointer hover:underline" 
                onClick={(e:any) => handleNavigate(e,"")}
                >
                    <CottageIcon className="self-center text-[#6E845D]"/>
                    <h6 className="self-center ">Home Page</h6>
                </div>
                <div 
                className="flex gap-4 px-2 pb-2 pt-4 w-full  hover:bg-slate-50  border-b-[1px] border-gray-200 cursor-pointer hover:underline" 
                onClick={(e:any) => handleNavigate(e,`user/${user.userId}?tab=edit`)}
                >
                    <AssignmentIndIcon className="self-center text-[#6E845D]"/>
                    <h6 className="self-center ">Edit Profile</h6>
                </div>
                <div 
                className="flex gap-4 px-2 pb-2 pt-4 w-full  hover:bg-slate-50  border-b-[1px] border-gray-200 cursor-pointer hover:underline" 
                onClick={(e:any) => handleNavigate(e,`user/${user.userId}?tab=edit`)}
                >
                    <VpnKeyRoundedIcon className="self-center text-[#6E845D]"/>
                    <h6 className="self-center ">Change Password</h6>
                </div>
                <div 
                className="flex gap-4 px-2 pb-2 pt-4 w-full  hover:bg-slate-50  border-b-[1px] border-gray-200 cursor-pointer hover:underline" 
                onClick={(e:any) => handleNavigate(e,`user/${user.userId}?tab=bookMark`)}
                >
                    <BookmarksRoundedIcon className="self-center text-[#6E845D]"/>
                    <h6 className="self-center ">Book Mark</h6>
                </div>
                <hr className=" border-t-[1px] border-gray-700"/>
                <div className="flex gap-4 px-2 pb-2 pt-4 w-full  hover:bg-slate-50  border-b-[1px] border-gray-200 cursor-pointer" onClick={() => logout()}>
                    <LogoutRoundedIcon className="self-center text-black"/>
                    <h6 className="self-center text-gray-400 text-lg font-semibold">Logout</h6>
                </div>

               {/* {user && user.role === "admin" && 
                <div className="flex pt-4 border-b-2 hover:bg-slate-200 justify-evenly cursor-pointer" onClick={e => {
                    e.stopPropagation()
                    navigate("/admin")
                    setState(prev => ({...prev,open:false}))
                     }} >
                        <div className="flex gap-4 self-center place-items-center" >
                        <SupervisorAccountOutlinedIcon/>
                        <h6>Admin</h6>
                        </div>
                        <div/>
                    </div>
               } */}
               {/*  <div className="flex border-b-2 pt-4 hover:bg-slate-200 justify-evenly cursor-pointer" onClick={e => {
                e.stopPropagation()
                navigate(`/user/${user.userId}`)
                setState(prev => ({...prev,open:false}))
                 }} >
                    <div className="flex gap-4 self-center place-items-center" >
                    <SupervisorAccountOutlinedIcon/>
                    <h6>User</h6>
                    </div>
                    <div/>
                </div> */}
            </div>
        </div>
           }
            </div>

            :

            <div className="flex gap-4">
                <div>
                    <button className="bg-[#CCAF63] p-2 rounded-xl flex gap-2 text-white shadow-sm hover:shadow-md hover:bg-[#c0a35b]" onClick={() => navigate("/login")}>
                        <LoginRoundedIcon className="self-center "/>
                        <h6 className="self-center ">LogIn</h6>
                    </button>
                </div>
                
                <div>
                    <button className="bg-gray-400 p-2 rounded-xl flex gap-2 text-white shadow-sm hover:shadow-md hover:bg-slate-400" onClick={() => navigate("/register")}>
                        <AppRegistrationRoundedIcon className="self-center"/>
                        <h6 className="self-center">Register</h6>
                    </button>
                </div>

            </div>
                    
                }

                </div>
            </div>
        </div>
    </>
    )
}