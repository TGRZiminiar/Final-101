import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const Redirect: React.FC = () => {
    
    const {link} = useParams();

    useEffect(() => {
        
        window.location.href = String(link);
    
    }, [])
    console.log(link)

    return (
    <div className="text-center flex justify-center h-screen items-center">
        <CircularProgress/>
    </div>
    )
}