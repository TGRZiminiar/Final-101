import React, { useEffect } from 'react';
import './App.css';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from './Pages/Home';
import { Admin } from './Pages/Admin';
import { AdminLayout } from './Layout/AdminLayout';
import { CreateCategory } from './Pages/Admin/CreateCategory';
import { Register } from './Pages/Register';
import { toast } from 'react-toastify';
import { Login } from './Pages/Login';
import { GetCurrentUser } from './Function/user';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { ResultCurrentUser } from './Interface/Auth.Interface';
import { AxiosError } from 'axios';
import { CreateStore } from './Pages/Admin/CreateStore';
function App() {

  const dispatch = useDispatch();
  const value = useSelector(state => state)
 
  // useEffect(() => {
  //   console.log(value)
  
  // }, [value])
  

  useEffect(() => {
    const token = Cookies.get('access_token')
    if(token !== undefined) {
      GetCurrentUser(token)
      .then((res)=>{
        //console.log(res.data)
        // const {email,image,coin,userName,role,gender,_id,notiCount} = res.data!
        const {userImage, gender, role, userName, email, _id} = res.data.user;
          dispatch({
            type:"LOGIN_USER",
            payload:{
              userImage:userImage,
              gender:gender,
              role:role,
              userName:userName,
              email:email,
              userId:_id
            },
          })  
       
      })
      .catch((err:AxiosError) => {
        console.log("THIS IS ERROR" ,err)
        toast.error(err.response?.data as string)
    })
    }
  }, [])

  return (
      <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route index path="/register" element={<Register/>}/>
        <Route index path="/login" element={<Login/>}/>

        <Route element={<AdminLayout/>}>
        <Route index path="/admin" element={<Admin/>}/>
          <Route path="/admin/create-category" element={<CreateCategory/>}/>
          <Route path="/admin/create-store" element={<CreateStore/>}/>
        </Route>
      </Routes>
    );
}

export default App;
