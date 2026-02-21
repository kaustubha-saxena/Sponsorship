import React from "react";
import Link from "next/link";
import { useState } from "react";
import UpdateForm from "../UpdateContact/UpdateForm";
import Image from "next/image";
const DataRow = ({ item }) => {
console.log("item,=", item.company);


  const [showUpdateForm, setshowUpdateForm] = useState(false);

  const toggleUpdateForm = () => {
    setshowUpdateForm(prev => !prev);
   
  }

  const formatDate = (date) => {
 
  if (!date) return "-";

  // STRING date (YYYY-MM-DD)
  if (typeof date === "string") {
    const parsed = new Date(date);
    return isNaN(parsed) ? "-" : parsed.toLocaleDateString();
  }

  // Firestore Timestamp
  if (typeof date.toDate === "function") {
    return date.toDate().toLocaleDateString();
  }

  // JS Date
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }

  return "-";
};

  return (
    <tr className="border-gray-200 border-1 text-sm text-black min-w-max">
    
      <td  title={item.company}  className="p-4 font-medium whitespace-nowrap max-w-40 overflow-hidden text-ellipsis cursor-help">  {item.company}</td>
 
      <td className="p-4 font-medium">{item.name}</td>
      <td className="p-4 w-fit font-medium">
        {
      <Link href={item.linkedin} target="_blank">
        Profile
      </Link>
    }
      {/* {item.linkedin} */}

      </td>
      
      <td className="p-4 font-medium flex justify-center ">{item.email}</td>
      <td className="p-4 font-medium">{item.phone || "-"}</td>
      <td className="p-4 font-medium">{item.role || "-"}</td>
      <td className="p-4 font-medium flex justify-start">{item.emailSent ? "Yes" : "No"}</td>
   <td className="p-4 font-medium">{item.callMade ? "Yes" : "No"}</td>
      <td className="p-4 font-medium">{formatDate(item.followUpAt)}</td>
      <td  title={item.note}  className="p-4 font-medium whitespace-nowrap max-w-xs overflow-hidden text-ellipsis cursor-help">  {item.note}</td>
      <td className="">
      <div className="flex justify-center items-center w-full ">

      <button onClick={toggleUpdateForm} className="cursor-pointer ">
        <Image src="/edit.png" alt="Edit" width={15} height={20} />
      </button>
     
     

       {
       showUpdateForm && 
       <>
        <div className="bg-gray-500 w-5/6 min-h-full ">
       <UpdateForm toggleForm={toggleUpdateForm} contact={item}/>
       </div>
       </>
       }

      
      </div>
    </td>
    </tr>
  );
};

export default DataRow;
