import React from 'react'
import { useEffect, useState } from "react";
import Report from './Report';
import AddContactBtn from '@/components/AddContact/PushBtn';
import DataBlock from './DataBlock';
import { supabase } from "@/lib/supabase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
const Right = ({selectedOCid}) => {

 console.log(selectedOCid, "selectedOCid in right component");
 

  const [assignedContacts, setassignedContacts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [noOfCalls, setNoOfCalls] = useState(0);
      const [noOfEmails, setNoOfEmails] = useState(0);
      const [noOfInterestedContact, setnoOfInterestedContact] = useState(0);
      


    useEffect(() => {
        const assignedContacts = async () => {
    
          
    
          setLoading(true);
    
          const { data, error } = await supabase
            .from("contacts")
            .select("*")
            .eq("assignedTo", selectedOCid);
    
          if (error) {
            console.error("Error fetching contacts:", error);
          } else {
            setassignedContacts(data);
          }
    
          setLoading(false);
        };
    
        assignedContacts();
    
      }, [selectedOCid]);
  return (
    <div className='bg-gray-50 w-5/6 min-h-full h-full absolute right-0'>
      <Report assignedContacts={assignedContacts} />
      {/* <AddContactBtn /> */}
      <DataBlock assignedContacts={assignedContacts} />
    </div>
  )
}

export default Right