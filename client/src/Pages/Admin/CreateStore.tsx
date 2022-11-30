import { Grid, TextField, Autocomplete, Divider } from '@mui/material'
import React, {  useEffect, useState } from 'react'
import { ListAllCategory } from "../../Function/category.func"
import { AxiosError } from "axios";
import {toast} from "react-toastify";
import { PostCreateStore } from '../../Function/store.func';
import { SelectDateAndTime } from '../../Components/CreateStore/SelectDateAndTime';
import { Location } from '../../Components/CreateStore/Location';
import { SelectDateAndTimeDelivery } from '../../Components/CreateStore/SelectDateAndTimeDelivery';
import { CheckBox } from '../../Components/CreateStore/CheckBox';
import { Contact } from '../../Components/CreateStore/Contact';
import "./CreateStore.css"
import { useSelector } from 'react-redux';
import { Menu } from '../../Components/CreateStore/Menu';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from "react-router-dom";

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

    seatNumber:number;
    backdropOpen:boolean;
}

export const CreateStore: React.FC = () => {
    //@ts-ignore
    const openDrawer = useSelector(state => state.drawer);
    const navigate = useNavigate();
    const [state,setState] = useState<StateProps>({
        name:"Mix Noodles",
        category:[],
        categories:[],
        tags:[],
        textLocation:"",
        link:"https://goo.gl/maps/4XpcQPdSrhqb11sn7",
        date:"",
        timeArray:"",
        temp:"",
        timeOpen:[{"date":"Monday","time":"08.00 - 12.00"},{"date":"Tueday","time":"08.00 - 12.00"},{"date":"Wednesday","time":"08.00 - 12.00"},{"date":"Thursday","time":"08.00 - 12.00"},{"date":"Friday","time":"08.00 - 12.00"},{"date":"Saturday","time":"08.00 - 12.00"},{"date":"Sunday","time":"08.00 - 12.00"}],
        dateDelivery:"",
        timeArrayDelivery:"",
        tempDelivery:"",
        timeOpenDelivery:[{"date":"Monday","time":"08.00 - 12.00"},{"date":"Tueday","time":"08.00 - 12.00"},{"date":"Wednesday","time":"08.00 - 12.00"},{"date":"Thursday","time":"08.00 - 12.00"},{"date":"Friday","time":"08.00 - 12.00"},{"date":"Saturday","time":"08.00 - 12.00"},{"date":"Sunday","time":"08.00 - 12.00"}],
        index:0,
        rangePrice:"1000 - 2000",
        seatNumber:16,

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
        otherDetail:"This is other detail",
        backdropOpen:false
    })
    console.log(state)
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
        let temp:boolean = false;
        if(state.boolCheck === "true"){
            temp = true;
        }
        else {
            temp = false;
        }
        // console.log(state.boolCheck)
        // console.log(Boolean(state.boolCheck))
        const tempObject:CheckBox = {"text":state.textCheckBox,"check":temp};
        objToPush.push(tempObject);
        setState(prev => ({...prev, textCheckBox:"", boolCheck:"", checkBox:objToPush}));
    }

    const handleAddContact = () => {
        const objToPush = state.contact;
        let tempContact:string = state.linkPlatform;
        if(tempContact.includes("http://")){
            tempContact.substring(0,6);
        }
        if(tempContact.includes("https://")){
            tempContact.substring(0,7);
        }
        const tempObject:Contact = {"platform":state.platform,"link":state.linkPlatform};
        objToPush.push(tempObject);
        setState(prev => ({...prev, platform:"", linkPlatform:"", contact:objToPush}));
    }
  
    const handleAddMenu = () => {
        const objToPush = state.menu;
        const tempObject:Menu = {"text":state.text,"price":state.price};
        objToPush.push(tempObject);
        setState(prev => ({...prev, text:"", price:0, menu:objToPush}));
    }
  

   

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name, category, textLocation, link , timeOpen, timeOpenDelivery, rangePrice, checkBox, otherDetail, contact, menu, branch, seatNumber } = state
        
        if(link.includes("http://")){
            link.substring(0,6);
        }
        if(link.includes("https://")){
            link.substring(0,7);
        }
        const objLocation = {"textLocation":textLocation,"link":link};
        const onlyIdCategory:string[] = [];
        await category?.map((c) => {
            onlyIdCategory.push(c._id)
        })
        console.log("THIS IS OBJ LOCATION =>",state)
        await PostCreateStore(name, onlyIdCategory, objLocation, seatNumber, timeOpen, timeOpenDelivery, rangePrice, checkBox, otherDetail, contact, menu, branch)
        .then((res) => {
            console.log("THIS IS RESPONSE", res)
            toast.success("Create Store Success");
            setState(prev => ({...prev,backdropOpen:true}))
        })
        .catch((err:AxiosError) => {
            toast.error(err.response?.data as string)
        })

    }

    console.log(state)

    return (
    <>
     <div className={` ${openDrawer?.drawer && openDrawer.drawer ? "md:ml-[15rem]" : ""}  p-6 w-[100%] h-full transition-all`}>
          <div className="bg-white   h-[full] mx-auto w-[80%] mt-[3.5rem]">
            <form onSubmit={handleSubmit}>
            <div className="bg-[#857F7F] p-4 mb-12"> 
            <h6 className="text-4xl text-center font-bold text-white ">Create Store Data</h6>
            </div>

            <Grid container spacing={8}>

                <Grid item xs={12}>
                <div className="px-20">

                <h6 className="text-2xl font-semibold mb-2">Assign Store Name</h6>
                <TextField
                placeholder='Store Name'
                variant="filled" 
                fullWidth 
                value={state.name}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, name:e.target.value}))}
                />
                
                <h6 className="text-2xl font-semibold  mt-8">Assign Store Category</h6>
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
                </div>
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
              <Menu
              state={state}
              setState={setState}
              handleAddMenu={handleAddMenu}
              handleRemoveMenu={handleRemoveMenu}
              />
                <Divider/>
            </Grid>
             {/* End Add Menu And Price */}

            
             <Grid item xs={12}>
             <div className="bg-[#857F7F] text-white p-3 self-center mb-8">
                    <h6 className="text-2xl font-bold">Assign Store branch</h6>
                </div>
                <div className="px-20">
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
                          helperText="After Type In Something Please Enter"
                        />
                    )}
                    />
                </div>
                </Grid>
                
                <Grid item xs={12}>
                <div className="bg-[#857F7F] text-white p-3 self-center mb-8">
                    <h6 className="text-2xl font-bold">Store Other Detail</h6>
                </div>
                <div className="px-20">
                    <TextField
                    placeholder='Other Details'
                    variant="filled" 
                    fullWidth 
                    value={state.otherDetail}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, otherDetail:e.target.value}))}
                    rows={5}
                    multiline
                    />
                </div>
                </Grid>


            <Grid item xs={12}>
                <div className="mb-4 text-center mx-16">
                <button type={"submit"} className="w-full hover:bg-[#6a7d5b] text-white bg-[#6E845D] rounded-md px-8 py-6 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                    Create Store
                </button>
                   
                </div>
            </Grid>

            </Grid>
            </form>
          </div>
        </div>

        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.backdropOpen!}
        onClick={() => setState(prev => ({...prev,backdropOpen:!prev.backdropOpen}))}
      >
       <div className="bg-white w-[30vh] h-[30vh] grid gap-1">
            <button 
            onClick={() => navigate("/admin/get-store")}
            type={"button"} 
            className="w-full hover:bg-[#6a7d5b] text-white bg-[#6E845D] px-8 py-6 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                Edit / Add Image Menu
            </button>
            <button 
            onClick={() => setState(prev => ({...prev,backdropOpen:!prev.backdropOpen}))}
            type={"button"} 
            className="w-full hover:bg-[#6a7d5b] text-white bg-[#6E845D] px-8 py-6 leading-6 shadow-md text-xl font-bold hover:shadow-xl"> 
                Stay On This Page
            </button>
        
       </div>
      </Backdrop>

    </>
    )
}

/* 
Monday : 08.00 - 12.00 , 13.00 - 16.00

*/