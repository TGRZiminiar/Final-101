import React from 'react'
import { TabsDetailState } from './TabsDetailStore'

interface SecondIndexProps {
    state:TabsDetailState;
    
}

export const SecondIndex: React.FC<SecondIndexProps> = ({state}) => {
    return (
    <>
   
<div className="overflow-x-auto relative rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="uppercase bg-[#505e45] text-white rounded-lg text-lg border-b-2 border-white">
            <tr>
                <th scope="col" className="py-3 px-6">
                    Menu Name
                </th>
                <th scope="col" className="py-3 px-6">
                    Price
                </th>
               
            </tr>
        </thead>
        
        <tbody>
            {state.store?.menuList.map((menu,i) => (
                <tr className={`border-b border-gray-700 rounded-lg text-white ${i % 2 === 0 ? "bg-[#809c6b] hover:bg-[#7e956c]" : "bg-[#7e956c] hover:bg-[#809c6b]"}`} key={i}>
                    <th scope="row" className="py-4 px-6 font-medium  whitespace-nowrap">
                        {menu.text}
                    </th>
                    <td className="py-4 px-6">
                        {menu.price} Baht
                    </td>
                </tr>

            ))}
          
           
        </tbody>
    </table>
</div>

    </>
    )
}