import { useState, useEffect } from 'react';

function MedicationForm() {
  const [formData, setFormData] = useState({
    patient_id: '',
    name: '',
    dosage: '',
    frequency: '',
    start_date: '',
    end_date: '',
    prescribed_by: ''
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/patients/')
      .then(res => res.json())
      .then(setPatients)
      .catch(err => console.error('Error fetching patients:', err));

    fetch('http://127.0.0.1:8000/doctors/')
      .then(res => res.json())
      .then(setDoctors)
      .catch(err => console.error('Error fetching doctors:', err));
  }, []);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Convert dates to ISO strings if present
    const payload = {
      ...formData,
      start_date: formData.start_date ? new Date(formData.start_date).toISOString().split('T')[0] : null,
      end_date: formData.end_date ? new Date(formData.end_date).toISOString().split('T')[0] : null,
      patient_id: Number(formData.patient_id),
      prescribed_by: Number(formData.prescribed_by),
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/medications/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Medication prescribed successfully!');
        setFormData({
          patient_id: '',
          name: '',
          dosage: '',
          frequency: '',
          start_date: '',
          end_date: '',
          prescribed_by: ''
        });
      } else {
        const errorData = await res.json();
        alert('Error: ' + JSON.stringify(errorData.detail || 'Failed to prescribe medication'));
      }
    } catch (err) {
      alert('Error submitting form: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Prescribe Medication</h2>

      <select
        name="patient_id"
        value={formData.patient_id}
        onChange={handleChange}
        required
      >
        <option value="">Select Patient</option>
        {patients.map(patient => (
          <option key={patient.id} value={patient.id}>
            {patient.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="name"
        placeholder="Medication Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="dosage"
        placeholder="Dosage (e.g. 500mg)"
        value={formData.dosage}
        onChange={handleChange}
      />

      <input
        type="text"
        name="frequency"
        placeholder="Frequency (e.g. Twice a day)"
        value={formData.frequency}
        onChange={handleChange}
      />

      <label>
        Start Date:
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />
      </label>

      <label>
        End Date:
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
      </label>

      <select
        name="prescribed_by"
        value={formData.prescribed_by}
        onChange={handleChange}
        required
      >
        <option value="">Select Prescribing Doctor</option>
        {doctors.map(doctor => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>

      <button type="submit">Prescribe Medication</button>
    </form>
  );
}

export default MedicationForm;
