import React from 'react'
import { Trash2, Pencil } from "lucide-react";
import ProgressBar from './ProgressBar';
import AddProgressForm from './AddProgressForm';
import { useState } from 'react';
import DeliverablesCard from './DeliverablesBlock';
import { useMemo } from 'react';
import EditDealForm from './EditDealForm';
const ProgressBarBox = ({ sponsor, dealCompleted, setdealCompleted, onDelete }) => {


  const nodes = useMemo(() =>
    (sponsor.progressHeading || []).map((heading, index) => ({
      heading,
      notes: sponsor.progressNotes?.[index] || "",
      date: sponsor.progressDates?.[index] || "",
    })),
    [sponsor]);
  const [toggleForm, setToggleForm] = useState(false);
  const handleToggle = () => {
    setToggleForm(!toggleForm);
  }
  const [toggleDealForm, setToggleDealForm] = useState(false)

  return (
    <div className='relative w-full shadow-sm  bg-white p-4 rounded-xl hover:shadow-md transition '>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-black">
          {sponsor.company}
        </h2>

        <div className="flex items-center justify-center  gap-4 ">
          <p className="text-sm text-black">
            Alloted to: <span className="font-medium">{sponsor.assignedOC}</span>
          </p>

          {sponsor.dealCompleted ? <>
            <DeliverablesCard sponsor={sponsor} />
            <p className="text-sm  bg-green-50 text-green-700 px-3 py-1 rounded-full font-bold">
              ₹{sponsor.ammount}
            </p>
          </> : <></>}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setToggleDealForm(!toggleDealForm);
            }}
            className="hover:cursor-pointer text-gray-400 hover:text-blue-500 transition"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => onDelete(sponsor.id)}
            className="p-1 rounded hover:cursor-pointer hover:bg-red-100 text-red-500"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </div>

      <ProgressBar
        id={sponsor.id}
        steps={nodes}
        dealCompleted={dealCompleted}
        setdealCompleted={setdealCompleted}
      />
      <div className='w-full flex justify-end mt-3'>


        <button onClick={handleToggle} className='  px-3 py-2 font-semibold text-white bg-[#0B1324] rounded-lg cursor-pointer'>
          + Add Progress
        </button>

      </div>
      {toggleDealForm && (
        <EditDealForm
          id={sponsor.id}
          sponsor={sponsor}
          toggleForm={toggleDealForm}
          setToggleForm={setToggleDealForm}
          setdealCompleted={setdealCompleted}
        />
      )}
      {toggleForm ? <AddProgressForm dealCompleted={dealCompleted} setdealCompleted={setdealCompleted} id={sponsor.id} setToggleForm={setToggleForm} toggleForm={toggleForm} /> : <></>}
    </div>
  )
}

export default ProgressBarBox
