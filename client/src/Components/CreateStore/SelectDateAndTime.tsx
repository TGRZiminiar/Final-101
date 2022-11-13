import { Button, TextField, Divider,Grid } from '@mui/material'
import React from 'react'
import { TimeOpen } from '../../Interface/store.interface';
import { StateProps } from "../../Pages/Admin/CreateStore"
import { TimeOpenTable } from '../Table/TimeOpenTable';

interface SelectDateAndTimeProps {
    state:StateProps;
    setState:React.Dispatch<React.SetStateAction<StateProps>>;
    handleAddDate:() => void;
    handleRemoveDate:(index:number) => void;
}

export const SelectDateAndTime: React.FC<SelectDateAndTimeProps> = ({state,setState,handleAddDate,handleRemoveDate}) => {


    const handleSwapUp = (index:number) => {
        const timeOpen:TimeOpen[] = state.timeOpen;
        if(index-1 < 0){
            let temp = timeOpen[index];
            timeOpen[index] = timeOpen[timeOpen.length-1];
            timeOpen[timeOpen.length-1] = temp;
        }
        else {
            let temp = timeOpen[index];
            timeOpen[index] = timeOpen[index-1];
            timeOpen[index-1] = temp;
        }

        setState(prev => ({...prev,timeOpen:timeOpen}))
    }

    const handleSwapDown = (index:number) => {
        const timeOpen:TimeOpen[] = state.timeOpen;
        if(index+1 > timeOpen.length-1){
            let temp = timeOpen[index];
            timeOpen[index] = timeOpen[0];
            timeOpen[0] = temp;
        }
        else {
            let temp = timeOpen[index];
            timeOpen[index] = timeOpen[index+1];
            timeOpen[index+1] = temp;
        }

        setState(prev => ({...prev,timeOpen:timeOpen}))
    }

    return (
    <>
            <div className="bg-[#857F7F] text-white p-3 self-center mb-8">
                <h6 className="text-2xl font-bold">Select Date And Time Open</h6>
            </div>
        
            <div className="px-20">
            <div className="grid grid-cols-2 gap-12">
                    <div>
                        <h6 className="text-xl font-semibold ">Select Date Open</h6>
                        <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Ex. Monday"
                        value={state.date}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, date:e.target.value}))}
                        
                        />
                    </div>
                    <div>
                        <h6 className="text-xl font-semibold ">Select Time Open</h6>
                        <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Ex. 08.00-12.00"
                        value={state.timeArray}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, timeArray:e.target.value}))}
                        sx={{mb:4}}
                        />
                    </div>
                </div>

                <div className="mb-6 text-center">
                <button type={"button"} onClick={handleAddDate} className="hover:bg-[#6a7d5b] text-white bg-[#6E845D] rounded-md px-8 py-6 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                    Click To Add Date And Time Open
                </button>
                </div>
                
                <TimeOpenTable
                timeOpen={state.timeOpen}
                handleRemove={handleRemoveDate}
                title="Date Open"
                subtitle="Time Open"
                handleSwapUp={handleSwapUp}
                handleSwapDown={handleSwapDown}
                />
            </div>
    </>
    )
}