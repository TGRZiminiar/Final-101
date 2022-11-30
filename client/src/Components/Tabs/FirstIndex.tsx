import React, { useMemo } from 'react'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AirlineSeatReclineNormalOutlinedIcon from '@mui/icons-material/AirlineSeatReclineNormalOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import StoreIcon from '@mui/icons-material/Store';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import CancelIcon from '@mui/icons-material/Cancel';
import "./FirstIndex.css"
import { SingleStateProps } from '../../Pages/User/SingleStore';
import {useNavigate} from "react-router-dom";

interface FirstIndexProps {
    
    state:SingleStateProps;

}

export const FirstIndex: React.FC<FirstIndexProps> = ({state}) => {
    
    const navigate = useNavigate();
    let str:string[] = [];

    // const memo = useMemo(() => {
    //     state.store?.category.map((cate) => (
    //         str.push(cate.name)
    //     ))
    // },[state])


    console.log(state)
    console.log(str)
    //category price seat branch contact facilities moreDetail
    return (
    <div className="mx-auto  p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">

            <div className="flex flex-col gap-4 md:border-r-2">

                <div className="flex flex-wrap flex-1 basis-4">
                    <CategoryOutlinedIcon className="self-center"/>
                    <h6 className="text-2xl font-semibold">Categories : &nbsp;</h6>
                    <p   className="self-center text-xl">{state.categories && String((state.categories.slice(0, 3)).join(', '))}</p>
                </div>
                <div className="flex">
                    <AttachMoneyOutlinedIcon className="self-center"/>
                    <h6 className="text-2xl font-semibold">Price : &nbsp;</h6>
                    <p className="self-center text-xl">{state.store?.rangePrice} Baht</p>
                </div>
                
                <div className="flex">
                    <AirlineSeatReclineNormalOutlinedIcon className="self-center"/>
                    <h6 className="text-2xl font-semibold self-center">Seat : &nbsp;</h6>
                    <p className="self-center text-xl">24 seats</p>
                </div>

                
                <div className="flex flex-wrap flex-1 basis-4">
                    <StoreIcon className="self-center"/>
                    <h6 className="text-2xl font-semibold self-center">Branch : &nbsp;</h6>
                    <p   className="self-center text-xl">{state.store?.branch && String((state.store.branch.slice(0, 3)).join(', '))}</p>
                    {/* {state.store?.branch.map((br,i) => (
                        <p className="self-center text-xl" key={i}>{br}</p>
                    ))} */}
                </div>
                

                <div className="flex flex-col gap-2">
                <div className="flex">
                    <LineStyleIcon className="self-center"/>
                        <h6 className="text-2xl font-semibold">Contact</h6>
                </div>
                    <div className="flex gap-4 flex-row pl-4" >
                        
                        {state.store?.contact.map((con,i) => (
                        <React.Fragment key={i}>
                            {con.platform === "Facebook" &&   
                            <a href={`${con.link}`}  onClick={() => window.open(`http://${con.link}`, "_blank")}  rel="noreferrer" target="_blank" >
                                <FacebookRoundedIcon className="self-center cursor-pointer" sx={{color:"#168FE8"}} fontSize="large" />
                            </a>}
                            {con.platform === "Instagram" && <a href={`${con.link}`}  onClick={() => window.open(`https://${con.link}`, "_blank")}  rel="noreferrer" target="_blank" >
                                <InstagramIcon className="self-center cursor-pointer" sx={{color:"#F64B89"}} fontSize="large" />
                            </a>}

                            {con.platform === "Phone" && <a href={`${con.link}`}  onClick={() => window.open(`https://${con.link}`, "_blank")}  rel="noreferrer" target="_blank" >
                                <LocalPhoneRoundedIcon className="self-center cursor-pointer" sx={{color:"#168FE8"}} fontSize="large" />
                            </a>}

                            {con.platform === "Line" && <a href={`${con.link}`}  onClick={() => window.open(`https://${con.link}`, "_blank")}  rel="noreferrer" target="_blank"  
                                className="w-[2rem] h-[2rem] rounded-full bg-green-600 line"
                                >
                                </a>
                            }


                        </React.Fragment>

                        ))}
                    
                    
                    </div>
                </div>

                 
                <div className="flex flex-col gap-4">
                <div className="flex">
                    <LineStyleIcon className="self-center"/>
                        <h6 className="text-2xl font-semibold">Facilitie</h6>
                </div>
                    <div className="flex gap-4 flex-col pl-4" >
                        {state.store?.checkBox.map((item,i) => (
                        <div className="flex gap-2" key={i}>
                                {item.check ? 
                                <CheckCircleIcon className="self-center" sx={{color:"#6E845D"}}/>
                                :
                                <CancelIcon className="self-center" sx={{color:"#BF1A1A"}} />
                                }
                                <p className="self-center text-xl">{item.text}</p>
                        </div>
                        ))}

                    
                    </div>
                </div>
                
                <div className="flex flex-wrap flex-1">
                    <InfoOutlinedIcon className="self-center"/>
                    <h6 className="text-2xl font-semibold self-center">More details : &nbsp;</h6>
                    <p className="self-center text-xl">{state.store?.otherDetail}</p>
                </div>

            </div>
            
            <div className="flex flex-col gap-4">
                <div className="flex flex-row flex-wrap gap-4">
                    <EventAvailableOutlinedIcon fontSize='large' sx={{color:"#4F480B"}}/> 
                    <div className="text-xl">
                        <h6 className="text-[#4F480B]">(Status Delivery Now : Open)</h6>    
                        {state.store?.timeOpenDelivery.map((time,i) => (
                            <h6 className="text-[#4F480B]" key={i}>{time.date} {time.time}</h6>    
                        ))}
                    </div>              
                </div>

                <div className="flex flex-row flex-wrap gap-4">
                    <EventAvailableOutlinedIcon fontSize='large' sx={{color:"#4F480B"}}/> 
                    <div className="text-xl">
                        <h6 className="text-[#4F480B]">(Status Restaurant Now : Open)</h6>    
                        {state.store?.timeOpen.map((time,i) => (
                            <h6 className="text-[#4F480B]" key={i}>{time.date}   {time.time}</h6>
                        ))}    
                        {/* <h6 className="text-[#4F480B]">Tueday   16.30 - 21.00</h6>    
                        <h6 className="text-[#4F480B]">Wednesday   16.30 - 21.00</h6>     */}
                    </div>              
                </div>
            </div>
            

        </div>
    </div>
    )
}