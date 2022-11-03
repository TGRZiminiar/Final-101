import { Grid, Select, TextField, Typography, MenuItem, SelectChangeEvent,Autocomplete, Button, Divider } from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { ListAllCategory } from "../../Function/category.func"
import { AxiosError } from "axios";
import {toast} from "react-toastify";
import { TimeOpenTable } from '../../Components/Table/TimeOpenTable';
import { PostCreateStore } from '../../Function/store.func';

type SingleCategory = {
    _id:string;
    name:string;
}

export interface TimeOpen {
    date:string;
    time:string;
}

interface StateProps {
    name:string;
    category:SingleCategory[] | null;
    categories:SingleCategory[],
    tags:string[],
    textLocation:string;   
    link:string;
    date:string;
    timeArray:string;
    temp:string;
    timeOpen:TimeOpen[];
    index:number;
    dateDelivery:string;
    timeArrayDelivery:string;
    tempDelivery:string;
    timeOpenDelivery:TimeOpen[];
    rangePrice:string;
}

export const CreateStore: React.FC = () => {
    
    const [state,setState] = useState<StateProps>({
        name:"Mix",
        category:[],
        categories:[],
        tags:[],
        textLocation:"textloca",
        link:"linkintext",
        date:"",
        timeArray:"",
        temp:"",
        timeOpen:[],
        dateDelivery:"",
        timeArrayDelivery:"",
        tempDelivery:"",
        timeOpenDelivery:[],
        index:0,
        rangePrice:""
    })

    const loadCategories = async() => {
        return await ListAllCategory();
    }

    useEffect(() => {
        loadCategories()
        .then((res) => {
            const tempArr:string[] = [];
            for (let i = 0; i < res.data.category.length; i++) {
                tempArr.push(res.data.category[i].name)
            }
            setState(prev => ({...prev, categories:res.data.category, tags:tempArr}))

        })
        .catch((err:AxiosError) => {
            toast.error(err.response?.data as string)
        })

    }, [])
    
    //@ts-ignore
    const handleChange = (e,v) => {
        //@ts-ignore
        console.log("ThIS IS V =>",v)
        setState(prev=>({...prev,category:v}))
    }

    const handleAddDate = () => {
        
        const objToPush = state.timeOpen; 
        const tempObject:TimeOpen = {"date":state.date, "time":state.timeArray};
        objToPush.push(tempObject)
        setState(prev => ({...prev, date:"", timeArray:"", timeOpen:objToPush}))
    }

    console.log(state)

    const handleRemove = (index:number) => {
        const tempState = state.timeOpen;
        tempState.splice(index,1);
        setState(prev => ({...prev,timeOpen:tempState}));
    }
    
    const handleRemoveDelivery = (index:number) => {
        const tempState = state.timeOpenDelivery;
        tempState.splice(index,1);
        setState(prev => ({...prev,timeOpenDelivery:tempState}));
    }

    const handleAddDateDelivery = () => {
        const objToPush = state.timeOpenDelivery; 
        const tempObject:TimeOpen = {"date":state.dateDelivery, "time":state.timeArrayDelivery};
        objToPush.push(tempObject)
        setState(prev => ({...prev, dateDelivery:"", timeArrayDelivery:"", timeOpenDelivery:objToPush}))
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("SUBMIT")
        const {name, category, textLocation, link , timeOpen, timeOpenDelivery} = state
        const objLocation = {"textLocation":textLocation,"link":link};
        const onlyIdCategory:string[] = [];
        category?.map((c) => {
            onlyIdCategory.push(c._id)
        })
        await PostCreateStore(name, onlyIdCategory, objLocation, 5, timeOpen, timeOpenDelivery)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err:AxiosError) => {
            toast.error(err.response?.data as string)
        })

    }
    

    return (
    <>
     <div className="md:ml-[15rem] p-6 w-full h-full">
          <div className="bg-white p-8 h-[full]">
            <form onSubmit={handleSubmit}>
            <h6 className="text-4xl text-center font-bold text-indigo-500 mt-4 mb-8">Create Store Data</h6>

            <Grid container spacing={8}>
                <Grid item xs={6}>
                <h6 className="text-2xl font-semibold mb-2">Assign Store Name</h6>
                <TextField
                placeholder='Store Name'
                variant="filled" 
                fullWidth 
                value={state.name}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, name:e.target.value}))}
                />
                </Grid>
                <Grid item xs={6}>
                <h6 className="text-2xl font-semibold mb-2">Assign Store Category</h6>
                {state.categories && 
                  <Autocomplete
                  sx={{marginTop:1}}
                  multiple
                  options={state.categories}
                  freeSolo
                  value={state.category!}
                  //@ts-ignore
                  getOptionLabel={option => option.name}
                  onChange={(event: any, value: (string | SingleCategory)[]) => setState(prev => ({...prev,category:value as SingleCategory[]}))}
                  fullWidth
                  
                  renderInput={(params:any) => (
                    <TextField
                      {...params}
                      fullWidth
                    //   placeholder="เลือกหรือสร้าง Tags เองก็ได้"
                    //   helperText="เมื่อพิมเสร็จแล้วให้กด Enter ระบบถึงจะบันทึก tag ให้ ปล.ไม่สามารถเกิน 10 tags"
                    />
                  )}
                />
                
                }

                </Grid>
                <Grid item xs={12}>
                <h6 className="text-2xl font-bold mb-2">Choose Location Of Store</h6>
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
                </Grid>
            
            <Grid item xs={12}>
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
                    Click To Date And Time Open
                </Button>
                </div>
                
                <TimeOpenTable
                timeOpen={state.timeOpen}
                handleRemove={handleRemove}
                title="Date Open"
                />
                <Divider/>
            </Grid>
            


            <Grid item xs={12}>
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
                    <div>
                        <h6 className="text-xl font-semibold ">Select Time Delivery</h6>
                        <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Ex. 08.00-12.00"
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
                />

                <div className="mt-12">
                    <h6 className="text-xl font-semibold ">Select Time Delivery</h6>
                    <TextField
                    fullWidth
                    variant="filled"
                    placeholder="Ex. 1000 - 2000 baht"
                    value={state.rangePrice}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev=> ({...prev, rangePrice:e.target.value}))}
                    sx={{mb:4}}
                    />
                </div>
            </Grid>

            <Grid item xs={12}>
                <div>
                    <Button variant="contained" type="submit">
                        Create Store
                    </Button>
                </div>
            </Grid>

            </Grid>
            </form>
          </div>
        </div>
    </>
    )
}