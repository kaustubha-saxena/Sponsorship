import React from 'react'
import ProgressBar2 from './ProgressBar';
import AddProgressForm from './AddProgressForm';
import { useState } from 'react';
import DeliverablesCard from './DeliverablesBlock';
const ProgressBarBox = ({ sponsor, dealCompleted, setdealCompleted }) => {



  const nodes = (sponsor.progressHeading || []).map((heading, index) => ({
    heading,
    notes: sponsor.progressNotes?.[index] || "",
    date: sponsor.progressDates?.[index] || "",
  }));
  const [toggleForm, setToggleForm] = useState(false);
  const handleToggle = () => {
    setToggleForm(!toggleForm);
  }


  return (
    <div className='relative w-full shadow-sm  bg-white p-4 rounded-xl hover:shadow-md transition '>
     <div className="flex items-center justify-between mb-4">
  <h2 className="text-xl font-semibold">
    {sponsor.company}
  </h2>

  <div className="flex items-center justify-center  gap-4 ">
    <p className="text-sm text-gray-600">
      Alloted to: <span className="font-medium">{sponsor.assignedOC}</span>
    </p>

    {sponsor.dealCompleted? <>
    <DeliverablesCard sponsor={sponsor} />
    <p className="text-sm  bg-green-50 text-green-700 px-3 py-1 rounded-full font-bold">
      ₹{sponsor.ammount}
    </p>
    </>:<></>}
  </div>
</div>
      {/* <div className='w-full flex flex-col justify-start items-start mb-2 '>

        <h3 className='font-semibold text-xl' >{sponsor.company}</h3>
        <h6 className='text-sm font-medium'>Alloted to: {sponsor.assignedOC}</h6>
      </div> */}
      <ProgressBar2 steps={nodes} dealCompleted={dealCompleted}
        currentStep={1} />
      <div className='w-full flex justify-end mt-3'>


        {dealCompleted ? <></> : <button onClick={handleToggle} className='  px-3 py-2 font-semibold text-white bg-[#0B1324] rounded-lg cursor-pointer'>
          + Add Progress
        </button>}

      </div>
      {toggleForm ? <AddProgressForm dealCompleted={dealCompleted} setdealCompleted={setdealCompleted} id={sponsor.id} setToggleForm={setToggleForm} toggleForm={toggleForm} /> : <></>}
    </div>
  )
}

export default ProgressBarBox
