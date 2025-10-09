import { useEffect, useState } from 'react';

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/patients/')
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error("Error fetching patients:", err));
  }, []);

  return (
    <div>
      <h2>Patient List</h2>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            {patient.name} — {patient.gender} — {patient.medical_history}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;
