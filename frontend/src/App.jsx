
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./components/Dashboard";
import AdminDoctors from "./components/AdminDoctors";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import MedicationForm from "./components/MedicationForm";
import MedicationList from "./components/MedicationList";
import VisitForm from "./components/VisitForm";
import VisitList from "./components/VisitList";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctors" element={<AdminDoctors />} />
		  <Route path="/patients" element={<PatientForm />} />
		  <Route path="/patients_list" element={<PatientList />} />
		  <Route path="/medications" element={<MedicationForm />} />
		  <Route path="/medications_list" element={<MedicationList />} />
		  <Route path="/visits" element={<VisitForm />} />
		  <Route path="/visits_list" element={<VisitList />} />
		  <Route path="/signup" element={<SignupForm />} />
		  <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
