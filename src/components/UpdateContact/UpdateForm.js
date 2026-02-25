"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UpdateForm({ toggleForm, contact, refresh, setRefresh }) {

  const [form, setForm] = useState({
    name: contact?.name || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    gender: contact?.gender || "",
    company: contact?.company || "",
    role: contact?.role || "",
    location: contact?.location || "",
    linkedin: contact?.linkedin || "",
    callMade: contact?.callMade ?? false,
    emailSent: contact?.emailSent ?? false,
    followUpDate: contact?.followUpAt || "",
    callDate: contact?.callDate || "",
    emailDate: contact?.emailDate || "",
    assignedTo: contact?.assignedTo || "",
    notes: contact?.note || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {

    if (form.callMade && !form.callDate) {
      alert("Please select Call Date when Call Made is checked.");
      return;
    }

    if (form.emailSent && !form.emailDate) {
      alert("Please select Email Date when Email Sent is checked.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("contacts")
        .update({
          name: form.name || null,
          email: form.email || null,
          phone: form.phone || null,
          gender: form.gender || null,
          company: form.company || null,
          role: form.role || null,
          location: form.location || null,
          linkedin: form.linkedin || null,

          // 🔥 EXACT schema names
          assignedTo: form.assignedTo || "",
          callMade: form.callMade ?? false,
          emailSent: form.emailSent ?? false,
          followUpAt: form.followUpDate || null,
          callDate: form.callDate || null,
          emailDate: form.emailDate || null,

          note: form.notes || null,
        })
        .eq("id", contact.id)
        .select();

      if (error) {
        console.error("Supabase Update Error:", error);
        return;
      }

      console.log("Updated successfully ✅", data);
      toggleForm?.();
      setRefresh(!refresh); // Trigger refresh in parent

    } catch (err) {
      console.error("Unexpected Error:", err);
    }
  };

  return (
    <div className="w-full h-full absolute top-0 left-0 bg-white/60 flex justify-center items-center z-50">
      <div className="w-[40%] rounded-xl max-h-[80vh] overflow-y-scroll no-scrollbar bg-white shadow-md">

        <div className="flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
          <h2 className="text-white text-lg font-semibold">Update Contact</h2>
          <button className="text-white" onClick={toggleForm}>X</button>
        </div>

        <div className="p-6 space-y-6">

          <div className="grid grid-cols-2 gap-4">
            <Input label="Name" name="name" value={form.name} onChange={handleChange} />
            <Input label="Email" name="email" value={form.email} onChange={handleChange} />
            <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
            <Select label="Gender" name="gender" value={form.gender} onChange={handleChange} options={["Male", "Female"]} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Company" name="company" value={form.company} onChange={handleChange} />
            <Input label="Role" name="role" value={form.role} onChange={handleChange} />
            <Input label="Location" name="location" value={form.location} onChange={handleChange} />
            <Input label="LinkedIn" name="linkedin" value={form.linkedin} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Checkbox label="Call Made" name="callMade" checked={form.callMade} onChange={handleChange} />
            <Checkbox label="Email Sent" name="emailSent" checked={form.emailSent} onChange={handleChange} />
            <Input type="date" label="Call Date" name="callDate" value={form.callDate} onChange={handleChange} disabled={!form.callMade} />
            <Input type="date" label="Email Date" name="emailDate" value={form.emailDate} onChange={handleChange} disabled={!form.emailSent} />
            <Input type="date" label="Follow Up Date" name="followUpDate" value={form.followUpDate} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              Update
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------- UI Components ---------- */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input {...props} className="w-full border rounded-lg p-2" />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <select {...props} className="w-full border rounded-lg p-2">
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 border rounded-lg p-2">
      <input type="checkbox" {...props} />
      {label}
    </label>
  );
}