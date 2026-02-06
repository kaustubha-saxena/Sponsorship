import React from 'react'

const AddBtn = ({ toggleForm }) => {
  return (
   <>
   <button onClick={toggleForm} className="px-4 py-2 bg-amber-600 text-white rounded-md cursor-pointer  hover:bg-amber-700">
      Add Contact
    </button>
   
   </>
  )
}

export default AddBtn
