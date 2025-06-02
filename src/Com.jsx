import React, { useEffect, useState } from "react";
import axios from "axios";

const UserComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch user ID from localStorage
  const userId = localStorage.getItem("userId");
useEffect(() => {
  const fetchUserComplaints = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!userId) {
        setError("User not found. Please log in.");
        setLoading(false);
        return;
      }

      const res = await axios.get(`http://localhost:5000/user/myComplaints/${userId}`);
      console.log("✅ Complaints Data:", res.data); // Debugging API response
      setComplaints(res.data);
    } catch (err) {
      console.error("❌ Error fetching user complaints:", err);
      setError("Failed to load complaints. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchUserComplaints();
}, [userId]);


  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Complaints</h2>

      {complaints.length === 0 ? (
        <p className="text-center text-gray-500">You haven't submitted any complaints yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border">Date</th>
                <th className="py-3 px-4 border">Description</th>
                <th className="py-3 px-4 border">Location</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Type</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id} className="border-b">
                  <td className="px-4 py-3">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{complaint.description || "No description"}</td>
                  <td className="px-4 py-3">{complaint.location || "No location"}</td>
                  <td className="px-4 py-3">{complaint.status || "Pending"}</td>
                  <td className="px-4 py-3">{complaint.complaintType || "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserComplaints;
