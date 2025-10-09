import { useEffect, useState } from 'react';

function VisitList() {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/visits/')
      .then(res => res.json())
      .then(data => setVisits(data))
      .catch(err => console.error("Error fetching visits:", err));
  }, []);

  return (
    <div>
      <h2>Visit History</h2>
      <ul>
        {visits.map(visit => (
          <li key={visit.id}>
            Patient ID: {visit.patient_id}, Doctor ID: {visit.doctor_id}, Date: {new Date(visit.visit_date).toLocaleString()}
            <br />Reason: {visit.reason} | Diagnosis: {visit.diagnosis}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VisitList;
