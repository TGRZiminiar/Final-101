import React from 'react'
import { Outlet } from "react-router-dom";
import { Navbar } from '../Components/Navbar';


export const UserLayout: React.FC = () => {
    return (
    <>
    <div className="relative">
        <Navbar/>
       
        <div className="mb-[7rem]">
        <Outlet/>
        </div>
       
    </div>
    </>
    )
}