import React from "react";
import Link from "next/link";
import { useState } from "react";
import UpdateForm from "./UpdateContact/UpdateForm";
const DataRow = ({ item }) => {

  const [showUpdateForm, setshowUpdateForm] = useState(false);

  const toggleUpdateForm = () => {
    setshowUpdateForm(prev => !prev);
    console.log(showUpdateForm);
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
    <tr className="border-b text-sm text-black min-w-max">
    <td>
      <div className="flex justify-center items-center w-full ">

      <button className="cursor-pointer">X</button>
      </div>
    </td>
      <td  title={item.companyName}  className="p-4 font-medium whitespace-nowrap max-w-40 overflow-hidden text-ellipsis cursor-help">  {item.companyName}</td>
      {/* <td className="p-4 font-medium">{item.companyName}</td> */}
      <td className="p-4 font-medium">{item.name}</td>
      <td className="p-4 font-medium">{
      <Link href={item.linkedin} target="_blank">
        {item.linkedin || "-"}
      </Link>
      
      }</td>
      
      <td className="p-4 font-medium">{item.email}</td>
      <td className="p-4 font-medium">{item.phone || "-"}</td>
      <td className="p-4 font-medium">{item.role || "-"}</td>
      <td className="p-4 font-medium">{item.emailSent ? "Yes" : "No"}</td>
   <td className="p-4 font-medium">{item.callMade ? "Yes" : "No"}</td>
      <td className="p-4 font-medium">{formatDate(item.followUpAt)}</td>
      <td  title={item.note}  className="p-4 font-medium whitespace-nowrap max-w-xs overflow-hidden text-ellipsis cursor-help">  {item.note}</td>
    </tr>
  );
};

export default DataRow;
