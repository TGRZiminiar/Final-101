import { Rating } from '@mui/material';
import React, { useState,useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { TabsDetailStore } from '../../Components/Tabs/TabsDetailStore';
import { GetSingleStore } from '../../Function/store.func';
import { useParams } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { CommentSection, SingleStoreInterface } from "../../Interface/store.interface"
import { toast } from 'react-toastify';

export interface SingleStateProps {
  value:number;
  store:SingleStoreInterface | null;
  comment:CommentSection[] | null;
}

export const SingleStore: React.FC = () => {
    
    const {storeId} = useParams();


    const [state,setState] = useState<SingleStateProps>({
      value:0,
      store:null,
      comment:null,
    })

    const handleTabsChange = (newValue:number) => {
      setState(prev => ({...prev,value:newValue}));
    }

    const loadSingleStore = async() => {
      await GetSingleStore(storeId as string)
      .then((res:AxiosResponse) => {
          setState(prev => ({...prev, store:res.data.store as SingleStoreInterface, comment:res.data.comments as CommentSection[]}))
      })
      .catch((err:AxiosError) => {
          toast.error(err.response?.data as string)
      })
  }

    useEffect(() => {
      loadSingleStore()
    }, [])

    return (
    <>
    <div className="">
         <Carousel
          responsive={responsive1}
          swipeable={true}
          draggable={true}
          ssr={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-header"
          
          >
          <div className="w-full h-[20rem]">
          <img loading='lazy' className="w-full h-full object-cover" src='https://m.media-amazon.com/images/I/61+oIVFF7FL.png' />
          </div>
          <div className="w-full h-[20rem]">
          <img loading='lazy' className="w-full h-full object-cover" src='https://m.media-amazon.com/images/I/61+oIVFF7FL.png' />
          </div>
          <div className="w-full h-[20rem]">
          <img loading='lazy' className="w-full h-full object-cover" src='https://m.media-amazon.com/images/I/61+oIVFF7FL.png' />
          </div>
          <div className="w-full h-[20rem]">
          <img loading='lazy' className="w-full h-full object-cover" src='https://m.media-amazon.com/images/I/61+oIVFF7FL.png' />
          </div>
          <div className="w-full h-[20rem]">
          <img loading='lazy' className="w-full h-full object-cover" src='https://m.media-amazon.com/images/I/61+oIVFF7FL.png' />
          </div>
          </Carousel>

    </div>

       <div className="bg-white h-full mx-auto w-[75%] min-h-[100vh]">
       <div className=" p-8 md:p-16">
            <div className="flex gap-8 self-center">
                <h4 className="text-4xl font-bold">Mix Store</h4>
                <div className="flex gap-2 self-center">
                <Rating size="large" value={5} readOnly />
                <h6 className="text-xl font-semibold">(50 Ratings)</h6>
                </div>
            </div>

        <div className=''>
            <div className="flex mt-4">
                <div className="self-center">
                <LocationOnOutlinedIcon className="text-red-500" fontSize="large" />
                </div>
                <h6 className="self-center text-xl font-semibold">The Sense, Pinklao.</h6>
            </div>
        </div>

          </div>
        <div >
          <TabsDetailStore 
          state={state}
          handleChange={handleTabsChange}
          storeId={storeId as string}
          />
        </div>
       </div>
    </>
    )
}

    
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