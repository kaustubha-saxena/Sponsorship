import React from 'react'
import AddUser from '../AddUser'
import AllotContactsButton from './AllotContactsButton'
import TransferContactsBetweenOCs from './TransferContactsBetweenOCs'
const Right = () => {
  return (
    <div className=' relative w-full min-h-full bg-gray-50'>
      <AddUser/>
      <AllotContactsButton/>
      <TransferContactsBetweenOCs/>
    </div>
  )
}

export default Right
