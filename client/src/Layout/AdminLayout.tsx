import React from 'react'
import { Outlet } from "react-router-dom";
import { Admin } from '../Pages/Admin';



export const AdminLayout: React.FC = () => {
    return (
    <>
    <div className="flex relative">
        <Admin/>
        <Outlet/>
    </div>
    </>
    )
}