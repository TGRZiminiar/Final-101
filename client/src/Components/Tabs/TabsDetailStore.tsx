import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FirstIndex } from './FirstIndex';
import "./TabsDetailStore.css"
import { SecondIndex } from './SecondIndex';
import { ThirdIndex } from './ThirdIndex';

import { SingleStateProps } from '../../Pages/User/SingleStore';
import { SingleStoreInterface } from '../../Interface/store.interface';

interface TabsDetailStoreProps {
    state:SingleStateProps;
    handleChange:(newValue:number) => void;
    storeId:string;
}

export interface TabsDetailState {
    store:SingleStoreInterface | null;
}

export const TabsDetailStore: React.FC<TabsDetailStoreProps> = ({state, handleChange, storeId}) => {


    const { value } = state;


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
            {state.store && <FirstIndex state={state}/>}
        </div>
        
        <div className={`w-full`} 
        style={value === 1 ? {visibility:"visible",opacity:1,transition:"visibility 0.3s linear,opacity 0.3s linear"} : {visibility:"hidden", opacity:0, transition:"visibility 0.3s linear,opacity 0.3s linear",display:"none"}}
        >
            {state.store && <SecondIndex state={state} />}
        </div>
        
        <div className={`w-full`} 
        style={value === 2 ? {visibility:"visible",opacity:1,transition:"visibility 0.3s linear,opacity 0.3s linear"} : {visibility:"hidden", opacity:0, transition:"visibility 0.3s linear,opacity 0.3s linear",display:"none"}}
        
        >
            {state.store && <ThirdIndex state={state} storeId={storeId} />}
        </div>

        </div>
    </>
    )
}

