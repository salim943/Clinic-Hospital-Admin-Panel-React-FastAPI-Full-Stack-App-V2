
import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsRes = await axios.get("http://127.0.0.1:8000/doctors/");
        setDoctors(doctorsRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <section>
        <h2 className="text-2xl font-semibold">Doctors</h2>
        <ul>{doctors.map(doc => <li key={doc.id}>{doc.name} ({doc.specialty})</li>)}</ul>
      </section>
    </div>
  );
}

export default Dashboard;
