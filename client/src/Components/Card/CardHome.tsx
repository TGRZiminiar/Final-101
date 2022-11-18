import React,{useMemo} from 'react'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useNavigate } from "react-router-dom";
import { Store } from '../../Pages/Home';
import "./CardHome.css"
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import { Rating } from '@mui/material';


interface CardHomeProps {
    data:Store;
    // data:any
}   

export const CardHome: React.FC<CardHomeProps> = ({data}) => {
    
    const navigate = useNavigate();
    let str:string[] = [];

    // const memo = useMemo(() => {
    //     data.category.map((cate) => (
    //         str.push(cate.name)
    //     ))
    // },[data.category])

    // console.log((str.slice(0, 3)).join(', '));
    // {user.userName.length > 15 ? (`${user.userName.substring(0,15)}...`) : user.userName}
    console.log(data)
    let avg:number = 0;
    useMemo(() => {
        avg = (data.ratingSum / data.ratingCount) || 0;
    }, [data])

    return (
    <>

        <div className="w-full h-[25rem] border-2 max-w-[16.875rem]">
            <div className="w-full h-[25rem] food-card relative overflow-hidden">
               <div className="w-full h-[16rem]">
                <img
                    src={data.imageData[0] ? String(data.imageData[0].urlImage) : "https://images.unsplash.com/photo-1578944032637-f09897c5233d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"}
                    className="w-full h-full"
                />
               </div>

                <div className="h-[12rem] absolute top-0 right-0 left-0 bottom-0">
                    <div className="content-btn">
                        <button 
                        className="btn-detail"
                        onClick={() => navigate(`/store/${data._id}`)}
                        >See Detail</button>
                    </div>

                    <div className="info-container">
                        <h6 className="title text-xl font-bold">{data.storeName.length > 15 ? (`${data.storeName.substring(0,15)}...`) : data.storeName}</h6>
                        <div className="flex gap-4 justify-center">
                            <Rating
                            value={avg ? Number(avg) : 0}
                            readOnly
                            />
                            <h6 className="text-lg font-semibold">{data.ratingCount}</h6>
                        </div>
                        
                        {data.commentCount === 0 ? <h6 className="text-lg font-semibold text-center">No Review Yet</h6> : <h6 className="text-lg font-semibold text-center">{data.commentCount} Reviews</h6>}
                        <div className={`hide-info flex flex-wrap mt-5 overflow-hidden gap-4 ${!data.category[1] && "justify-center"}`}>
                            <div className="bg-white shadow-md  p-2 hover:bg-slate-100 ">
                                <button className="cursor-pointer">
                                   <RestaurantOutlinedIcon/> {data.category[0].name}
                                </button>
                            </div>
                           {data.category[1] && 
                            <div className="bg-white shadow-md  p-2 hover:bg-slate-100 ">
                            <button className="cursor-pointer">
                               <RestaurantOutlinedIcon/> {data.category[1].name}
                            </button>
                        </div>
                           }
                          

                        </div>
                        </div>

                </div>

            </div>
        </div>


       {/*  <div className="div-contain">
            <div 
            className="food-card" 
            style={{backgroundImage: "url(https://images.unsplash.com/photo-1578944032637-f09897c5233d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ)"}}
            >
                <div className="food-container">
                    <div className="content">
                        <button className="btn-detail">See Detail</button>
                    </div>
                </div>

                <div className="infor-container">
                    <h6 className="title text-2xl font-bold">Aurum Buffet</h6>
                    <div className="flex gap-4 justify-center">
                        <Rating
                        value={5}
                        readOnly
                        />
                        <h6 className="text-lg font-semibold">4.9 Stars</h6>
                    </div>
                        <h6 className="text-lg font-semibold">500 Reviews</h6>
                    <div className="more-infor">
                        <div className="info-date">
                            <div className="box info">
                               Short Detail : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, alias!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
    </>
    )
}