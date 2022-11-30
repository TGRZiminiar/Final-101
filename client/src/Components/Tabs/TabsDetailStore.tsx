import React, { useEffect, useState } from 'react'
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
    setState:React.Dispatch<React.SetStateAction<SingleStateProps>>;
}

export interface TabsDetailState {
    store:SingleStoreInterface | null;
}

export const TabsDetailStore: React.FC<TabsDetailStoreProps> = ({state, handleChange, storeId,setState}) => {


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
        
        <div className="">

        <div className={`w-full ${value === 0 ? "shown" : "hide"}`} 
       
        >
            {state.store && <FirstIndex state={state}/>}
        </div>
        
        <div className={`w-full ${value === 1 ? "shown" : "hide"}`} 
        >
            {state.store && <SecondIndex state={state} />}
        </div>
        
        <div className={`w-full ${value === 2 ? "shown" : "hide"}`} 
        
        >
            {state.store && <ThirdIndex state={state} storeId={storeId} setState={setState}  />}
        </div>

        </div>
    </>
    )
}

