import { Button, TextField, Divider, Select, SelectChangeEvent, MenuItem } from '@mui/material'
import React from 'react'
import { StateProps } from "../../Pages/Admin/CreateStore"
import { CheckBoxTable } from '../Table/CheckBoxTable';

interface CheckBoxProps {
    state:StateProps;
    setState:React.Dispatch<React.SetStateAction<StateProps>>;
    handleAddCheckBox:() => void;
    handleRemoveCheckBox:(index:number) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({state,setState,handleAddCheckBox,handleRemoveCheckBox}) => {
    return (
    <>
             <h6 className="text-2xl font-bold mb-2">CheckBox</h6>
                <div className="grid grid-cols-2 gap-12">
                    <div>
                        <h6 className="text-xl font-semibold ">Text After CheckBox</h6>
                        <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Ex. Parking"
                        value={state.textCheckBox}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, textCheckBox:e.target.value}))}
                        
                        />
                    </div>
                    <div>
                        <h6 className="text-xl font-semibold ">Boolean For CheckBox</h6>
                        <Select
                            value={state.boolCheck}
                            label="Age"
                            onChange={(e:SelectChangeEvent) => setState(prev => ({...prev,boolCheck:e.target.value}))}
                            fullWidth
                            placeholder='True / False'
                        >
                            <MenuItem value={"true"}>True</MenuItem>
                            <MenuItem value={"false"}>False</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className="my-6">
                <Button variant="contained" className="rounded-lg" onClick={handleAddCheckBox}>
                    Click To Add CheckBox
                </Button>
                </div>
                
                <CheckBoxTable
                datas={state.checkBox}
                handleRemove={handleRemoveCheckBox}
                title="CheckBox"
                subtitle="Time Open"
                />
    </>
    )
}