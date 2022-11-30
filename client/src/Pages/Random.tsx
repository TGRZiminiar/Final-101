import React, { useEffect, useState } from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import StoreIcon from '@mui/icons-material/Store';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import CancelIcon from '@mui/icons-material/Cancel';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AirlineSeatReclineNormalOutlinedIcon from '@mui/icons-material/AirlineSeatReclineNormalOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { GetRandomRestaurant } from '../Function/store.func';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"

interface StateProps {
    store:{
        
        branch:string[];
        location:{
            textLocation:string;
            link:string;
        }
        category:{
            _id:string;
            name:string;
        }[];
        commentCount:number;
        contact:{
            link:string;
            platform:string;
            _id:string;
        }[];
        imageHeader:{
            urlImage:string;
        };
        ratingCount:number;
        ratingSum:number;
        storeName:string;
        timeOpen:{
            date:string;
            time:string;
            _id:string;
        }[];
        _id:string;
        rangePrice:string;
    } | null;
    categories:string[];
    loading:boolean;
}

export const Random: React.FC = () => {

    const [state,setState] = useState<StateProps>({
        store:null,
        categories:[],
        loading:false,
    });

    const navigate = useNavigate();

    const loadRandom = async() => {
        setState(prev => ({...prev, loading:true}));
        await GetRandomRestaurant()
        .then(async(res) => {
            let tempCate:string[] = [];
            window.scrollTo(0,0);
            await Promise.all((res.data.data.category.map((cate:{name:string,_id:string}) => {
                tempCate.push(cate.name as string);
            })))
            setState(prev => ({...prev, store:res.data.data,categories:tempCate, loading:false}));
            
        })
        .catch((err) => {
            toast.error("Something Went Wronge Try Again Later");
            setState(prev => ({...prev, loading:false}));
        })
    }

    useEffect(() => {
      
        loadRandom();
    
    }, [])
    

    console.log(state.store)

    return (
    <>
     <div className="pt-[7vh]">
        <div>
            <div className="bg-white min-h-screen h-full mx-auto w-full md:w-[85%] lg:w-[75%]">
            <div className="w-full bg-[#A0412B] p-6 text-center text-[#BB9C78] font-extrabold text-4xl uppercase  ">
                <h4>We suggest this restaurant for you!</h4>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 justify-items-stretch gap-8 px-10 xl:pl-20   mt-16   ">
                <div className="w-full xl:h-full ">
                    <img
                    className="w-full xl:h-auto max-h-[28rem] h-full rounded-xl object-cover"
                    src="http://localhost:5000/uploads/2022-11-19T16-08-19.941Zimage%2038.jpg"
                    />
                </div>
                
                <div className="grid gap-4 xl:border-r-2 xl:border-gray-500">
                    <h6  className="capitalize text-5xl font-bold mb-4">{state.store?.storeName}</h6>
                    <div className="flex flex-wrap flex-1 basis-4">
                    <LocationOnOutlinedIcon className="text-red-500" fontSize="large" />
                    {state.store?.location?.link && 
                    <a href={`${String(state.store?.location?.link)}`}  onClick={() => window.open(`http://${state.store?.location?.link}`, "_blank")}  rel="noreferrer" target="_blank" >
                        <h6 
                        className="text-blue-400 hover:underline self-center text-xl font-semibold cursor-pointer"  >
                            {state.store?.location?.textLocation}
                        Link    
                        </h6>
                    </a>
                    }
                    </div>
                  
                    
                    <div className="flex flex-wrap flex-1 basis-4">
                        <CategoryOutlinedIcon className="self-center"/>
                        <h6 className="text-2xl font-semibold">Categories : &nbsp;</h6>
                        {<p   className="self-center text-xl">{state?.categories && String((state?.categories.slice(0, 3)).join(', '))}</p>}
                    </div>
                    <div className="flex">
                        <AttachMoneyOutlinedIcon className="self-center"/>
                        <h6 className="text-2xl font-semibold">Price : &nbsp;</h6>
                        {<p className="self-center text-xl">{String(state.store?.rangePrice)} Baht</p>}
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
                    </div>
                

                <div className="flex flex-col gap-2">
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
                <div className="xl:mt-20 flex  gap-4">
                    <EventAvailableOutlinedIcon fontSize='large' sx={{color:"#4F480B"}}/> 
                    <div className="text-xl">
                        <h6 className="text-[#4F480B]">(Status Restaurant Now : Open)</h6>    
                        {state.store?.timeOpen && state.store?.timeOpen.map((time,i) => (
                            <h6 className="text-[#4F480B]" key={i}>{time.date}   {time.time}</h6>
                        ))}    
                    </div>              
                </div>
            </div>

                <div className="grid grid-cols-2 justify-center px-60 text-white gap-8 mt-8">
                    <button className="bg-[#55412A] hover:bg-[#765a3b] py-3 rounded-full text-2xl font-semibold" onClick={() => navigate(`/store/${state.store?._id}`)}>
                        Detail
                    </button>
                    <button className="bg-[#55412A] hover:bg-[#765a3b] py-3 rounded-full text-2xl font-semibold" onClick={() => window.location.reload()}>
                        Random
                    </button>
                </div>
            </div>
        </div>

     </div>
    </>
    )
}