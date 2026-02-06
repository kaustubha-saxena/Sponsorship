"use client";
import React, { useState } from "react";
import InputForm from "@/components/AddContact/InputForm";
import AddBtn from "@/components/AddBtn";
import DataBlock from "@/components/DataBlock";
const Right = () => {
  const [openForm, setOpenForm] = useState(false);

  const toggleForm = () => {
    setOpenForm(prev => !prev);
    console.log(openForm);
    
  };

  return (
    <div className="bg-red-500 w-5/6 min-h-full">
      <AddBtn toggleForm={toggleForm} />

      {openForm && <InputForm toggleForm={toggleForm}/>}
<DataBlock/>
    </div>
  );
};

export default Right;
