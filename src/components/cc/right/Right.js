import React from 'react'
import Report from './Report'
import AddContactBtn from '@/components/AddContact/PushBtn';
const Right = () => {
  return (
    <div className='bg-red-500 w-full min-h-full'>
      <Report />
      <AddContactBtn />
    </div>
  )
}

export default Right
