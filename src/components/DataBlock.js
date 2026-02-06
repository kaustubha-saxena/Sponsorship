import React from 'react'
import Data from './Data'
import { useUser } from "@/app/context/UserContext"; 

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const DataBlock = () => {
      const { user } = useUser(); 
      const [assignedContacts, setassignedContacts] = useState([]);
      const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchassignedContacts = async () => {
            try {
                const q = query(
                    collection(db, "contacts"),
                    where("assignedTo", "==", `${user ? user.uid : ""}`)
                );

                const snapshot = await getDocs(q);

                const ocList = snapshot.docs.map(doc => ({
                    uid: doc.id,
                    ...doc.data(),
                }));

                setassignedContacts(ocList);
            } catch (error) {
                console.error("Error fetching assignedContacts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchassignedContacts();
    }, []);

    return (
        <>
        <div className=' relative h-full w-full p-4'>

            <Data contacts={assignedContacts} />
        </div>
        </>
    )
}

export default DataBlock
