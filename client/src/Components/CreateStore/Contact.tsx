import { Button, TextField, Divider, Select, SelectChangeEvent, MenuItem } from '@mui/material'
import React from 'react'
import { ContactInterface } from '../../Interface/store.interface';
import { StateProps } from "../../Pages/Admin/CreateStore"
import { ContactTable } from '../Table/ContactTable';

interface ContactProps {
    state:StateProps;
    setState:React.Dispatch<React.SetStateAction<StateProps>>;
    handleAddContact:() => void;
    handleRemoveContact:(index:number) => void;
}

export const Contact: React.FC<ContactProps> = ({state,setState,handleAddContact,handleRemoveContact}) => {
    
    const handleSwapUp = (index:number) => {
        const tempContact:ContactInterface[] = state.contact;
        if(index-1 < 0){
            let temp = tempContact[index];
            tempContact[index] = tempContact[tempContact.length-1];
            tempContact[tempContact.length-1] = temp;
        }
        else {
            let temp = tempContact[index];
            tempContact[index] = tempContact[index-1];
            tempContact[index-1] = temp;
        }

        setState(prev => ({...prev,contact:tempContact}))
    }

    const handleSwapDown = (index:number) => {
        const tempContact:ContactInterface[] = state.contact;
        if(index+1 > tempContact.length-1){
            let temp = tempContact[index];
            tempContact[index] = tempContact[0];
            tempContact[0] = temp;
        }
        else {
            let temp = tempContact[index];
            tempContact[index] = tempContact[index+1];
            tempContact[index+1] = temp;
        }

        setState(prev => ({...prev,contact:tempContact}))
    }

    
    return (
    <>
        <div className="bg-[#857F7F] text-white p-3 self-center mb-8">
            <h6 className="text-2xl font-bold">Contact</h6>
        </div>
        
        <div className="px-20">
        <div className="grid grid-cols-2 gap-12">
                    <div>
                        <h6 className="text-xl font-semibold ">PlatForm</h6>
                        <Select
                            value={state.platform}
                            label="PlatForm"
                            onChange={(e:SelectChangeEvent) => setState(prev => ({...prev,platform:e.target.value}))}
                            fullWidth
                            placeholder='Facebook / Line / Instagram / Phone'
                        >
                            <MenuItem value={"Facebook"}>Facebook</MenuItem>
                            <MenuItem value={"Line"}>Line</MenuItem>
                            <MenuItem value={"Instagram"}>Instagram</MenuItem>
                            <MenuItem value={"Phone"}>Phone</MenuItem>
                        </Select>
                    </div>
                    <div>
                        <h6 className="text-xl font-semibold ">Link</h6>
                        <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Ex. http://facebook.com"
                        value={state.linkPlatform}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, linkPlatform:e.target.value}))}
                        
                        />
                    </div>
                </div>

                <div className="my-6 text-center">
                    <button type={"button"} onClick={handleAddContact} className="hover:bg-[#6a7d5b] text-white bg-[#6E845D] rounded-md px-8 py-6 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                        Click To Add Contact
                    </button>
                </div>
                
                <ContactTable
                datas={state.contact}
                handleRemove={handleRemoveContact}
                title="Platform"
                subtitle="Link"
                handleSwapUp={handleSwapUp}
                handleSwapDown={handleSwapDown}
                />
        </div>
    </>
    )
}