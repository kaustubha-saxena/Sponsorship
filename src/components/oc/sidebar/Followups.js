import React from 'react'
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@/app/context/UserContext";    
const Followups = () => {

 const { user } = useUser(); 
      const [FollowToday, setFollowToday] = useState([]);
      const [loading, setLoading] = useState(true);
    useEffect(() => {
        const todayISO = new Date().toISOString().split("T")[0];
        const fetchFollowToday = async () => {
            try {
                const q = query(
                    collection(db, "contacts"),
                    where("assignedTo", "==", `${user ? user.uid : ""}`),
                    where("followUpAt", "==", todayISO)
                );

                const snapshot = await getDocs(q);

                const ocList = snapshot.docs.map(doc => ({
                    uid: doc.id,
                    ...doc.data(),
                }));

                setFollowToday(ocList);
            } catch (error) {
                console.error("Error fetching FollowToday:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowToday();
    }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Follow-ups Today</h3>
      {loading ? (
        <p>Loading...</p>
      ) : FollowToday.length > 0 ? (
        <ul className="list-disc pl-5">
          {FollowToday.map((contact) => (

            <li key={contact.uid}>{contact.companyName}</li>
          ))}
        </ul>
      ) : (
        <p>No follow-ups scheduled for today.</p>
      )}
    </div>
  )
}

export default Followups
