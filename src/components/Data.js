import DataRow from "./DataRow";
export default function Data({ contacts, setshowUpdateForm }) {
  console.log(contacts);
  
  return (
    <div className="bg-white  shadow w-full  top-0 left-0 border-none ">
          <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
        <table className=" min-w-max w-full border-2 ">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left text-md  text-gray-500 bg-gray-100 ">
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
            {contacts.map((item, index) => (
              <DataRow key={index} item={item} setshowUpdateForm={setshowUpdateForm} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
