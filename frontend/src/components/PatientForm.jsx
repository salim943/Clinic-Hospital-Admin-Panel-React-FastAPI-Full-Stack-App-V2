import { useState, useEffect } from 'react';

function PatientForm() {
  const [formData, setFormData] = useState({
    name: '',
    date_of_birth: '',
    gender: '',
    medical_history: '',
    doctor_id: '',
    room_id: '',
    admission_date: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/doctors/').then(res => res.json()).then(setDoctors);
    fetch('http://127.0.0.1:8000/rooms/').then(res => res.json()).then(setRooms);
  }, []);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:8000/patients/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Patient added');
      setFormData({});
    } else {
      alert('Error adding patient');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Patient</h2>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} />
      <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
      <textarea name="medical_history" placeholder="Medical History" value={formData.medical_history} onChange={handleChange} />
      <input name="admission_date" type="date" value={formData.admission_date} onChange={handleChange} />

      <select name="doctor_id" value={formData.doctor_id} onChange={handleChange}>
        <option value="">Assign Doctor</option>
        {doctors.map(doc => (
          <option key={doc.id} value={doc.id}>{doc.name}</option>
        ))}
      </select>

      <select name="room_id" value={formData.room_id} onChange={handleChange}>
        <option value="">Assign Room</option>
        {rooms.map(room => (
          <option key={room.id} value={room.id}>{room.room_number}</option>
        ))}
      </select>

      <button type="submit">Add Patient</button>
    </form>
  );
}

export default PatientForm;
