import React from 'react'

const OCbox = ({item,  setSelectedOCid}) => {
  


  const handleClick = () => {
   
    
    setSelectedOCid(item.uid);
  };
    
  return (
     <button onClick={handleClick} className="p-2 rounded-md bg-amber-50 w-full text-black hover:bg-white/10 flex items-center justify-start hover:cursor-pointer">
           
           
          
            <p className="text-sm">{item.name}</p>
          
          </button>
  )
}

export default OCbox