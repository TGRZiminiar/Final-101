import { Grid, Select, TextField, Typography, MenuItem, SelectChangeEvent,Autocomplete, Button, Divider } from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { ListAllCategory } from "../../Function/category.func"
import { AxiosError } from "axios";
import {toast} from "react-toastify";
import { PostCreateStore } from '../../Function/store.func';
import { SelectDateAndTime } from '../../Components/CreateStore/SelectDateAndTime';
import { Location } from '../../Components/CreateStore/Location';
import { SelectDateAndTimeDelivery } from '../../Components/CreateStore/SelectDateAndTimeDelivery';
import { CheckBox } from '../../Components/CreateStore/CheckBox';
import { Contact } from '../../Components/CreateStore/Contact';
import { MenuTable } from '../../Components/Table/MenuTable';
import "./CreateStore.css"

type SingleCategory = {
    _id:string;
    name:string;
}

export interface TimeOpen {
    date:string;
    time:string;
}


export type CheckBox = {
    text:string;
    check:boolean;
}

export type Contact = {
    platform:string;
    link:string;
}

export type Menu = {
    text:string;
    price:number;
}


export interface StateProps {
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
    
    textCheckBox:string;
    boolCheck:string;
    checkBox:CheckBox[];
   
    platform:string;
    linkPlatform:string;
    contact:Contact[];

    text:string;
    price:number;
    menu:Menu[];

    branch:string[];
    otherDetail:string;

    seatNumber:number

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
        timeOpen:[{"date":"monday","time":"08.00 - 12.00"}],
        dateDelivery:"",
        timeArrayDelivery:"",
        tempDelivery:"",
        timeOpenDelivery:[{"date":"monday","time":"08.00 - 12.00"}],
        index:0,
        rangePrice:"",
        seatNumber:0,

        textCheckBox:"",
        boolCheck:"",
        checkBox:[{"text":"Parking","check":true}],

        platform:"",
        linkPlatform:"http://facebook.com",
        contact:[],

        text:"",
        price:0,
        menu:[],

        branch:[],
        otherDetail:"",

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
    

    const handleAddDate = () => {
        
        const objToPush = state.timeOpen; 
        const tempObject:TimeOpen = {"date":state.date, "time":state.timeArray};
        objToPush.push(tempObject)
        setState(prev => ({...prev, date:"", timeArray:"", timeOpen:objToPush}))
    }


    const handleRemoveDate = (index:number) => {
        const tempState = state.timeOpen;
        tempState.splice(index,1);
        setState(prev => ({...prev,timeOpen:tempState}));
    }
    
    const handleRemoveDelivery = (index:number) => {
        const tempState = state.timeOpenDelivery;
        tempState.splice(index,1);
        setState(prev => ({...prev,timeOpenDelivery:tempState}));
    }
    
    const handleRemoveCheckBox = (index:number) => {
        const tempState = state.checkBox;
        tempState.splice(index,1);
        setState(prev => ({...prev,checkBox:tempState}));
    }
    
    const handleRemoveContact = (index:number) => {
        const tempState = state.contact;
        tempState.splice(index,1);
        setState(prev => ({...prev,contact:tempState}));
    }
   
    const handleRemoveMenu = (index:number) => {
        const tempState = state.menu;
        tempState.splice(index,1);
        setState(prev => ({...prev,menu:tempState}));
    }

    const handleAddDateDelivery = () => {
        const objToPush = state.timeOpenDelivery; 
        const tempObject:TimeOpen = {"date":state.dateDelivery, "time":state.timeArrayDelivery};
        objToPush.push(tempObject)
        setState(prev => ({...prev, dateDelivery:"", timeArrayDelivery:"", timeOpenDelivery:objToPush}))
    }
    
    const handleAddCheckBox = () => {
        const objToPush = state.checkBox;
        const tempObject:CheckBox = {"text":state.textCheckBox,"check":Boolean(state.boolCheck)};
        objToPush.push(tempObject);
        setState(prev => ({...prev, textCheckBox:"", boolCheck:"", checkBox:objToPush}));
    }

    const handleAddContact = () => {
        const objToPush = state.contact;
        const tempObject:Contact = {"platform":state.platform,"link":state.linkPlatform};
        objToPush.push(tempObject);
        setState(prev => ({...prev, platform:"", link:"", contact:objToPush}));
    }
  
    const handleAddMenu = () => {
        const objToPush = state.menu;
        const tempObject:Menu = {"text":state.text,"price":state.price};
        objToPush.push(tempObject);
        setState(prev => ({...prev, text:"", price:0, menu:objToPush}));
    }
  

   

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name, category, textLocation, link , timeOpen, timeOpenDelivery, rangePrice, checkBox, otherDetail, contact, menu, branch } = state
        const objLocation = {"textLocation":textLocation,"link":link};
        const onlyIdCategory:string[] = [];
        category?.map((c) => {
            onlyIdCategory.push(c._id)
        })
        await PostCreateStore(name, onlyIdCategory, objLocation, 5, timeOpen, timeOpenDelivery, rangePrice, checkBox, otherDetail, contact, menu, branch)
        .then((res) => {
            console.log("THIS IS RESPONSE", res)
            toast.success("Create Store Success");
        })
        .catch((err:AxiosError) => {
            toast.error(err.response?.data as string)
        })

    }

    console.log(state)


    return (
    <>
     <div className="md:ml-[15rem] p-6 w-full h-full">
          <div className="bg-white p-20 h-[full]">
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

                {/* Location */}
                <Grid item xs={12}>
                <Location
                state={state}
                setState={setState}
                />
                </Grid>
                {/* End Location */}
                
                {/* Select Date And Time Open Section */}
                <Grid item xs={12}>
                    <SelectDateAndTime
                    state={state}
                    setState={setState}
                    handleAddDate={handleAddDate}
                    handleRemoveDate={handleRemoveDate}
                    />
                </Grid>
                {/* End Select Date And Time Open Section */}



                {/* Select Date And Time Delivery and Select Time Delivery */}
                
                <Grid item xs={12}>
                    <SelectDateAndTimeDelivery
                    state={state}
                    setState={setState}
                    handleAddDateDelivery={handleAddDateDelivery}
                    handleRemoveDelivery={handleRemoveDelivery}
                    />
                </Grid>
                {/* End Select Date And Time Delivery and Select Time Delivery */}
            
 
            {/* CheckBox Section */}
            <Grid item xs={12}>
               <CheckBox
               state={state}
               setState={setState}
               handleAddCheckBox={handleAddCheckBox}
                handleRemoveCheckBox={handleRemoveCheckBox}
               />
            </Grid>
            {/* End CheckBox Section */}

            
             {/* Contach Section */}
             <Grid item xs={12}>
               <Contact
               state={state}
               setState={setState}
               handleAddContact={handleAddContact}
                handleRemoveContact={handleRemoveContact}
               />
            </Grid>
            {/* End Contact Section */}


            {/* Add Menu And Price */}
            <Grid item xs={12}>
                <h6 className="text-2xl font-bold mb-2">Add Menu</h6>
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

                <div className="mb-6">
                <Button variant="contained" className="rounded-lg" onClick={handleAddMenu}>
                    Click To Menu To Store
                </Button>
                </div>
                
                <MenuTable
                datas={state.menu}
                handleRemoveMenu={handleRemoveMenu}
                title="Menu Name"
                subtitle="Menu Price"
                />
                <Divider/>
            </Grid>
             {/* End Add Menu And Price */}

            
             <Grid item xs={12}>
                <h6 className="text-2xl font-semibold mb-2">Assign Store branch</h6>
                  <Autocomplete
                  sx={{marginTop:1}}
                  multiple
                  freeSolo
                  options={[""]}
                  value={state.branch!}
                  onChange={(event: any, value: (string | string[])[]) => setState(prev => ({...prev,branch:value as string[]}))}
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
                </Grid>
                
                <Grid item xs={12}>
                    <h6 className="text-2xl font-semibold mb-2">Store Other Detail</h6>
                    <TextField
                    placeholder='Other Details'
                    variant="filled" 
                    fullWidth 
                    value={state.otherDetail}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, otherDetail:e.target.value}))}
                    />
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

/* 
Monday : 08.00 - 12.00 , 13.00 - 16.00

*/