import React from 'react'
import Report from './Report'
import AddContactBtn from '@/components/AddContact/PushBtn';
const Right = ({selectedOCid}) => {
  console.log("aslfhjskfn ksajfalksfakl",selectedOCid);
  
  
  return (
    <div className='bg-red-500 w-full min-h-full'>
      <Report ocId={selectedOCid} />
      <AddContactBtn />
    </div>
  )
}

export default Right
