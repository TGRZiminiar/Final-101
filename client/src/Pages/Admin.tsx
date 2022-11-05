import React from 'react'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import "./Admin.css"
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Link } from 'react-router-dom';


export const Admin: React.FC = () => {
   
    

    // const handleShowMenu = () => {
    //     const elem = document.getElementById("sidebar");
    //     if(!String(elem?.classList).includes("hidden")){
    //         elem?.classList.add("hidden");
    //         return;
    //     }
    //     else {
    //         elem?.classList.remove("hidden");
    //         return;
    //     }
    // }
   
    const arr = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,4,5,6,7,8,9]

    return (
        <div id="sidebar" className="hidden md:block bg-gray-800 w-[15rem] fixed h-full left-0 overflow-y-auto">
            {/* Show Admin Info */}
            <div className="bg-gray-900  w-full ">
                <div className="h-auto flex p-[1rem] gap-4 justify-evenly">
                    <div className="w-[4rem] h-[4rem]">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" className="rounded-full w-full h-full" />
                    </div>
                    <div className="grid">
                        <h6 className="text-white">UserName</h6>
                        <h6 className="text-gray-500">Admin</h6>
                    </div>
                </div>
            </div>
            {/* END Show Admin Info */}

            <div className="text-white grid ">

            <div className="flex justify-around py-4 hover:bg-blue-700 cursor-pointer">
                <DashboardOutlinedIcon fontSize='large'  />
                <h6 className="self-center">DashBoard</h6>
            </div>
            <hr/>
            
            <Link to="/admin/create-category">
            <div className="flex justify-around py-4 hover:bg-blue-700 cursor-pointer">
                <CategoryOutlinedIcon fontSize='large'  />
                <h6 className="self-center">Create Category</h6>
            </div>
            </Link>
            <hr/>
           
            <Link to="/admin/create-store">
            <div className="flex justify-around py-4 hover:bg-blue-700 cursor-pointer">
                <AddBusinessOutlinedIcon fontSize='large'  />
                <h6 className="self-center">Create Store</h6>
            </div>
            </Link>
            <hr/>
            
            <Link to="/admin/get-store">
            <div className="flex justify-around py-4 hover:bg-blue-700 cursor-pointer">
                <StorefrontOutlinedIcon fontSize='large'  />
                <h6 className="self-center">See All Store</h6>
            </div>
            </Link>
            <hr/>
           
           
          
            </div>

            {/* {arr.map((a,i)=>(
            <>
            <div className="text-white grid place-content-center hover:bg-blue-700">
            <div className="flex gap-4 px-4 my-4">
            <DashboardOutlinedIcon fontSize='large'  />
            <h6>DashBoard{i}</h6>
            </div>
        </div>
        <hr/>
            </>
        ))} */}
        </div>
    )

}