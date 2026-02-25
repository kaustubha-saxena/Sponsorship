import DataRow from "@/components/oc/DataRow";
export default function Data({ contacts, refresh, setRefresh }) {


  
  return (
    <div className="  shadow w-full h-[90%]  bg-white  top-0 left-0 border-none ">
          <div className="h-full  overflow-y-auto overflow-x-auto no-scrollbar">
        <table className=" min-w-max w-full border-2 ">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left text-sm  text-gray-500 bg-gray-100 ">
              <th className="p-4">Company</th>
              <th className="p-4">Contact Person</th>
              <th className="p-4 w-fit">LinkedIn</th>
              <th className="p-4 flex justify-center">Email</th>
              <th className="p-4">Phone Number</th>
              <th className="p-4">Role</th>
              <th className="p-4">Email Sent</th>
              <th className="p-4">Call Made</th>
              <th className="p-4">Next follow-up</th>
              <th className="p-4">Notes</th>
              <th className="p-6 "></th>
            </tr>
          </thead>

          <tbody className="">
            {contacts.length === 0 ? <tr><td colSpan="11" className="text-center p-4">No contacts available</td></tr>:<></>}
            {contacts.map((item, index) => (
              <DataRow refresh={refresh} setRefresh={setRefresh} key={index} item={item}  />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
