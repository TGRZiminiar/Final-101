import { Button, TextField, Divider } from '@mui/material'
import React from 'react'
import { TimeOpenDelivery } from '../../Interface/store.interface';
import { StateProps } from "../../Pages/Admin/UpdateStore"
import { TimeOpenTable } from '../Table/TimeOpenTable';
import { TimeOpenDeliveryTable } from '../Table/TimeOpenTableDelivery';


interface SelectDateAndTimeDeliveryProps {
    state:StateProps;
    setState:React.Dispatch<React.SetStateAction<StateProps>>;
    handleAddDateDelivery:() => void;
    handleRemoveDelivery:(index:number) => void;
}

export const SelectDateAndTimeDelivery: React.FC<SelectDateAndTimeDeliveryProps> = ({state,setState,handleAddDateDelivery,handleRemoveDelivery}) => {
   
   
    const handleSwapUp = (index:number) => {
        const timeOpenDelivery:TimeOpenDelivery[] = state.timeOpenDelivery;
        if(index-1 < 0){
            let temp = timeOpenDelivery[index];
            timeOpenDelivery[index] = timeOpenDelivery[timeOpenDelivery.length-1];
            timeOpenDelivery[timeOpenDelivery.length-1] = temp;
        }
        else {
            let temp = timeOpenDelivery[index];
            timeOpenDelivery[index] = timeOpenDelivery[index-1];
            timeOpenDelivery[index-1] = temp;
        }

        setState(prev => ({...prev,timeOpenDelivery:timeOpenDelivery}))
    }

    const handleSwapDown = (index:number) => {
        const timeOpenDelivery:TimeOpenDelivery[] = state.timeOpenDelivery;
        if(index+1 > timeOpenDelivery.length-1){
            let temp = timeOpenDelivery[index];
            timeOpenDelivery[index] = timeOpenDelivery[0];
            timeOpenDelivery[0] = temp;
        }
        else {
            let temp = timeOpenDelivery[index];
            timeOpenDelivery[index] = timeOpenDelivery[index+1];
            timeOpenDelivery[index+1] = temp;
        }

        setState(prev => ({...prev,timeOpenDelivery:timeOpenDelivery}))
    }
   
    return (
    <>
        <div className="bg-[#857F7F] text-white p-3 self-center mb-8">
            <h6 className="text-2xl font-bold">Select Date And Time Delivery</h6>
        </div>
        
        <div className="px-20">
        <div className="grid grid-cols-2 gap-12">
                        <div>
                            <h6 className="text-xl font-semibold ">Select Date Delivery </h6>
                            <TextField
                            fullWidth
                            variant="filled"
                            placeholder="Ex. Monday"
                            value={state.dateDelivery}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, dateDelivery:e.target.value}))}
                            
                            />
                        </div>
                    <div className="">
                        <h6 className="text-xl font-semibold ">Select Time Delivery</h6>
                        <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Ex. 08.00 - 12.00"
                        value={state.timeArrayDelivery}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, timeArrayDelivery:e.target.value}))}
                        sx={{mb:4}}
                        />
                    </div>

                    </div>

                    <div className="mb-6 text-center">
                    <button type={"button"} onClick={handleAddDateDelivery} className="hover:bg-[#6a7d5b] text-white bg-[#6E845D] rounded-md px-8 py-6 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                        Click To Add Date And Time Delivery
                    </button>
                   
                    </div>
                    
                    <TimeOpenDeliveryTable
                    timeOpen={state.timeOpenDelivery}
                    handleRemove={handleRemoveDelivery}
                    title="Date Delivery"
                    subtitle="Time Open"
                    handleSwapUp={handleSwapUp}
                    handleSwapDown={handleSwapDown}
                    />
        </div>

    </>
    )
}