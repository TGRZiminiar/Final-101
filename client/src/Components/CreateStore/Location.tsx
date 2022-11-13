import { Button, TextField, Divider } from '@mui/material'
import React from 'react'
import { StateProps } from "../../Pages/Admin/CreateStore"
import { TimeOpenTable } from '../Table/TimeOpenTable';

interface LocationProps {
    state:StateProps;
    setState:React.Dispatch<React.SetStateAction<StateProps>>;
}

export const Location: React.FC<LocationProps> = ({state,setState}) => {
    return (
    <>
            <div className="bg-[#857F7F] text-white p-3 self-center mb-8">
                <h6 className="text-2xl font-bold">Choose Location Of Store</h6>
            </div>
            
            <div className="px-20">
            <div className="grid grid-cols-2 gap-12">
                    <div>

                    <h6 className="text-xl font-semibold mb-1">Text To Display Link</h6>
                    <TextField
                    fullWidth
                    variant="filled"
                    placeholder="Text To Display Link"
                    value={state.textLocation}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, textLocation:e.target.value}))}
                    />
                    </div>
                    <div>
                        <h6 className="text-xl font-semibold mb-1">Link To Navigate</h6>
                        <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Link To Navigate"
                        value={state.link}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, link:e.target.value}))}
                        />
                    </div>
                </div>
                <div className="rounded-3xl bg-[#B57B5A] p-4 text-white mt-4">
                <h6>
                1.Share a map or location
                On your computer, open Google Maps.
                <br/>
                2. Go to the directions, map, or Street View image you want to share.
                On the top left, click Menu Menu.
                <br/>
                3.Select Share or embed map. If you don't see this option, click Link to this map.
                4.Optional: To create a shorter web page link, check the box next to "Short URL."
                <br/>
                5.Copy and paste the link wherever you want to share the map.
                </h6>
                </div>
               
                <div className="mt-8">
                    <h6 className="text-xl font-semibold ">Select Range Price</h6>
                    <TextField
                    fullWidth
                    variant="filled"
                    placeholder="Ex. 1000 - 2000 Baht"
                    value={state.rangePrice}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, rangePrice:e.target.value}))}
                    sx={{mb:4}}
                    />
                </div>
              
                <div className="mt-8">
                    <h6 className="text-xl font-semibold ">Select SeatNumber</h6>
                    <TextField
                    fullWidth
                    variant="filled"
                    placeholder="Ex. 16"
                    value={state.seatNumber}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, seatNumber:Number(e.target.value)}))}
                    sx={{mb:4}}
                    />
                </div>
            </div>

    </>
    )
}