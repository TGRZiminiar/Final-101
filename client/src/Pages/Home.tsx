import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import utf8 from "utf8"
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import { Link } from 'react-router-dom';
import axios from "axios"
export const Home: React.FC = () => {

    const dispatch = useDispatch();
    
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


    return (
    <>
        <div className="w-full bg-white  h-[7vh] text-black text-xl border-b-2 shadow-sm">
            <div className="flex justify-around self-center h-full items-center">
                <div>
                    <h6>LOGO</h6>
                </div>
                <div className="flex gap-4 md:gap-8">
                    <div className="hidden">
                    <MenuOutlinedIcon />
                    </div>

                <div className="  relative">
               
                    <div className="flex border-2 rounded-3xl gap-4 p-1  max-h-[5vh]" onClick={handleOpen}>
                        <div className="max-w-[2rem] cursor-pointer">
                            <img src="https://www.w3schools.com/howto/img_avatar.png" className="rounded-full w-full h-full" />
                        </div>
                        <div className="self-center text-base font-bold cursor-pointer">
                            {name.length > 15 ? (`${name.substring(0,15)}...`) : name}
                        </div>
                    </div>

               {state.open && 
                <div className="absolute bg-white shadow-xl drop-shadow-lg w-full h-[20rem] left-0 top-[5vh] p-2">
                <div className="grid">
                    <div className="flex border-b-2 hover:bg-slate-200 justify-evenly cursor-pointer">
                        <div className="flex gap-4 selfe-center place-items-center">
                        <SupervisorAccountOutlinedIcon/>
                        <h6><Link to="/admin">Admin</Link></h6>
                        </div>
                        <div/>
                    </div>
                </div>
            </div>
               }
                </div>

                </div>
            </div>
        </div>


        <div className="grid">
            <div className="w-full h-[25rem]">
            <img src="https://m.media-amazon.com/images/I/61+oIVFF7FL.png" className="w-full h-full object-cover"/>
            </div>
            <div className="bg-white h-full mx-auto w-[100vh]">
               hello
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