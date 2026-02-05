
import React from 'react'

import DataRow from './DataRow';

export default function Data() {
  const data = [
  {
    assignedTo: "SOME_OC_UID",
    callMade: false,
    companyName: "Global Ventures dfs;glkdsf; gjdsflgjorijdlgkjroigh lsdfkgjsorifgh",
    createdAt: new Date("2024-01-25T00:00:00+05:30"),
    email: "vikram@globalventures.com",
    emailSent: false,
    followUpAt: new Date("2024-01-25T00:00:00+05:30"),
    gender: "Male",
    linkedin: "https://www.linkedin.com/in/kaustubha-saxena/",
    location: "Banglore",
    name: "Vikram Singh",
    note: "Sponsorship amount discussed: ₹75,000. Status: Pending. Looking for confirmation by next week.",
    phone: "+91 9876543210",
    role: "Marketing Head",
  },
  {
    assignedTo: "SOME_OC_UID",
    callMade: false,
    companyName: "Global Ventures dfs;glkdsf; gjdsflgjorijdlgkjroigh lsdfkgjsorifgh",
    createdAt: new Date("2024-01-25T00:00:00+05:30"),
    email: "vikram@globalventures.com",
    emailSent: false,
    followUpAt: new Date("2024-01-25T00:00:00+05:30"),
    gender: "Male",
    linkedin: "https://www.linkedin.com/in/kaustubha-saxena/",
    location: "Banglore",
    name: "Vikram Singh",
    note: "Sponsorship amount discussed: ₹75,000. Status: Pending. Looking for confirmation by next week.",
    phone: "+91 9876543210",
    role: "Marketing Head",
  }
];

  return (
    <div className="overflow-x-scroll bg-white rounded-lg shadow w-full ">
      <table className=" border-collapse min-w-max">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b ">
            <th className="p-4">Company</th>
            <th className="p-4">Contact Person</th>
            <th className="p-4">linkedin</th>
            <th className="p-4">Email</th>
            <th className="p-4">Phone Number</th>
            <th className="p-4">Role</th>
            <th className="p-4">Email Sent</th>
            <th className="p-4">Call Made</th>
            <th className="p-4">Next followup</th>
            <th className="p-4  ">Notes</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (

            <DataRow key={index} item={item}  />
           
          ))}
        </tbody>
      </table>
    </div>
  );
}
    