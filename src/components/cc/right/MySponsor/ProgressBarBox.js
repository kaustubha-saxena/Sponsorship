import React from 'react'
import ProgressBar2 from './ProgressBar';
import AddProgressForm from './AddProgressForm';
import { useState } from 'react';

const ProgressBarBox = ({sponsor,dealCompleted,setdealCompleted}) => {



 const nodes = (sponsor.progressHeading || []).map((heading, index) => ({
    heading,
    notes: sponsor.progressNotes?.[index] || "",
    date: sponsor.progressDates?.[index] || "",
  }));
const [toggleForm, setToggleForm] = useState(false);
const handleToggle=()=>{
    setToggleForm(!toggleForm);
}


  return (
     <div className='relative w-full shadow-sm  bg-white p-4 rounded-xl hover:shadow-md transition '>
          <div className='w-full flex justify-between items-center'>
    
    <h3 className='font-semibold text-xl' >{sponsor.company}</h3>
    <h6>Alloted to: {sponsor.assignedOC}</h6>
          </div>
    <ProgressBar2 steps={nodes} dealCompleted={dealCompleted}
 currentStep={1} />
    <div  className='w-full flex justify-end mt-3'>
    
   
    {dealCompleted?<></>: <button onClick={handleToggle} className='  px-3 py-2 font-semibold text-white bg-[#0B1324] rounded-lg cursor-pointer'>
      + Add Progress
    </button>}

    </div>
    {toggleForm?<AddProgressForm dealCompleted={dealCompleted} setdealCompleted={setdealCompleted} id={sponsor.id} setToggleForm={setToggleForm} toggleForm={toggleForm}/>: <></>}
        </div>
  )
}

export default ProgressBarBox
