import React, {useMemo} from 'react'
import { useNavigate } from "react-router-dom";
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import Rating from "@mui/material/Rating";
import { StateProps } from '../../../Pages/User/UserDetail';
import { BookMark, UserBookMark } from "../../../Interface/user.interface";
import { CardHome } from '../../Card/CardHome';

interface UserDetailSecondTabProps {
    
    book:UserBookMark

}

export const UserDetailSecondTab: React.FC<UserDetailSecondTabProps> = ({book}) => {
    const navigate = useNavigate();
    
    // console.log(state)

    // let avg:number = 0;
    // useMemo(() => {
    //     avg = (book.ratingSum / book.ratingCount) || 0;
    // }, [book])

    // console.log("BOOK => ",book);
    console.log("THIS IS BOOK =>",book)

    return (
    <>
        {book?.bookMark && book.bookMark.map((book,i) => (
            <CardHome
            data={book}
            key={i}
            />
        ))}

    </>
    )
}