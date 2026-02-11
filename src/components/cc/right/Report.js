import React from 'react'
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@/app/context/UserContext";
import Data from '@/components/oc/Data';
const Report = ({ocId}) => {
    const {user} = useUser();
        const [assignedContacts, setassignedContacts] = useState([]);
        const [loading, setLoading] = useState(true);

        
        

//   useEffect(() => {
//         const fetchassignedContacts = async () => {
//             try {
//                 const q = query(
//                     collection(db, "contacts"),
//                     where("assignedTo", "==", `${user ? ocId : ""}`)
//                 );

//                 const snapshot = await getDocs(q);

//                 const ocList = snapshot.docs.map(doc => ({
//                     uid: doc.id,
//                     ...doc.data(),
//                 }));

//                 setassignedContacts(ocList);
//             } catch (error) {
//                 console.error("Error fetching assignedContacts:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchassignedContacts();
        
        
//     }, []);

  return (
    <div className='w-full min-h-50 h-fit bg-green-500'>
      report for OC ID: {ocId}
      {loading ? (
      <></>
      ) : ( <></>)}



    </div>
  )
}

export default Report
