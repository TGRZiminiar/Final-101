import React from 'react';
import { TabsDetailState } from './TabsDetailStore';
import "./SecondIndex.css";
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';

interface SecondIndexProps {
    state:TabsDetailState;
    
}

export const SecondIndex: React.FC<SecondIndexProps> = ({state}) => {
    
  console.log(state)
  //grid-cols-1 min-[550px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
  
  return (
    <div className="grid grid-cols-1 min-[550px]:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center  gap-8 mt-8 px-8 md:px-16 ">
      
      {state.store?.menuList?.map((menu,i) => (
       <React.Fragment key={menu._id}>
        <div className=" h-[25rem] w-fit border-2 rounded-md border-gray-300 " >
        <div className=" h-[20rem] relative overflow-hidden">
          <img
          src={menu.urlImage ? menu.urlImage : "https://media-cdn.tripadvisor.com/media/photo-p/0a/d4/8e/c0/photo0jpg.jpg"}
          className=" h-full object-fill hover:scale-110 transition-all"
          />
        </div>
        <div className="flex flex-col h-[5rem]  bg-[#f0f0f0] text-[#6B4519] font-semibold p-2 justify-center items-center">
          <div className="flex gap-2 border-b-2 border-[#6B4519]">
            <RestaurantMenuRoundedIcon/>
            <h6 className="text-lg menu-name relative ">{menu.text.length > 20 ? (`${menu.text.substring(0,20)}...`) : menu.text}</h6>
          </div>
          <div className="flex gap-2 mt-2">
            <MonetizationOnRoundedIcon/>
            <h6 className="text-lg">{String(menu.price)} Bath</h6>
          </div>
        </div>

      </div>
   
       </React.Fragment>
      ))}

    </div>
    )
}