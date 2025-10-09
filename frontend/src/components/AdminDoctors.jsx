
import React, { useState } from "react";
import axios from "axios";

function AdminDoctors() {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/doctors/", { name, specialty, phone, email });
      setMessage("Doctor created successfully!");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add Doctor</h1>
      <form onSubmit={handleCreateDoctor} className="flex flex-col gap-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminDoctors;
