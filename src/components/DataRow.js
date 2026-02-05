import React from "react";

const DataRow = ({ item }) => {
  const formatDate = (date) => {
    if (!date) return "-";

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
    <tr className="border-b text-sm text-green-500">
      <td  title={item.companyName}  className="p-4 font-medium whitespace-nowrap max-w-40 overflow-hidden text-ellipsis cursor-help">  {item.companyName}</td>
      {/* <td className="p-4 font-medium">{item.companyName}</td> */}
      <td className="p-4 font-medium">{item.name}</td>
      <td className="p-4 font-medium">{item.linkedin || "-"}</td>
      
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
