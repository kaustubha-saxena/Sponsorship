import React from 'react'
import Data from './Data'
import { useUser } from "@/app/context/UserContext";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AddBtn from "@/components/AddBtn";
import InputForm from "@/components/AddContact/InputForm";
const DataBlock = ({ setshowUpdateForm }) => {
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
 const [openForm, setOpenForm] = useState(false);
  

  const toggleForm = () => {
    setOpenForm(prev => !prev);
    console.log(openForm);
    
  };

    return (
        <>
            <div className='  bottom-0 absolute h-fit w-full p-5 '>
                <div className='flex justify-between items-center rounded-lg px-4'>
                    <div className='flex items-center justify-start gap-5  w-[60%]'>
                        <input className=" text-black m-2 px-1 py-2 w-[60%] rounded-md border-none bg-white " type="text" placeholder='Search by company, name or email' />
                        <button className=''>
                            <Image src="/filter.png" alt="Search" width={20} height={20} />
                        </button>
                    </div>
                    <div>
                        <AddBtn toggleForm={toggleForm}/>
                          {openForm && <InputForm toggleForm={toggleForm}/>}
                    </div>


                </div>
                <Data contacts={assignedContacts} setshowUpdateForm={setshowUpdateForm} />
            </div>
        </>
    )
}

export default DataBlock
