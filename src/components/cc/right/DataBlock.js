import React from 'react'

import Data from "@/components/oc/Data";
import { useUser } from "@/app/context/UserContext";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AddBtn from "@/components/AddBtn";
import InputForm from "@/components/AddContact/InputForm";



const DataBlock = ({ assignedContacts }) => {
     console.log("assignedContacts", assignedContacts);
     
    
    const { user } = useUser();
    const [searchContact, setsearchContact] = useState("")
     const [openForm, setOpenForm] = useState(false);
      
     const handleChange=(e)=>{
        setsearchContact(e.target.value)
        // filterContacts();
     }
    
  
// const filterContacts = (assignedContacts, searchText) => {
//   if (!searchText) return assignedContacts;

//   const search = searchContact.toLowerCase();

//   return assignedContacts.filter((contact) => {
//     return (
//       assignedContacts.name?.toLowerCase().includes(search) ||
//       assignedContacts.companyName?.toLowerCase().includes(search) ||
//       assignedContacts.email?.toLowerCase().includes(search)
//     );
//   });
// };


//   const toggleForm = () => {
//     setOpenForm(prev => !prev);

//   };

    return (
        <>
            <div className='  bottom-0 absolute  h-[70%] w-full p-5  '>
                <div className='flex justify-between items-center rounded-lg px-4'>
                    <div className='flex items-center justify-start gap-5  w-[60%]'>
                        <input value={searchContact} onChange={handleChange} className=" text-black m-2 px-1 py-2 w-[60%] rounded-md border-none bg-white " type="text" placeholder='Search by company, name or email' />
                        <button className=''>
                            <Image src="/filter.png" alt="Search" width={20} height={20} />
                        </button>
                    </div>
                    <div>
                        {/* <AddBtn toggleForm={toggleForm}/> */}
                          {/* {openForm && <InputForm toggleForm={toggleForm}/>} */}
                    </div>


                </div>
                {/* {
                    searchContact===""?<><Data contacts={assignedContacts}  /></>:<>
                    { assignedContacts.name?.toLowerCase().includes(search) ||
    assignedContacts.companyName?.toLowerCase().includes(search) ||
    assignedContacts.email?.toLowerCase().includes(search)?<><Data contacts={filteredContacts}  /></>:<></>}
                    
                    </>
                } */}
                {
                    searchContact===""?<><Data contacts={assignedContacts}  /></>:<></>
                }
                
            </div>
        </>
    )
}

export default DataBlock
