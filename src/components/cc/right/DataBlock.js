import React from 'react'

import Data from "@/components/oc/Data";
import { useUser } from "@/app/context/UserContext";

import { useEffect, useState } from "react";





const DataBlock = ({ assignedContacts }) => {
    
    const [search, setSearch] = useState("")

    const { user } = useUser();
    const [searchContact, setsearchContact] = useState("")
    const [openForm, setOpenForm] = useState(false);
    const [emailSend, setEmailSend] = useState(null);
    const [callDone, setCallDone] = useState(null);
    const handleChange = (e) => {
        setsearchContact(e.target.value)
        // filterContacts();
    }

    const searchContacts = (search, emailSend, callDone, assignedContacts) => {
        let filtered = assignedContacts;


        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter((contact) =>
                contact.name?.toLowerCase().includes(searchLower) ||
                contact.email?.toLowerCase().includes(searchLower) ||
                contact.companyName?.toLowerCase().includes(searchLower) ||
                contact.phone?.toLowerCase().includes(searchLower)
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
                        <input value={search} onChange={handleSearchChange} className=" text-black m-2 px-1 py-2 w-[60%] rounded-md border-none bg-white " type="text" placeholder='Search by company, name, email or phone number' />
                        <button
                            onClick={handleToggleEmail}
                            className={`font-semibold text-sm cursor-pointer border-none rounded-2xl px-3 py-1 transition-colors duration-200
    ${emailSend === true
                                    ? "bg-green-300 text-black"
                                    : emailSend === false
                                        ? "bg-red-300 text-black"
                                        : "bg-gray-200 hover:bg-gray-200"
                                }`}
                        >
                            Email
                        </button>
                        <button
                            onClick={handleToggleCall}
                            className={` font-semibold text-sm cursor-pointer border-none rounded-2xl px-3 py-1 transition-colors duration-200
    ${callDone === true
                                    ? "bg-green-300 text-black"
                                    : callDone === false
                                        ? "bg-red-300 text-black"
                                        : "bg-gray-200 hover:bg-gray-200"
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
                    <Data contacts={searchContacts(search, emailSend, callDone, assignedContacts)} />
                }

            </div>
        </>
    )
}

export default DataBlock
