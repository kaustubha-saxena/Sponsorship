import React from 'react'

import Data from './Data';
import { useUser } from "@/app/context/UserContext";

import { useEffect, useState } from "react";





const DataBlock = ({ assignedContacts ,refresh,setRefresh}) => {
    
    const [search, setSearch] = useState("")

    const { user } = useUser();
    const [searchContact, setsearchContact] = useState("")
    const [openForm, setOpenForm] = useState(false);
    const [emailSend, setEmailSend] = useState(null);
    const [callDone, setCallDone] = useState(null);
    const handleChange = (e) => {
        setsearchContact(e.target.value)
        
    }

    const searchContacts = (search, emailSend, callDone, assignedContacts) => {
        let filtered = assignedContacts;


        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter((contact) =>
                contact.name?.toLowerCase().includes(searchLower) ||
                contact.email?.toLowerCase().includes(searchLower) ||
                contact.companyName?.toLowerCase().includes(searchLower) 
            );
        }

        // 📧 Email Filter (only apply if not null)
        if (emailSend !== null) {
            filtered = filtered.filter(
                (contact) => contact.emailSent === emailSend
            );
        }

        // 📞 Call Filter
        if (callDone !== null) {
            filtered = filtered.filter(
                (contact) => contact.callMade === callDone
            );
        }

        return filtered;
    };

    const handleToggleEmail = () => {
        setEmailSend(prev =>
            prev === true ? false :
                prev === false ? null :
                    true
        );
    };

    const handleToggleCall = () => {
        setCallDone(prev =>
            prev === true ? false :
                prev === false ? null :
                    true
        );
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }


    return (
        <>
            <div className='  bottom-0 absolute  h-[70%] w-full p-5   '>
                <div className='flex justify-between items-center rounded-lg px-4'>
                    
                    <div className='flex items-center justify-start gap-2  w-[60%] text-black'>
                        <input value={search} onChange={handleSearchChange} className=" text-black m-2 px-1 py-2 w-[60%] rounded-md border-none bg-white " type="text" placeholder='Search by company, name or email r' />
                        <button
                            onClick={handleToggleEmail}
                            className={`font-semibold text-sm cursor-pointer border-none shadow-sm border rounded-2xl px-3 py-1 transition-colors duration-200
    ${emailSend === true
                                    ? "bg-green-300 text-black"
                                    : emailSend === false
                                        ? "bg-red-300 text-black"
                                        : "bg-white hover:bg-gray-100"
                                }`}
                        >
                            Email
                        </button>
                        <button
                            onClick={handleToggleCall}
                            className={`font-semibold text-sm cursor-pointer border-none shadow-sm border rounded-2xl px-3 py-1 transition-colors duration-200
    ${callDone === true
                                    ? "bg-green-300 text-black"
                                    : callDone === false
                                        ? "bg-red-300 text-black"
                                        : "bg-white hover:bg-gray-100"
                                }`}
                        >
                            Call
                        </button>


                    </div>
                    <div>
                        {/* <AddBtn toggleForm={toggleForm}/> */}
                        {/* {openForm && <InputForm toggleForm={toggleForm}/>} */}
                    </div>


                </div>

                {
                    <Data refresh={refresh} setRefresh={setRefresh} contacts={searchContacts(search, emailSend, callDone, assignedContacts)} />
                }

            </div>
        </>
    )
}

export default DataBlock
