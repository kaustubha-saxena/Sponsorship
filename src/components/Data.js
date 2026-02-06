import DataRow from "./DataRow";
export default function Data({ contacts }) {
  console.log(contacts);
  
  return (
    <div className="bg-white rounded-lg shadow w-full absolute top-0 left-0 ">
          <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
        <table className="border-collapse min-w-max w-full">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="p-4"></th>
              <th className="p-4">Company</th>
              <th className="p-4">Contact Person</th>
              <th className="p-4">LinkedIn</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone Number</th>
              <th className="p-4">Role</th>
              <th className="p-4">Email Sent</th>
              <th className="p-4">Call Made</th>
              <th className="p-4">Next follow-up</th>
              <th className="p-4">Notes</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((item, index) => (
              <DataRow key={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
