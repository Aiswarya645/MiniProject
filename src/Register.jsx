import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    description: "",
    complaintType: "",
    location: "",
    file: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setData({ ...data, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found. Please log in.");
      return;
    }

    if (!data.file) {
      alert("Please upload an image or video file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("description", data.description);
    formData.append("complaintType", data.complaintType);
    formData.append("location", data.location);
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        "https://miniproject-t63v.onrender.com/user/addimage",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        alert("Complaint submitted successfully!");
        navigate("/mycomplaint");
      } else {
        alert("Something went wrong.");
      }
    } catch (e) {
      alert("Failed to submit complaint.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Report Issues Seamlessly</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Complaint Type</label>
            <select
              name="complaintType"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            >
              <option value="">Select type</option>
              <option value="waste-dumping">Waste Dumping</option>
              <option value="noise-pollution">Noise Pollution</option>
              <option value="water-leakage">Water Leakage</option>
              <option value="illegal-construction">Illegal Construction</option>
              <option value="road-damage">Road Damage</option>
              <option value="streetlight-issue">Streetlight Issue</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Upload File (Image or Video)</label>
            <input
              type="file"
              name="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Submit
            </button>
            <button
              type="reset"
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              onClick={() => setData({ description: "", complaintType: "", location: "", file: null })}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
