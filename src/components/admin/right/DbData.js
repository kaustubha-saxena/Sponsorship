import React from 'react'

const DbData = ({contactslength, cclength, oclength}) => {
  return (
    <div className='p-6 w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className="bg-white rounded-2xl shadow-sm border h-35  p-6 flex flex-col justify-between hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm font-medium">Total Contacts</p>
                {/* <span className="text-orange-500 text-xl">⏳</span> */}
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mt-4">
                {contactslength}
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm font-medium">Total CCs</p>
                {/* <span className="text-orange-500 text-xl">⏳</span> */}
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mt-4">
                {cclength}
               
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm font-medium">Total OCs</p>
                {/* <span className="text-orange-500 text-xl">⏳</span> */}
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mt-4">
                {oclength}
                
    
              </h2>
            </div>
    
    
          </div>
  )
}

export default DbData
