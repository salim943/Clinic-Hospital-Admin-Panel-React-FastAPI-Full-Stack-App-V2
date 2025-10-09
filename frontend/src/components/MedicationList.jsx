import { useEffect, useState } from 'react';

function MedicationList() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/medications/')
      .then(res => res.json())
      .then(data => setMedications(data))
      .catch(err => console.error("Error fetching medications:", err));
  }, []);

  return (
    <div>
      <h2>Medication List</h2>
      <ul>
        {medications.map(med => (
          <li key={med.id}>
            {med.name} — Patient ID: {med.patient_id} — Prescribed by: {med.prescribed_by}
            <br />
            {med.dosage} | {med.frequency}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicationList;
