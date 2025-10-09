import { useState, useEffect } from 'react';

function VisitForm() {
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    visit_date: '',
    reason: '',
    diagnosis: '',
    notes: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/doctors/').then(res => res.json()).then(setDoctors);
    fetch('http://127.0.0.1:8000/patients/').then(res => res.json()).then(setPatients);
  }, []);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:8000/visits/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, visit_date: new Date(formData.visit_date).toISOString() })
    });

    if (res.ok) {
      alert('Visit recorded');
      setFormData({});
    } else {
      alert('Error adding visit');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Visit</h2>
      <select name="patient_id" value={formData.patient_id} onChange={handleChange} required>
        <option value="">Select Patient</option>
        {patients.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <select name="doctor_id" value={formData.doctor_id} onChange={handleChange} required>
        <option value="">Select Doctor</option>
        {doctors.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <input name="visit_date" type="datetime-local" value={formData.visit_date} onChange={handleChange} required />
      <input name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} />
      <input name="diagnosis" placeholder="Diagnosis" value={formData.diagnosis} onChange={handleChange} />
      <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
      <button type="submit">Add Visit</button>
    </form>
  );
}

export default VisitForm;
