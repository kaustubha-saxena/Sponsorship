import React from 'react'

const AddBtn = ({ toggleForm }) => {
  return (
   <>
   <button onClick={toggleForm} className="px-4 py-2 bg-[#15213c] text-white rounded-md cursor-pointer  hover:bg-[#0B1324]">
      Add Contact
    </button>
   
   </>
  )
}

export default AddBtn
