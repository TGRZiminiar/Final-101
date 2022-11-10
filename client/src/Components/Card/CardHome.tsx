import React,{useMemo} from 'react'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useNavigate } from "react-router-dom";
import { Store } from '../../Pages/Home';

interface CardHomeProps {
    data:Store;
}   

export const CardHome: React.FC<CardHomeProps> = ({data}) => {
    
    const navigate = useNavigate();
    let str:string[] = [];

    const memo = useMemo(() => {
        data.category.map((cate) => (
            str.push(cate.name)
        ))
    },[data.category])

    // console.log((str.slice(0, 3)).join(', '));
  
    return (
    <>
     <div className="p-4 bg-white shadow-2xl hover:shadow-slate-400 cursor-pointer " onClick={() => navigate(`/store/${data._id}`)}>
        <div className="grid">
            <div className="w-full h-[12rem]">
            <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&" className="w-full h-full object-contain" />
            </div>
       
        <h4 className="text-2xl font-semibold mt-1">{data.storeName}</h4>
        <h4  className="text-lg font-semibold">{String((str.slice(0, 3)).join(', '))}</h4>
        
        <div className="flex gap-2">
            {/* <div className="bg-[#BF1A1A] text-[#ECD146] p-1"> */}
            <div className="flex gap-1">
                <StarOutlinedIcon className="text-yellow-500"/>
            <p className="text-base font-medium">{data.ratingSum} STARS</p>
            </div>

            <br/>
            <div className="flex gap-1">
            <BorderColorOutlinedIcon fontSize='small' className="text-amber-700"/>
            <p className="text-base font-medium">{data.commentCount} reviews</p>

            </div>
        </div>
        </div>
    </div>    
    </>
    )
}