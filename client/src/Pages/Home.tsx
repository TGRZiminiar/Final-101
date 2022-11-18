import React, { useEffect,useState } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import utf8 from "utf8"
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import { Link,useNavigate } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from "axios"
import { Button, TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { styled } from '@mui/material/styles';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { GetAllStore } from '../Function/store.func';
import { CardHome } from '../Components/Card/CardHome';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";


const SearchBox = styled(TextField)(() => ({

    '& fieldset': {
      borderRadius: '30px',
    },
  }));

export type Store = {
    category:{
        name:string;
        _id:string;
    }[];

    imageData:{
        urlImage:string
    }[];

    ratingCount:number;
    commentCount:number;
    ratingSum:number;
    storeName:string;
    _id:string;

}

interface StateProps {
    open:boolean;
    store:Store[];
}

export const Home: React.FC = () => {

    const navigate = useNavigate();
    
    const name = "นายชิษณุพงศ์ เจตน์อัศวภิรมย์";
    
    const [state,setState] = useState<StateProps>({
        open:false,
        store:[],
    })

    const handleOpen = ():void => {
        setState(prev=>({...prev,open:!prev.open}));
    }
    
    const loadStore = async() => {
        await GetAllStore()
        .then((res:AxiosResponse) => {
            console.log(res.data)
            setState(prev => ({...prev,store:res.data.store}))
        })
        .catch((err:AxiosError) => {
            console.log(err)
        })
    }
    useEffect(() => {
        loadStore()
    }, [])
  
    console.log(state)

    const arr = [1,2,3,4,5,6,7,8,9,10]

    return (
    <>
        <div className="w-full">

        <div className="">
            <div className="w-full h-[25rem] ">
            <img src="https://m.media-amazon.com/images/I/61+oIVFF7FL.png" className="w-full h-full object-cover"/>
            </div>
            <div className="bg-white h-full mx-auto w-full md:w-[85%] lg:w-[75%]">
            

            <div className="w-full bg-[#A0412B] p-6 text-center text-[#BB9C78] font-extrabold text-4xl ">
                <h4>RECOMMENDED BY OTHER PEOPLE</h4>
            </div>

            <div className="p-8 px-16 mb-8 mt-8">
                <div className="grid grid-cols-1  min-[600px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {/* grid-flow-col auto-cols-max */}
                    {state.store && state.store.map((str,i) => (
                        <CardHome
                        data={str}
                        key={i}                        
                        />
                       
                    ))}
                    
                    
                   {/*  <div>
                        hello
                    </div>
                    <div>
                        hello
                    </div> */}
                </div>
            </div>


            <div className="w-full bg-[#A0412B] p-6 text-center text-[#BB9C78] font-extrabold text-4xl ">
                <h4>LOOKING FOR SOMETHING</h4>
            </div>
            <div className="p-8 px-16">
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-2">
                    <SearchBox
                        placeholder="Search By Restaurant Name"
                        fullWidth
                        className='rounded-md'
                        InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                        <SearchOutlinedIcon />
                        </InputAdornment>
                        ),
                        }}
                        variant="outlined"
                    />
                    
                </div>
                <div className="col-span-2">
                    <SearchBox
                        placeholder="Search By Address Or Location"
                        fullWidth
                        className='rounded-md'
                        InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                        <SearchOutlinedIcon />
                        </InputAdornment>
                        ),
                        }}
                        variant="outlined"
                    />
                </div>
                <div className="col-span-1">
                    <button className="bg-[#6E845D] p-2 text-xl text-white rounded-lg text-center w-full h-full hover:bg-[#88a076]">
                    <div className="flex gap-4 justify-center self-center">
                    <h6><SearchOutlinedIcon className="self-center mb-1" /> Search</h6>
                    </div>
                    </button>
                </div>
            </div>
            </div>
            <div className="grid grid-cols-3 mt-8 text-white text-lg font-semibold ">
                <div className='col-start-2 col-end-2'>
                    <div className="bg-[#CCAF63] p-4 rounded-xl hover:bg-[#d5bd81] cursor-pointer text-center">
                    Click Here To Random Restaurant
                    </div>
                </div>
            </div>

            </div>
        </div>
        </div>



        {/* {state.img && state.img.map((im,i) => (
            <img src={`data:image/jpeg;base64,${im.imageBase64 as string}`} key={i}/>
        ))} */}
    </>
    )
}

/* {utf8.decode(h.bookName).length > 28 ?(
                  `${utf8.decode(h.bookName).substring(0,28)}...`
                  ):(
                    utf8.decode(h.bookName)
                  )} */

const responsive1 = {
    desktop: {
        breakpoint: { max: 3000, min: 1400 },
        items: 3,
        slidesToSlide: 3, 
        showDots:false,
    },
    tablet: {
        breakpoint: { max: 1400, min: 1000 },
        items: 2,
        slidesToSlide: 2 ,
        showDots:false,

    },
    mobile: {
        breakpoint: { max: 1000, min: 0 },
        items:1,
        slidesToSlide:1,
    } 
};
                
                  