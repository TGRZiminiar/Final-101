import { Button, TextField } from '@mui/material';
import React from 'react'
import { StateProps } from '../../Pages/Admin/CreateStore';
import { MenuList } from "../../Interface/store.interface"
import { MenuTable } from '../Table/MenuTable';
interface MenuProps {
    state:StateProps;
    setState:React.Dispatch<React.SetStateAction<StateProps>>;
    handleAddMenu:() => void;
    handleRemoveMenu:(index:number) => void;
}

export const Menu: React.FC<MenuProps> = ({state,setState,handleAddMenu,handleRemoveMenu}) => {
    
    const handleSwapUp = (index:number) => {
        const tempMenu:MenuList[] = state.menu;
        if(index-1 < 0){
            let temp = tempMenu[index];
            tempMenu[index] = tempMenu[tempMenu.length-1];
            tempMenu[tempMenu.length-1] = temp;
        }
        else {
            let temp = tempMenu[index];
            tempMenu[index] = tempMenu[index-1];
            tempMenu[index-1] = temp;
        }

        setState(prev => ({...prev,menu:tempMenu}))
    }

    const handleSwapDown = (index:number) => {
        const tempMenu:MenuList[] = state.menu;
        if(index+1 > tempMenu.length-1){
            let temp = tempMenu[index];
            tempMenu[index] = tempMenu[0];
            tempMenu[0] = temp;
        }
        else {
            let temp = tempMenu[index];
            tempMenu[index] = tempMenu[index+1];
            tempMenu[index+1] = temp;
        }

        setState(prev => ({...prev,menu:tempMenu}))
    }
    
    return (
    <>
         <div className="bg-[#857F7F] text-white p-3 self-center mb-8">
            <h6 className="text-2xl font-bold">Add Menu</h6>
         </div>
            
        <div className="px-20">
        <div className="grid grid-cols-2 gap-12">
                    <div>
                        <h6 className="text-xl font-semibold ">Menu Name</h6>
                        <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Ex. Fried rice"
                        value={state.text}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, text:e.target.value}))}
                        
                        />
                    </div>
                    <div>
                        <h6 className="text-xl font-semibold ">Price</h6>
                        <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        placeholder="Ex. 08.00-12.00"
                        value={state.price}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, price:Number(e.target.value)}))}
                        sx={{mb:4}}
                        />
                    </div>
                </div>

                <div className="mb-6 text-center">
                <button type={"button"} onClick={handleAddMenu} className="hover:bg-[#6a7d5b] text-white bg-[#6E845D] rounded-md px-8 py-6 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                    Click To Add Menu To Store
                </button>
                
                </div>
                
                <MenuTable
                datas={state.menu}
                handleRemoveMenu={handleRemoveMenu}
                title="Menu Name"
                subtitle="Menu Price"
                handleSwapUp={handleSwapUp}
                handleSwapDown={handleSwapDown}
                />
        </div>
    </>
    )
}