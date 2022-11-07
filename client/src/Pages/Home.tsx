import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import utf8 from "utf8"
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios"
import { Button, TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { styled } from '@mui/material/styles';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Navbar } from '../Components/Navbar';
const SearchBox = styled(TextField)(() => ({
    '& input': {
      paddingLeft: '30px',
    },
    '& fieldset': {
      borderRadius: '30px',
    },
  }));


export const Home: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        
        dispatch({
            type:"LOGIN_USER",
            payload:{
              email:"Hello" || null,
            },
          }) 
          
    }, [])
    
    const name = "นายชิษณุพงศ์ เจตน์อัศวภิรมย์";
    
    const [state,setState] = useState({
        open:false,
        img:[],
    })

    const handleOpen = ():void => {
        setState(prev=>({...prev,open:!prev.open}));
    }

    
   /*  const loadImage = async() => {
        return await axios.get(`http://localhost:5000/api/test2`)
    }

    useEffect(() => {
      loadImage()
      .then(res => setState(prev=>({...prev,img:res.data.img})))
      
    }, [])
    console.log(state) */
    console.log(state)

    const onClose = () => {
        setTimeout(() => {
            console.log("ON CLOSE")
            setState(prev =>({...prev,open:false}))
        }, 50);

    }

    return (
    <>
        <div className="w-full">

        <div className="">
            <div className="w-full h-[25rem] ">
            <img src="https://m.media-amazon.com/images/I/61+oIVFF7FL.png" className="w-full h-full object-cover"/>
            </div>
            <div className="bg-white h-full mx-auto w-[75%] ">
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

            <div className="w-full bg-[#A0412B] p-8 text-center text-[#BB9C78] font-extrabold text-4xl mt-16">
                <h4>RECOMMENDED BY OTHER PEOPLE</h4>
            </div>

            <div className="p-8 px-16">
                <div className="grid grid-cols-3 justify-items-center">

                    <div className="p-4 bg-white shadow-2xl hover:shadow-slate-400 cursor-pointer hover:-translate-y-5" onClick={() => navigate(`/store/${1}`)}>
                        <div className="grid">
                        <div className="w-full h-[12rem]">
                        <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&" className="w-full h-full object-contain" />
                        </div>
                        <h4 className="text-2xl font-semibold mt-1">Mix Store</h4>
                        <h4 className="text-lg font-semibold mt-1">Japan Food, Buffet</h4>
                       
                        <div className="flex gap-2">
                            {/* <div className="bg-[#BF1A1A] text-[#ECD146] p-1"> */}
                            <div className="flex gap-1">
                                <StarOutlinedIcon className="text-yellow-500"/>
                            <p className="text-base font-medium">4.9 STARS</p>
                            </div>

                            <br/>
                            <div className="flex gap-1">
                            <BorderColorOutlinedIcon fontSize='small' className="text-amber-700"/>
                            <p className="text-base font-medium">500 reviews</p>

                            </div>
                        </div>
                        </div>
                    </div>
                    
                    
                    <div>
                        hello
                    </div>
                    <div>
                        hello
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