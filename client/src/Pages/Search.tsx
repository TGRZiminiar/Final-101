import React, { useEffect, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { AccordionSearch } from '../Components/Accordion/AccordionSearch';
import { Autocomplete, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchBox } from './Home';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { ListAllCategoriesSearch } from '../Function/category.func';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { Popular, SearchFunction } from '../Function/user';
import { SearchResult } from '../Interface/store.interface';
import { CardHome } from '../Components/Card/CardHome';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams,useNavigate } from 'react-router-dom';
interface StateProps {
    restaurant:string;
    location:string;
    categories:SingleCategory[] | null;
    selectCategory:SingleCategory | null;
    popular: Popular;
    loading:boolean;
    data:SearchResult[];
    show:boolean;
}
type SingleCategory = {
    _id:string;
    name:string;
}
export const Search: React.FC = () => {
    const navigate = useNavigate();
    const [state,setState] = useState<StateProps>({
        restaurant:"",
        location:"",
        categories:[],
        selectCategory:null,
        popular:"",
        loading:false,
        data:[],
        show:false
    })
    // console.log(window.location.search.split("&"))
    const {categoryId,categoryName} = useParams(); 
    const query = window.location.search.split("&");

    const loadCategories = async() => {
        await ListAllCategoriesSearch()
        .then((res:AxiosResponse) => {
            const tempArr:string[] = [];
            // for (let i = 0; i < res.data.category.length; i++) {
            //     tempArr.push(res.data.category[i].name)
            // }
            setState(prev => ({...prev,categories:res.data.categories}));
            window.scrollTo(0,0);
        })
        .catch((err:AxiosError) => {
            // toast.error("Something Went Wronge Try Again Later");
        })
    }

    useEffect(() => {
        
        console.log(query);
        let searchQuery = query[0]?.substring(8);
        let categoryQuery = query[1]?.substring(9);
        // console.log("THIS IS SEARCH QUERY",searchQuery)
        // console.log("THIS IS CATEGORY QUERY",categoryQuery)
        
        loadCategories();
        if(searchQuery !== "%22%22"){
            setState(prev => ({...prev, loading:true}))
            const {restaurant, location, selectCategory, popular, categories} = state;
            
            SearchFunction(searchQuery, location, String(selectCategory?._id), popular)
            .then((res:AxiosResponse) => {
                setState(prev => ({...prev,data:res.data.data, loading:false}))
                navigate(`/search?search=${searchQuery}&category=\"\"`)
            })
            .catch((err:AxiosError) => {
                console.log(err);
                setState(prev => ({...prev, loading:false}))
                // toast.error("Something Went Wronge")
            })
        }
        else if(categoryQuery !== "%22%22"){
            setState(prev => ({...prev, loading:true}))
            const {restaurant, location, selectCategory, popular, categories} = state;
         
            SearchFunction(restaurant, location, categoryQuery, popular)
            .then((res:AxiosResponse) => {
                setState(prev => ({...prev,data:res.data.data, loading:false}))
                navigate(`/search?search=\"\"&category=${categoryQuery}`)
            })
            .catch((err:AxiosError) => {
                console.log(err);
                setState(prev => ({...prev, loading:false}))
                // toast.error("Something Went Wronge")
            })
            
        }
        else if(searchQuery && categoryQuery !== "%22%22"){
            setState(prev => ({...prev, loading:true}))
            const {restaurant, location, selectCategory, popular, categories} = state;
            
            SearchFunction(searchQuery, location, categoryQuery, popular)
            .then((res:AxiosResponse) => {
                setState(prev => ({...prev,data:res.data.data, loading:false}))
                navigate(`/search?search=${searchQuery}&category=${categoryQuery}`)
                
            })
            .catch((err:AxiosError) => {
                console.log(err);
                setState(prev => ({...prev, loading:false}))
                // toast.error("Something Went Wronge")
            })

        }

    }, [])
    

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setState(prev => ({...prev, loading:true}))
        const {restaurant, location, selectCategory, popular, categories} = state;
        // for (let i = 0; i < categories.length; i++) {
        //     // if(categories[i].name === selectCategory){
        //     //     categoryId = categories[i]._id;
        //     //     break;
        //     // }            
        // }
        await SearchFunction(restaurant, location, selectCategory?._id as string, popular)
        .then((res:AxiosResponse) => {
            setState(prev => ({...prev,data:res.data.data, loading:false}));
            navigate(`/search?search=${restaurant}&category=${selectCategory?._id}&location=${location}`);
        })
        .catch((err:AxiosError) => {
            console.log(err);
            setState(prev => ({...prev, loading:false}));
            // toast.error("Something Went Wronge")
        })
        // navigate(`/search?search=${state.search}&category=\"\"`)

    }
    console.log(state)

    return (
    <>
    <div className=" h-auto mx-auto bg-white w-full md:w-[75%] pt-[7vh] min-h-screen">
        <form onSubmit={handleSubmit} className="px-16">
            <div className=" p-4">
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                    <SearchBox
                        placeholder="Search By Restaurant Name"
                        fullWidth
                        className='rounded-md'
                        value={state.restaurant}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev,restaurant:e.target.value}))}
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
                        value={state.location}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev,location:e.target.value}))}
                        fullWidth
                        className='rounded-md'
                        InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                        <LocationOnOutlinedIcon className="text-red-500" />
                        </InputAdornment>
                        ),
                        }}
                        variant="outlined"
                    />
                </div>
                <div className="col-span-4">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-3">
                            <button type={"submit"} className="bg-[#CCAF63] py-1 px-2 md:py-3 md:px-4 text-xl text-white rounded-lg text-center w-full h-full hover:bg-[#dabc73]">
                            <div className="flex gap-4 justify-center self-center">
                            <h6><SearchOutlinedIcon className="self-center mb-1" /> Search</h6>
                            </div>
                            </button>
                        </div>
                        <div className="col-span-1">
                            <button 
                            type={"button"} 
                            className="bg-[#6E845D] py-1 px-2 text-xl text-white rounded-lg text-center w-full h-full hover:bg-[#88a076]"
                            onClick={() => setState(prev => ({...prev,show:!prev.show}))}
                            >
                            <div className="flex gap-4 justify-center self-center">
                            <h6>{state.show ? <FilterAltOffOutlinedIcon className="self-center mb-1" /> : <FilterAltOutlinedIcon className="self-center mb-1" />} Option</h6>
                            </div>
                            </button>
                        </div>
                    </div>
                </div>

                {state.show && 
                <div className="col-span-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    {state.categories && 
                        <Autocomplete
                        sx={{marginTop:1}}
                        options={state.categories}
                        freeSolo
                        value={state.selectCategory!}
                        //@ts-ignore
                        getOptionLabel={option => option.name}
                        //@ts-ignore
                        onChange={(event: any, value: (string | SingleCategory)) => setState(prev => ({...prev,selectCategory:value! as SingleCategory}))}
                        fullWidth
                        
                        renderInput={(params:any) => (
                            <TextField
                            {...params}
                            fullWidth
                            placeholder="Categories"
                            //   helperText="เมื่อพิมเสร็จแล้วให้กด Enter ระบบถึงจะบันทึก tag ให้ ปล.ไม่สามารถเกิน 10 tags"
                            />
                        )}
                        />
                        
                        }
                        </div>
                    <div className="self-center mt-2">
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Popular</InputLabel>
                    <Select
                    value={state.popular}
                    placeholder="Popular"
                    //@ts-ignore
                    onChange={(e:SelectChangeEvent) => setState(prev => ({...prev,popular:e.target.value as string}))}
                    >
                    <MenuItem value={"rating"}>Most Rating</MenuItem>
                    <MenuItem value={"comment"}>Most Comment</MenuItem>
                    </Select>
                </FormControl>
                    </div>

                </div>
                </div>
                }

                <div className="col-span-4 ">
                   <div className="grid grid-cols-1  min-[600px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 items-center">
                   {state?.data.map((data,i) => (
                        <CardHome
                        key={i}
                        data={data}
                        />
                    ))}
                   </div>
                </div>

            </div>
            </div>
        </form>
    </div>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.loading}
        onClick={() => setState(prev => ({...prev,loading:!prev.loading}))}
        >
    <CircularProgress color="inherit" />
    </Backdrop>
    </>
    )
}
