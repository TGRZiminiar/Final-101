import { Button, TextField, Divider, Select, SelectChangeEvent, MenuItem } from '@mui/material'
import React from 'react'
import { StateProps } from "../../Pages/Admin/CreateStore"
import { ContactTable } from '../Table/ContactTable';

interface ContactProps {
    state:StateProps;
    setState:React.Dispatch<React.SetStateAction<StateProps>>;
    handleAddContact:() => void;
    handleRemoveContact:(index:number) => void;
}

export const Contact: React.FC<ContactProps> = ({state,setState,handleAddContact,handleRemoveContact}) => {
    return (
    <>
             <h6 className="text-2xl font-bold mb-2">Contact</h6>
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

                <div className="my-6">
                <Button variant="contained" className="rounded-lg" onClick={handleAddContact}>
                    Click To Add Contact
                </Button>
                </div>
                
                <ContactTable
                datas={state.contact}
                handleRemove={handleRemoveContact}
                title="Platform"
                subtitle="Link"
                />
    </>
    )
}