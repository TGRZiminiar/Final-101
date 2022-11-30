import React,{useEffect, useState} from 'react'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import "./Admin.css"
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Link } from 'react-router-dom';
import Drawer from '../Components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { LogInLogOutUser } from '../Reducer/userReducer';

export const Admin: React.FC = () => {
    const dispatch = useDispatch();
    const [open,setOpen] = useState(true)
    //@ts-ignore
    const user:LogInLogOutUser = useSelector(state => state.user);



    const handleShowMenu = () => {
        setOpen(prev => (!prev))
    }
    

    useEffect(() => {
        if(open){
            dispatch({
                type:"OPEN",
                payload:{
                    drawer:true,
                },
            })  
        }
        else {
            dispatch({
                type:"CLOSE",
                payload:{
                    drawer:false,
                },
            })  
        }

    }, [open])
    


    return (
        <>

        <div className="fixed w-full h-[5rem] bg-[#c0986a] text-white p-8 z-50 ">
                <div className="flex text-2xl items-center my-auto h-full gap-4 cursor-pointer">
                    <MenuOutlinedIcon className="cursor-pointer self-center" onClick={handleShowMenu}/>
                    <Link to="/">
                            <h6>Guide Your meals</h6>
                    </Link>
                </div>
        </div>


        <Drawer anchor='left' open={open} >
           <div className="mt-[3rem]">
                 {/* Show Admin Info */}
            <div className="bg-[#D9D9D9]  w-full p">
                <div className="h-auto flex p-8 gap-4 justify-evenly">
                    <div className="w-[4rem] h-[4rem]">
                    <img src={user?.userImage} className="rounded-full w-full h-full" />
                    </div>
                    <div className="grid">
                        <h6 className="text-black text-xl capitalize">{user?.userName}</h6>
                        <h6 className="text-gray-500 text-lg">Admin</h6>
                    </div>
                </div>
            </div>
            {/* END Show Admin Info */}

            <div className="text-black grid ">

            <div className="flex justify-around py-4 hover:bg-[#cfa576] cursor-pointer">
                <DashboardOutlinedIcon fontSize='large'  />
                <h6 className="self-center">DashBoard</h6>
            </div>
            <hr className="border-1 border-black"/>
            
            <Link to="/admin/create-category">
            <div className="flex justify-around py-4 hover:bg-[#cfa576] cursor-pointer">
                <CategoryOutlinedIcon fontSize='large'  />
                <h6 className="self-center">Create Category</h6>
            </div>
            </Link>
            <hr className="border-1 border-black"/>
           
            <Link to="/admin/create-store">
            <div className="flex justify-around py-4 hover:bg-[#cfa576] cursor-pointer">
                <AddBusinessOutlinedIcon fontSize='large'  />
                <h6 className="self-center">Create Store</h6>
            </div>
            </Link>
            <hr className="border-1 border-black"/>
            
            <Link to="/admin/get-store">
            <div className="flex justify-around py-4 hover:bg-[#cfa576] cursor-pointer">
                <StorefrontOutlinedIcon fontSize='large'  />
                <h6 className="self-center">See All Store</h6>
            </div>
            </Link>
            <hr className="border-1 border-black"/>
           
           
          
            </div>
           </div>
        </Drawer>

        </>
    )

}