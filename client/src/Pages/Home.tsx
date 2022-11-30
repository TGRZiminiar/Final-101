import React, { useEffect,useState } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import utf8 from "utf8"
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import { Link,useNavigate } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from "axios"
import { Button, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { styled } from '@mui/material/styles';
import { GetAllStore } from '../Function/store.func';
import { CardHome } from '../Components/Card/CardHome';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { ListAllCategoriesSearch } from '../Function/category.func';
import { toast } from 'react-toastify';


export const SearchBox = styled(TextField)(() => ({
    '& fieldset': {
      borderRadius: '30px',
    },
  }));

export type Store = {
    category:{
        name:string;
        _id:string;
    }[];

    imageHeader:{
        urlImage:string
    }

    ratingCount:number;
    commentCount:number;
    ratingSum:number;
    storeName:string;
    _id:string;

}

interface StateProps {
    open:boolean;
    store:Store[];
    categories:Categories[]
}

type Categories = {
    _id:string;
    name:string;
    categoryImage:string;
}

export const Home: React.FC = () => {

    const navigate = useNavigate();
    
    const name = "นายชิษณุพงศ์ เจตน์อัศวภิรมย์";
    
    const [state,setState] = useState<StateProps>({
        open:false,
        store:[],
        categories:[],
    })

    const handleOpen = ():void => {
        setState(prev=>({...prev,open:!prev.open}));
    }
    
    const loadStore = async() => {
        await GetAllStore()
        .then(async(res:AxiosResponse) => {
            console.log(res.data)
            setState(prev => ({...prev,store:res.data.store}))
            await ListAllCategoriesSearch()
            .then((res:AxiosResponse) => {
                setState(prev => ({...prev,categories:res.data.categories}));
            })
            .catch((err:AxiosError) => {
                toast.error("Something Went Wronge");
            })
        })
        .catch((err:AxiosError) => {
            toast.error("Something Went Wronge");
        })
    }
    useEffect(() => {
        loadStore()
    }, [])
  
    console.log(state.categories)

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
                <div className="grid grid-cols-1  min-[600px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 place-items-center md:items-center">
                
                {state.store && state.store.map((str,i) => (
                        
                        <CardHome
                        data={str}
                        key={i}                        
                        />
                    ))}
                </div>
            </div>


            <div className="my-4 w-full bg-[#A0412B] p-6 text-center text-[#BB9C78] font-extrabold text-4xl ">
                <h4>CATEGORIES</h4>
            </div>
            <div className="p-8 px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  cursor-pointer ">
               {state?.categories.map((cate,i) => (
                <div key={i} className="w-full h-full max-h-[10rem] relative hover:scale-105 transition-all" onClick={() => navigate(`/search?search=\"\"&category=${cate._id}`)}>
                    <img
                    className="w-full h-full object-cover rounded-3xl"
                    src={cate.categoryImage}
                    />
                    <h6 className="text-white font-bold  text-3xl text-end absolute w-full top-[50%] right-[5%]" style={{transform:"translate(0%, -50%)"}}>{cate.name}</h6>
                    {/* <h6 className="text-black text-xl text-end absolute top-[50%] right-[50%]" style={{transform:"translate(145%, -50%)"}}>{cate.name}</h6> */}
                </div>

               ))}
            </div>
            </div>

            
           <div className="block">
           <div className="w-full bg-[#A0412B] p-6 text-center text-[#BB9C78] font-extrabold text-4xl ">
                <h4>RANDOM</h4>
            </div>

            <div className="py-8 text-white text-lg font-semibold ">
                <div className='text-center'>
                    <button className="bg-[#CCAF63] p-4 rounded-xl hover:bg-[#d5bd81] cursor-pointer text-center w-[80%]" onClick={() => navigate("/random")}>
                    Click Here To Random Restaurant
                    </button>
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
        items: 4,
        slidesToSlide: 4, 
        showDots:false,
    },
    tablet: {
        breakpoint: { max: 1400, min: 1000 },
        items: 3,
        slidesToSlide: 3 ,
        showDots:false,

    },
    mobile: {
        breakpoint: { max: 1000, min: 550 },
        items:2,
        slidesToSlide:2,
    },
    smallMobile: {
        breakpoint: { max: 550, min: 0 },
        items:2,
        slidesToSlide:2, 
    }
};
                                
                                  