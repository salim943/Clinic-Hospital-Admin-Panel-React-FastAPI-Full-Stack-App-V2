
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-60 bg-gray-800 text-white h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Nursing Home</h1>
      <nav className="flex flex-col gap-2">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/doctors" className="hover:bg-gray-700 p-2 rounded">Doctors</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
