import { TextField, Select, SelectChangeEvent, MenuItem } from '@mui/material'
import React from 'react'
import { CheckBoxInterface } from '../../Interface/store.interface';
import { StateProps } from "../../Pages/Admin/CreateStore"
import { CheckBoxTable } from '../Table/CheckBoxTable';

interface CheckBoxProps {
    state:StateProps;
    setState:React.Dispatch<React.SetStateAction<StateProps>>;
    handleAddCheckBox:() => void;
    handleRemoveCheckBox:(index:number) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({state,setState,handleAddCheckBox,handleRemoveCheckBox}) => {
    
    const handleSwapUp = (index:number) => {
        const tempCheckBox:CheckBoxInterface[] = state.checkBox;
        if(index-1 < 0){
            let temp = tempCheckBox[index];
            tempCheckBox[index] = tempCheckBox[tempCheckBox.length-1];
            tempCheckBox[tempCheckBox.length-1] = temp;
        }
        else {
            let temp = tempCheckBox[index];
            tempCheckBox[index] = tempCheckBox[index-1];
            tempCheckBox[index-1] = temp;
        }

        setState(prev => ({...prev,checkBox:tempCheckBox}))
    }

    const handleSwapDown = (index:number) => {
        const tempCheckBox:CheckBoxInterface[] = state.checkBox;
        if(index+1 > tempCheckBox.length-1){
            let temp = tempCheckBox[index];
            tempCheckBox[index] = tempCheckBox[0];
            tempCheckBox[0] = temp;
        }
        else {
            let temp = tempCheckBox[index];
            tempCheckBox[index] = tempCheckBox[index+1];
            tempCheckBox[index+1] = temp;
        }

        setState(prev => ({...prev,checkBox:tempCheckBox}))
    }
    
    return (
    <>
        <div className="bg-[#857F7F] text-white p-3 self-center mb-8">
            <h6 className="text-2xl font-bold">CheckBox</h6>
        </div>
        
        <div className="px-20">
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

                <div className="my-6 text-center">
                <button type={"button"} onClick={handleAddCheckBox} className="hover:bg-[#6a7d5b] text-white bg-[#6E845D] rounded-md px-8 py-6 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                Click To Add CheckBox
                </button>
                </div>
                
                <CheckBoxTable
                datas={state.checkBox}
                handleRemove={handleRemoveCheckBox}
                title="CheckBox"
                subtitle="Time Open"
                handleSwapUp={handleSwapUp}
                handleSwapDown={handleSwapDown}
                />
        </div>
    </>
    )
}