import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@/app/context/UserContext";

const Followups = () => {
  const { user } = useUser();

  const [FollowToday, setFollowToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFollowups, setShowFollowups] = useState(false);

  useEffect(() => {
    const todayISO = new Date().toISOString().split("T")[0];

    const fetchFollowToday = async () => {
      try {
        const q = query(
          collection(db, "contacts"),
          where("assignedTo", "==", user?.uid || ""),
          where("followUpAt", "==", todayISO)
        );

        const snapshot = await getDocs(q);

        const ocList = snapshot.docs.map((doc) => ({
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

    if (user) {
      fetchFollowToday();
    }
  }, [user]);

  return (
    <div className="bg-[#15213c] rounded-lg px-4 py-3 text-white">

      {/* Header with Count Badge */}
      <div
        onClick={() => setShowFollowups(!showFollowups)}
        className="flex justify-between items-center cursor-pointer"
      >
        <h3 className="text-lg font-semibold hover:text-blue-400 transition">
          Follow-ups Today
        </h3>

        {/* 🔥 Count Badge */}
        <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
          {FollowToday.length}
        </span>
      </div>

      {/* Show List Only When Clicked */}
      {showFollowups && (
        <div className="mt-2">
          {loading ? (
            <p>Loading...</p>
          ) : FollowToday.length > 0 ? (
            <ul className="list-disc pl-5 max-h-40 overflow-y-auto">
              {FollowToday.map((contact) => (
                <li key={contact.uid}>{contact.companyName}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">No follow-ups scheduled for today.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Followups;
