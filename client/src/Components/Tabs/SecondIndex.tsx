import React from 'react'

interface SecondIndexProps {

}

export const SecondIndex: React.FC<SecondIndexProps> = ({}) => {
    return (
    <>
   
<div className="overflow-x-auto relative rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="uppercase bg-[#505e45] text-white rounded-lg text-lg border-b-2 border-[#8A7255]">
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
            <tr className="border-b bg-[#6E845D] border-gray-700 rounded-lg text-white">
                <th scope="row" className="py-4 px-6 font-medium  whitespace-nowrap">
                    Apple MacBook Pro 17"
                </th>
                <td className="py-4 px-6">
                    40 Baht
                </td>
                
            </tr>
          
           
        </tbody>
    </table>
</div>

    </>
    )
}