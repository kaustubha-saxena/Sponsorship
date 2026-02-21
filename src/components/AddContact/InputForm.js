import { useState } from "react";
import PushBtn from "./PushBtn";
import { useUser } from "@/app/context/UserContext";
export default function InputForm({ toggleForm }) {
  const { user } = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    companyName: "",
    role: "",
    location: "",
    linkedin: "",
    callMade: false,
    emailSent: false,
    followUpDate: "",
    callDate: "",
    emailDate: "",
    assignedTo: user ? user.uid : "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleClear = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      gender: "",
      companyName: "",
      role: "",
      location: "",
      linkedin: "",
      callMade: false,
      emailSent: false,
      followUpDate: "",
      callDate: "",
      emailDate: "",
      assignedTo: "",
      notes: "",

    });
  };

  return (
    <>
      <div className="w-full h-full absolute  rounded-20ox top-0 left-0 bg-gray-100/60 flex items-center justify-center z-50">

        <div className="w-[40%]   rounded-xl max-h-[80vh] overflow-y-scroll  no-scrollbar">


          <div className="max-w-dull mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="flex  justify-between  items-center bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
              <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                Add New Contact
              </h2>
              <div>
                <button className="cursor-pointer"
                  onClick={toggleForm}>
                  X
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* PERSONAL INFO */}
              <section>
                <h3 className="text-sm font-semibold text-gray-500 mb-4">
                  PERSONAL INFORMATION
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
                  <Input label="Email" name="email" value={form.email} onChange={handleChange} required />
                  <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
                  <Select
                    label="Gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    options={["Male", "Female"]}
                  />
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-gray-500 mb-4">
                  COMPANY INFORMATION
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Company Name"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="e.g., Manager, Director"
                  />
                  <Input
                    label="Location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                  <Input
                    label="LinkedIn"
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </section>


              <section>
                <h3 className="text-sm font-semibold text-gray-500 mb-4">
                  OUTREACH STATUS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Checkbox
                    label="Call Made"
                    name="callMade"
                    checked={form.callMade}
                    onChange={handleChange}
                  />
                  <Checkbox
                    label="Email Sent"
                    name="emailSent"
                    checked={form.emailSent}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {

//             <Input
//   label="Email Date"
//   type="date"
//   name="emailDate"
//   value={form.emailDate}
//   onChange={handleChange}
//   required={form.emailSent}
//   disabled={!form.emailSent}
// />
                  }
                  <Input
                    label="Follow Up Date"
                    type="date"
                    name="followUpDate"
                    value={form.followUpDate}
                    onChange={handleChange}
                  />

                </div>
              </section>

              {/* NOTES */}
              <section>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Add any additional notes about this sponsor..."
                  className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </section>


              <div className="flex justify-end gap-3">

                <PushBtn contactForm={form} toggleForm={toggleForm} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* Reusable Components */

function Input({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        {...props}
        className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer">
      <input type="checkbox" {...props} className="h-4 w-4 text-blue-600" />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}
