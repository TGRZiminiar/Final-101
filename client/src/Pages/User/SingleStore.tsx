import { Rating } from '@mui/material';
import React, { useState,useEffect, useMemo } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { TabsDetailStore } from '../../Components/Tabs/TabsDetailStore';
import { GetSingleStore, GetSuggestRestaurant, PatchUserBookMark } from '../../Function/store.func';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { Category, CommentSection, SingleStoreInterface } from "../../Interface/store.interface"
import { toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import {SearchResult} from "../../Interface/store.interface"
import { CardHome } from '../../Components/Card/CardHome';
import "../../Components/Tabs/TabsDetailStore.css"


export interface SingleStateProps {
  value:number;
  store:SingleStoreInterface | null;
  comment:CommentSection[] | null;
  categories:string[];
  loading:boolean;
  userFav:boolean;
  ratingSum:number;
  ratingCount:number;
  suggest:SearchResult[];
  changeValue:boolean;
}

export const SingleStore: React.FC = () => {
    const navigate = useNavigate();
    const {storeId} = useParams();


    const [state,setState] = useState<SingleStateProps>({
      value:0,
      store:null,
      comment:null,
      categories:[],
      loading:true,
      userFav:false,
      ratingSum:0,
      ratingCount:0,
      suggest:[],
      changeValue:false,
    })

    const handleTabsChange = (newValue:number) => {
      setState(prev => ({...prev,value:newValue}));
    }

    // console.log(state)

    const loadSingleStore = async() => {
      setState(prev => ({...prev, loading:true}));
      await GetSingleStore(storeId as string)
      .then(async(res:AxiosResponse | boolean) => {
        if(typeof(res) !== "boolean"){
            let str:string[] = [];
            let cateId:string[] = [];
            let data:Category[] = res.data.store.category;
            await Promise.all((data.map((cate) => {
              str.push(cate.name)
              cateId.push(cate._id);
            })))
            // console.log(res.data)
            setState(prev => ({
            ...prev, 
            store:res.data.store as SingleStoreInterface, 
              comment:res.data.comments as CommentSection[],
              categories:str, 
              loading:false, 
              userFav:res.data.userAddBookOrNot,
              ratingSum:res.data.store.ratingSum,
              ratingCount:res.data.store.ratingCount,
            }));
            
            await GetSuggestRestaurant(res.data.store._id,cateId)
            .then((res) => {
              setState(prev => ({...prev, suggest:res.data.store}))
              window.scrollTo(0,0);
            })
            .catch((err) => {
              console.log(err);
            })

          }
        })
        .catch((err:AxiosError) => {
          toast.error(err.response?.data as string)
          setState(prev => ({...prev, loading:false}));
          
      })
  }

    useEffect(() => {
      
      loadSingleStore();
     

    }, [])

   

    // useMemo(() => {
    //     if(state.store) {
    //       avg = (state.ratingSum / state.ratingCount) || 0;
    //     }
    // }, [state.ra])

    const handleBookMark = async() => {
      await PatchUserBookMark(storeId as string)
      .then((res:AxiosResponse | boolean) => {
        // console.log(res.data)
        if(typeof(res) !== "boolean") {
          //@ts-ignore
          toast.success(res.data.message)
          setState(prev => ({...prev,userFav:!prev.userFav}));
        }
      })
      .catch((err:AxiosError) => {
        toast.error("Something Went Wronge Try Again");
      })
    }

    // const handleLink = (link:string) => {
    //   navigate(`/external/${link}`)
    // }

    return (
    <>
    <div className="pt-[7vh]">
       {state.store?.imageData && 
         <Carousel
         responsive={responsive1}
         swipeable={true}
         draggable={true}
         ssr={true}
         containerClass="carousel-container"
         removeArrowOnDeviceType={["tablet", "mobile"]}
         dotListClass="custom-dot-list-style"
         itemClass="carousel-header"
         autoPlay={true}
         >
         {state.store?.imageData.map((img,i) => (
           <div className="w-full h-[20rem]" key={i}>
           <img loading='lazy' className="w-full h-full object-fill" src={img.urlImage ? img.urlImage : "https://m.media-amazon.com/images/I/61+oIVFF7FL.png"} />
           </div>
         ))}
         
         </Carousel>
       
       }

    </div>

       <div className="bg-white h-full mx-auto w-full lg:w-[75%] min-h-[100vh]">
       <div className=" p-8 md:p-16 relative">
            <div className="grid md:flex gap-8 self-center">
                <h4 className="text-4xl font-bold">{state.store?.storeName}</h4>
                <div className="flex gap-2 self-center">
                <Rating size="large" value={state.store && (state?.ratingSum / state?.ratingCount) || 0} readOnly />
                <h6 className="text-xl font-semibold">({state.store?.ratingCount} Ratings)</h6>
                </div>
            </div>

        <div className=''>
            <div className="flex mt-4">
                <div className="self-center">
                <LocationOnOutlinedIcon className="text-red-500" fontSize="large" />
                </div>
              {state.store?.location.link && 
                <a /* href={`${String(state.store?.location.link)}`} */ onClick={() => window.open(`https://${state.store?.location.link}`, "_blank")}  rel="noreferrer" target="_blank">
                  <h6 className="text-blue-400 hover:underline self-center text-xl font-semibold cursor-pointer" /* onClick={() => handleLink(String(state.store?.location.link))} */  >{state.store?.location.textLocation}</h6>
                 </a>
              }
            </div>
        </div>
            <div className="absolute top-2 right-5 cursor-pointer" onClick={handleBookMark}>
            {state.userFav ? 
            <BookmarkAddedOutlinedIcon fontSize='large' className="text-red-400" />
            :
            <BookmarkAddOutlinedIcon fontSize='large' className="text-green-700" />
            }
            </div>

          </div>
        <div >
          <TabsDetailStore 
          state={state}
          handleChange={handleTabsChange}
          storeId={storeId as string}
          setState={setState}
          />
        </div>

        <div className={`w-full grid  pb-4 transition-all ${state.value === 0 ? "shown" : "hide"}`}>
            <div className="bg-[#94734D] p-4 ">
            <h6 className="text-white text-2xl text-center ">We Sugguest You This Restaurant</h6>
            </div>
            {state.store?.imageData && 
            <Carousel
            responsive={responsive2}
            swipeable={true}
            draggable={true}
            ssr={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-header"
            autoPlay={false}
            className="px-8 md:px-16 mt-6"
            >
            {state?.suggest.map((img,i) => (
              <CardHome
              data={img}
              key={i}                        
              />
            ))}
            </Carousel>
       }
        </div>
        <div className={`w-full grid  pb-4 transition-all ${state.value === 1 ? "shown" : "hide"}`}>
            <div className="bg-[#94734D] p-4 ">
            <h6 className="text-white text-2xl text-center ">We Sugguest You This Restaurant</h6>
            </div>
            {state.store?.imageData && 
            <Carousel
            responsive={responsive2}
            swipeable={true}
            draggable={true}
            ssr={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-header"
            autoPlay={false}
            className="px-8 md:px-16 mt-6"
            >
            {state?.suggest.map((img,i) => (
              <CardHome
              data={img}
              key={i}                        
              />
            ))}
            </Carousel>
       }
        </div>
        <div className={`w-full grid  pb-4 transition-all ${state.value === 2 ? "shown" : "hide"}`}>
            <div className="bg-[#94734D] p-4 ">
            <h6 className="text-white text-2xl text-center ">We Sugguest You This Restaurant</h6>
            </div>
            {state.store?.imageData && 
            <Carousel
            responsive={responsive2}
            swipeable={true}
            draggable={true}
            ssr={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-header"
            autoPlay={false}
            className="px-8 md:px-16 mt-6"
            >
            {state?.suggest.map((img,i) => (
              <CardHome
              data={img}
              key={i}                        
              />
            ))}
            </Carousel>
       }
        </div>

       </div> 

      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={state.loading}
      onClick={() => setState(prev => ({...prev,loading:false}))}
      >
        <CircularProgress color="inherit" />

      </Backdrop>

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

  
const responsive2 = {
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 5,
      slidesToSlide: 5, 
      showDots:false,
    },
    tablet: {
      breakpoint: { max: 1400, min: 1000 },
      items: 3,
      slidesToSlide: 3 ,
      showDots:false,

    },
    mobile: {
      breakpoint: { max: 1000, min: 0 },
      items:1,
      slidesToSlide:1,
    } 
  };

  