import { Rating } from '@mui/material';
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { TabsDetailStore } from '../../Components/Tabs/TabsDetailStore';


interface SingleStoreProps {

}

export const SingleStore: React.FC<SingleStoreProps> = ({}) => {
    
    const [state,setState] = useState({
      value:0,
    })

    const handleTabsChange = (newValue:number) => {
      setState(prev => ({...prev,value:newValue}));
    }

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
          value={state.value}
          handleChange={handleTabsChange}
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