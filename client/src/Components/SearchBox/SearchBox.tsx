import React from 'react'
import "./SearchBox.css"
interface SearchBoxProps {
  value:string;
  className?:string | React.HTMLAttributes<HTMLDivElement>;
  onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?:string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({className,value,placeholder,onChange}) => {



  return (
    <>
   <form className="nosubmit">
  <input className={`nosubmit text-black placeholder:text-black z-40 ${className ? className : ""}`} 
    type="search" 
    placeholder={placeholder ? placeholder : "Search..."} 
    value={value}
    onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChange(e)}
    />
    </form>
    </>
    )
}