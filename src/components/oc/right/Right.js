import React from 'react'
import Data from '@/components/Data';
import AddContactBtn from '@/components/AddContactBtn';
// import Data from '@/components/Data';
const Right = () => {
  return (
    <div className='bg-red-500 w-5/6 min-h-full'>
   
      <AddContactBtn />
        <Data />
    </div>
  )
}

export default Right
