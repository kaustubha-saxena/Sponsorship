import React from 'react'
import { useEffect, useState } from "react";
import Report from './Report';
import AddContactBtn from '@/components/AddContact/PushBtn';
import DataBlock from './DataBlock';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
const Right = ({selectedOCid}) => {

 

  const [assignedContacts, setassignedContacts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [noOfCalls, setNoOfCalls] = useState(0);
      const [noOfEmails, setNoOfEmails] = useState(0);
      const [noOfInterestedContact, setnoOfInterestedContact] = useState(0);
      useEffect(() => {
              const fetchassignedContacts = async () => {
                  try {
                      const q = query(
                          collection(db, "contacts"),
                          where("assignedTo", "==", selectedOCid)
                      );
      
                      const snapshot = await getDocs(q);
      
                      const contacts = snapshot.docs.map(doc => ({
                          uid: doc.id,
                          ...doc.data(),
                      }));
      
                      setassignedContacts(contacts);
                   
                      
                     
                  } catch (error) {
                      console.error("Error fetching assignedContacts:", error);
                  } finally {
                      setLoading(false);
                  }
              };
      
              fetchassignedContacts();
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