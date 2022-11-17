import React from 'react'
import { TabsDetailState } from './TabsDetailStore'

interface SecondIndexProps {
    state:TabsDetailState;
    
}

export const SecondIndex: React.FC<SecondIndexProps> = ({state}) => {
    
  console.log(state)

  return (
    <>
   
   <div className="flex flex-col  p-8 md:p-12">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 shadow-md sm:rounded-lg bg-[#6E845D] ">
    <div className="py-2 inline-block min-w-full ">
      <div className="overflow-hidden">
        <table className="text-center min-w-full">
          <thead className="bg-[#6E845D] text-white border-b text-xl">
            <tr className="text-center">
              <th scope="col" className="font-medium px-6 py-4">
              Pictures
              </th>
              <th scope="col" className="font-medium px-6 py-4">
              Menu Name
              </th>
              <th scope="col" className="font-medium px-6 py-4">
              Price
              </th>
            </tr>
          </thead>
          <tbody className="text-3xl font-medium">
            {state.store?.menuList.map((menu,i) => (
              <tr key={i} className="border-b transition duration-300 ease-in-out hover:bg-slate-100 odd:bg-white even:bg-slate-50">
              <td className="px-6 py-4 whitespace-nowrap text-gray-900 w-[12rem] h-[16rem] object-fill">
                {menu.urlImage ? 
                  <img
                  className="w-full h-full object-fill border-[1px] border-gray-400"
                  src={menu.urlImage}
                  />
                  :
                  <h6 className="">No Image Yet</h6>
                }
              </td>
              <td className="text-gray-900 px-6 py-4 whitespace-nowrap">
                {menu.text}
              </td>
              <td className="text-gray-900 px-6 py-4 whitespace-nowrap">
                {String(menu.price)}
              </td>
            </tr>
            ))}
           
           
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </>
    )
}