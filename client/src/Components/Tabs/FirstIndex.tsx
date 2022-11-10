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
import { TabsDetailState } from './TabsDetailStore';
import CancelIcon from '@mui/icons-material/Cancel';
import "./FirstIndex.css"

interface FirstIndexProps {
    
    state:TabsDetailState;

}

export const FirstIndex: React.FC<FirstIndexProps> = ({state}) => {
    
    
    let str:string[] = [];

    const memo = useMemo(() => {
        state.store?.category.map((cate) => (
            str.push(cate.name)
        ))
    },[state.store?.category])


    return (
    <div className="p-8 md:p-16">
        <div className="grid gap-6">
            <div className="flex">
                <CategoryOutlinedIcon className="self-center"/>
                <h6 className="text-2xl font-semibold">Categories : &nbsp;</h6>
                <p className="self-center text-xl">{String((str.slice(0, 3)).join(', '))}</p>
            </div>
            <div className="flex">
                <AttachMoneyOutlinedIcon className="self-center"/>
                <h6 className="text-2xl font-semibold">Price : &nbsp;</h6>
                <p className="self-center text-xl">{state.store?.rangePrice} Baht</p>
            </div>
            <div className="flex">
                <AirlineSeatReclineNormalOutlinedIcon className="self-center"/>
                <h6 className="text-2xl font-semibold">Seat : &nbsp;</h6>
                <p className="self-center text-xl">24 seats</p>
            </div>
            <div className="flex flex-wrap flex-1">
                <InfoOutlinedIcon className="self-center"/>
                <h6 className="text-2xl font-semibold">More details : &nbsp;</h6>
                <p className="self-center text-xl">{state.store?.otherDetail}</p>
            </div>
            <div className="flex flex-row gap-4">
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

            <div className="flex flex-row gap-4">
                <EventAvailableOutlinedIcon fontSize='large' sx={{color:"#4F480B"}}/> 
                <div className="text-xl">
                    <h6 className="text-[#4F480B]">(Status Delivery Now : Open)</h6>    
                    {state.store?.timeOpenDelivery.map((time,i) => (
                        <h6 className="text-[#4F480B]" key={i}>{time.date} {time.time}</h6>    
                    ))}
                </div>              
            </div>

            <div className="flex flex-wrap flex-1">
                <StoreIcon className="self-center"/>
                <h6 className="text-2xl font-semibold">Branch : &nbsp;</h6>
                {state.store?.branch.map((br,i) => (
                    <p className="self-center text-xl" key={i}>{br}</p>
                ))}
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
          
            <div className="flex flex-col gap-4">
               <div className="flex">
                <LineStyleIcon className="self-center"/>
                    <h6 className="text-2xl font-semibold">Contact</h6>
               </div>
                <div className="flex gap-4 flex-row pl-4" >
                    
                    {state.store?.contact.map((con,i) => (
                    <React.Fragment key={i}>
                        {con.platform === "Facebook" &&  <div>
                            <FacebookRoundedIcon className="self-center cursor-pointer" sx={{color:"#168FE8"}} fontSize="large"/>
                        </div>}
                        {con.platform === "Instagram" && <div>
                            <InstagramIcon className="self-center cursor-pointer" sx={{color:"#F64B89"}} fontSize="large"/>
                        </div>}

                        {con.platform === "Phone" && <div>
                            <LocalPhoneRoundedIcon className="self-center cursor-pointer" sx={{color:"#168FE8"}} fontSize="large"/>
                        </div>}

                        {con.platform === "Line" && <div 
                            className="w-[2rem] h-[2rem] rounded-full bg-green-600 line"
                            >
                            </div>
                        }


                    </React.Fragment>

                    ))}
                   
                   
                </div>
            </div>

        </div>
    </div>
    )
}