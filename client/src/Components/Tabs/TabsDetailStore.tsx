import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FirstIndex } from './FirstIndex';
import "./TabsDetailStore.css"
import { SecondIndex } from './SecondIndex';
import { ThirdIndex } from './ThirdIndex';

interface TabsDetailStoreProps {
    value:number;
    handleChange:(newValue:number) => void;
}

export const TabsDetailStore: React.FC<TabsDetailStoreProps> = ({value, handleChange}) => {


    // const returnHidden = () => {
    //     setTimeout(() => {
    //         return "hidden"
    //     }, 100);
    // }

    const [subState,setSubState] = useState({
        string:"hidden"
    })

    function x() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('done!');
          });
        });
     }
     
    x()
    .then(res => console.log("res"))

   

    return (
    <>
        <div className="w-full grid grid-cols-3 bg-[#6F5242] text-white text-2xl text-center ">
            <div className={`cursor-pointer p-2 md:p-4 ${value === 0 && "bg-[#926E44]"} hover:bg-[#856d51]`} onClick={() => handleChange(0)}>
                Information
            </div>
            <div className={`cursor-pointer p-2 border-x-2 md:p-4 ${value === 1 && "bg-[#926E44]"} hover:bg-[#856d51]`} onClick={() => handleChange(1)}>
                Menu
            </div>
            <div className={`cursor-pointer p-2 md:p-4 ${value === 2 && "bg-[#926E44]"} hover:bg-[#856d51]`} onClick={() => handleChange(2)}>
                Review
            </div>
        </div>
        
        <div className="p-8 md:p-12">

        <div className={`w-full`} 
        style={value === 0 ? {visibility:"visible",opacity:1,transition:"visibility 0.3s linear,opacity 0.3s linear"} : {visibility:"hidden", opacity:0, transition:"visibility 0.3s linear,opacity 0.3s linear",display:"none"}}
       
        >
            <FirstIndex/>
        </div>
        
        <div className={`w-full`} 
        style={value === 1 ? {visibility:"visible",opacity:1,transition:"visibility 0.3s linear,opacity 0.3s linear"} : {visibility:"hidden", opacity:0, transition:"visibility 0.3s linear,opacity 0.3s linear",display:"none"}}
        >
            <SecondIndex/>
        </div>
        
        <div className={`w-full`} 
        style={value === 2 ? {visibility:"visible",opacity:1,transition:"visibility 0.3s linear,opacity 0.3s linear"} : {visibility:"hidden", opacity:0, transition:"visibility 0.3s linear,opacity 0.3s linear",display:"none"}}
        
        >
            <ThirdIndex/>
        </div>

        </div>
    </>
    )
}