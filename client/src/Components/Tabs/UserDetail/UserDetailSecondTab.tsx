import React, {useMemo} from 'react'
import { useNavigate } from "react-router-dom";
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import Rating from "@mui/material/Rating";
import { StateProps } from '../../../Pages/User/UserDetail';
import { BookMark } from "../../../Interface/user.interface";

interface UserDetailSecondTabProps {
    
    book:BookMark

}

export const UserDetailSecondTab: React.FC<UserDetailSecondTabProps> = ({book}) => {
    const navigate = useNavigate();
    
    // console.log(state)

    let avg:number = 0;
    useMemo(() => {
        avg = (book.ratingSum / book.ratingCount) || 0;
    }, [book])

    console.log("BOOK => ",book);


    return (
    <>

        <div className="max-w-[18.75rem]">
            
            <div className="w-full h-[25rem] border-2">
                <div className="w-full h-[25rem] food-card relative overflow-hidden">
                    <div className="w-full h-[16rem]">
                        <img
                        src={book.imageData[0]?.urlImage ? String(book.imageData[0].urlImage) : "https://images.unsplash.com/photo-1578944032637-f09897c5233d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"}
                        className="w-full h-full"
                        />
                    </div>

                    <div className="h-[12rem] absolute top-0 right-0 left-0 bottom-0">
                        <div className="content-btn">
                            <button 
                            className="btn-detail"
                            onClick={() => navigate(`/store/${book._id}`)}
                            >See Detail</button>
                        </div>

                    <div className="info-container">
                    <h6 className="title text-xl font-bold">{book.storeName.length > 15 ? (`${book.storeName.substring(0,15)}...`) : book.storeName}</h6>
                    <div className="flex gap-4 justify-center">
                        <Rating
                            value={avg ? Number(avg) : 0}
                            readOnly
                        />
                        <h6 className="text-lg font-semibold">{book.ratingCount}</h6>
                    </div>

                    {book.commentCount === 0 ? <h6 className="text-lg font-semibold text-center">No Review Yet</h6> : <h6 className="text-lg font-semibold text-center">{book.commentCount} Reviews</h6>}
                        <div className={`hide-info flex flex-wrap mt-5 overflow-hidden gap-4 ${!book.category[1] && "justify-center"}`}>
                            <div className="bg-white shadow-md  p-2 hover:bg-slate-100 ">
                                <button className="cursor-pointer">
                                   <RestaurantOutlinedIcon/> {book.category[0].name}
                                </button>
                            </div>
                           {book.category[1] && 
                            <div className="bg-white shadow-md  p-2 hover:bg-slate-100 ">
                                <button className="cursor-pointer">
                                <RestaurantOutlinedIcon/> {book.category[1].name}
                                </button>
                            </div>
                            }
                        </div>

                    </div>

                    </div>
                </div>
            </div>
            
        </div>

    </>
    )
}