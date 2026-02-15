
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import WelcomeDashboard from "./WelcomeDashboard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DataBlock from "@/components/OC/DataBlock";


const Right = () => {

 const [assignedContacts, setassignedContacts] = useState([]);
    const [loading, setLoading] = useState(true);
const { user } = useUser();
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
    <div className="bg-gray-50 w-5/6 min-h-full h-full absolute right-0">
    

    <WelcomeDashboard assignedContacts={assignedContacts}/>
<DataBlock assignedContacts={assignedContacts}/>
    </div>
  );
};

export default Right;
