import axios from "axios";
import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    dob: "",
    state: "",
    district: "",
    address: "",
    idProof: "",
    idProofNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const userId = localStorage.getItem("userId"); 
  if (!userId) {
    alert("User ID not found. Please log in.");
    return;
  }

  try {
    const response = await axios.put("http://localhost:5000/user/updateprofile", {
      userId,
      ...formData,
    });

    if (response.data.success) {
      alert("Profile updated successfully!");
    } else {
      alert("Update failed: " + response.data.message);
    }
  } catch (error) {
    console.error(" Error updating profile:", error);
    alert("An error occurred while updating.");
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 w-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg w-[900px] flex items-center border border-gray-300 relative gap-8"
      >
        <div className="w-1/2 flex flex-col pr-6 justify-start gap-8">
          <h2 className="text-4xl font-bold text-gray-800 w-1/2 flex">
            CIVIC <span className="text-blue-600">EYE</span>
          </h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            className="bg-blue-500 text-white py-2 rounded-md w-full font-semibold hover:bg-blue-600 transition text-sm"
          >
            Edit
          </button>
        </div>

        <div className="absolute left-1/2 top-10 bottom-10 w-px bg-gray-300"></div>

        <div className="w-1/2 flex flex-col justify-center pl-6 gap-8">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="">Select District</option>
            <option value="Calicut">Calicut</option>
            <option value="Kannur">Kannur</option>
            <option value="Trissur">Trissur</option>
            <option value="Trivandram">Trivandram</option>
            <option value="Malappuram">Malappuram</option>
            <option value="Kollam">Kollam</option>
            <option value="Kottayam">Kottayam</option>
          </select>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-400 p-7 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="idProof"
            placeholder="Id Proof"
            value={formData.idProof}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="idProofNumber"
            placeholder="ID Proof Number"
            value={formData.idProofNumber}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md w-full font-semibold hover:bg-blue-600 transition text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
