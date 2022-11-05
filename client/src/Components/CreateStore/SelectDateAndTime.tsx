import { Button, TextField, Divider } from '@mui/material'
import React from 'react'
import { StateProps } from "../../Pages/Admin/CreateStore"
import { TimeOpenTable } from '../Table/TimeOpenTable';

interface SelectDateAndTimeProps {
    state:StateProps;
    setState:React.Dispatch<React.SetStateAction<StateProps>>;
    handleAddDate:() => void;
    handleRemoveDate:(index:number) => void;
}

export const SelectDateAndTime: React.FC<SelectDateAndTimeProps> = ({state,setState,handleAddDate,handleRemoveDate}) => {
    return (
    <>
    <h6 className="text-2xl font-bold mb-2">Select Date And Time Open</h6>
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

                <div className="mb-6">
                <Button variant="contained" className="rounded-lg" onClick={handleAddDate}>
                    Click To Add Date And Time Open
                </Button>
                </div>
                
                <TimeOpenTable
                timeOpen={state.timeOpen}
                handleRemove={handleRemoveDate}
                title="Date Open"
                subtitle="Time Open"
                />
                <Divider/>
    </>
    )
}