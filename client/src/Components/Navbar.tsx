import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({}) => {
   
    const [state,setState] = useState({
        open:false,
        img:[],
    })
    const handleOpen = ():void => {
        setState(prev=>({...prev,open:!prev.open}));
    }
    const name = "นายชิษณุพงศ์ เจตน์อัศวภิรมย์";
   
    const onClose = () => {
        setTimeout(() => {
            console.log("ON CLOSE")
            setState(prev =>({...prev,open:false}))
        }, 50);

    }
    return (
    <>
    <div className="bg-white  h-[7vh] text-black text-xl border-b-2 shadow-sm  w-full">
    <div className="flex justify-around self-center items-center bg-white  h-[7vh] text-black text-xl border-b-2 shadow-sm">
                <div>
                    <h6>LOGO</h6>
                </div>
                <div className="flex gap-4 md:gap-8">
                    <div className="hidden">
                    <MenuOutlinedIcon />
                    </div>

                <div className="  relative" >
               
                    <div className="flex border-2 rounded-3xl gap-4 p-1  max-h-[5vh]" onClick={handleOpen} onBlur={onClose} tabIndex={0}>
                        <div className="max-w-[2rem] cursor-pointer">
                            <img src="https://www.w3schools.com/howto/img_avatar.png" className="rounded-full w-full h-full" />
                        </div>
                        <div className="self-center text-base font-bold cursor-pointer">
                            {name.length > 15 ? (`${name.substring(0,15)}...`) : name}
                        </div>
                    </div>

               {state.open && 
                <div className="absolute bg-white shadow-xl drop-shadow-lg w-full h-[20rem] left-0 top-[5vh] p-2">
                <div className="grid">
                    <div className="flex border-b-2 hover:bg-slate-200 justify-evenly cursor-pointer">
                        <div className="flex gap-4 selfe-center place-items-center">
                        <SupervisorAccountOutlinedIcon/>
                        <h6><Link to="/admin">Admin</Link></h6>
                        </div>
                        <div/>
                    </div>
                </div>
            </div>
               }
                </div>

                </div>
            </div>
        </div>
    </>
    )
}