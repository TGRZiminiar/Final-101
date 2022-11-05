import { Button, TextField, Divider } from '@mui/material'
import React from 'react'
import { StateProps } from "../../Pages/Admin/CreateStore"
import { TimeOpenTable } from '../Table/TimeOpenTable';

interface SelectDateAndTimeDeliveryProps {
    state:StateProps;
    setState:React.Dispatch<React.SetStateAction<StateProps>>;
    handleAddDateDelivery:() => void;
    handleRemoveDelivery:(index:number) => void;
}

export const SelectDateAndTimeDelivery: React.FC<SelectDateAndTimeDeliveryProps> = ({state,setState,handleAddDateDelivery,handleRemoveDelivery}) => {
    return (
    <>
            <h6 className="text-2xl font-bold mb-2">Select Date And Time Delivery</h6>
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

                    <div className="mb-6">
                    <Button variant="contained" className="rounded-lg" onClick={handleAddDateDelivery}>
                        Click To Add Date And Time Delivery
                    </Button>
                   
                    </div>
                    
                    <TimeOpenTable
                    timeOpen={state.timeOpenDelivery}
                    handleRemove={handleRemoveDelivery}
                    title="Date Delivery"
                    subtitle="Time Open"
                    />

    </>
    )
}