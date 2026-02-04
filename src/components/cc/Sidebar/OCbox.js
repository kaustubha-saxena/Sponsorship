import React from 'react'

const OCbox = (item) => {
    // console.log(item.item.name);
    
  return (
     <button className="p-2 rounded-md bg-amber-50 w-full text-black hover:bg-white/10 flex items-center justify-start hover:cursor-pointer">
           
            {/* className={`p-2 rounded-md ${
              item.active ? "bg-blue-600" : "hover:bg-white/10"
            }`} */}
          
            <p className="text-sm">{item.item.name}</p>
          
          </button>
  )
}

export default OCbox
