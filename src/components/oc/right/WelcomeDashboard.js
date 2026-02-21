import React, { useEffect } from 'react'
import { useUser } from "@/app/context/UserContext";
import { useState } from 'react';
const WelcomeDashboard = ({assignedContacts}) => {

    const { user } = useUser();
const [callsMade, setCallsMade] = useState(0)
const [emailsSend, setEmailsSend] = useState(0)
const [followUpsleft, setfollowUpsleft] = useState(0)
const [totalContacts, setTotalContacts] = useState(0)



useEffect(() => {
  
  setTotalContacts(assignedContacts.length)
 setCallsMade(
  assignedContacts.filter(contact => contact.callMade === true).length
);
 setEmailsSend(
  assignedContacts.filter(contact => contact.emailSent === true).length
);
setfollowUpsleft(
  assignedContacts.filter(contact => contact.followUpAt != null && contact.followUpAt != "").length
);

  
}, [assignedContacts])



    return (
        <div className='w-full  h-[30%] bg-gray-50 p-4'>
            <h2 className="text-xl text-black font-semibold mb-6">Welcome {user ? user.name : "Guest"}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500 text-sm font-medium">Total Calls</p>
                        {/* <span className="text-orange-500 text-xl">⏳</span> */}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mt-4">
                        {callsMade}
                    </h2>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500 text-sm font-medium">Total Emails</p>
                        {/* <span className="text-orange-500 text-xl">⏳</span> */}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mt-4">
                        {emailsSend}
                    </h2>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500 text-sm font-medium">Follow-ups Left</p>
                        {/* <span className="text-orange-500 text-xl">⏳</span> */}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mt-4">
                        {followUpsleft}
                    </h2>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500 text-sm font-medium">Total Contacts</p>
                        {/* <span className="text-orange-500 text-xl">⏳</span> */}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mt-4">
                        {totalContacts}
                    </h2>
                </div>

            </div>

        </div>
    )
}

export default WelcomeDashboard
