import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/complaints');
        setComplaints(response.data);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  const handleResolve = async (complaintId) => {
    try {
      await axios.put(`http://localhost:5000/admin/complaints/resolve/${complaintId}`);
      setComplaints(complaints.map(complaint =>
        complaint._id === complaintId ? { ...complaint, status: 'Resolved' } : complaint
      ));
    } catch (error) {
      console.error("Failed to resolve complaint:", error);
    }
  };

  const handleDelete = async (complaintId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/complaints/delete/${complaintId}`);
      setComplaints(complaints.filter(complaint => complaint._id !== complaintId));
    } catch (error) {
      console.error("Failed to delete complaint:", error);
    }
  };

  return (
    <div className="p-10 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Complaint Management</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-4 border-b">ID</th>
            <th className="px-6 py-4 border-b">Description</th>
            <th className="px-6 py-4 border-b">Type</th>
            <th className="px-6 py-4 border-b">Location</th>
            <th className="px-6 py-4 border-b">Status</th>
            <th className="px-6 py-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td className="px-6 py-4 border-b">{complaint._id}</td>
              <td className="px-6 py-4 border-b">{complaint.description}</td>
              <td className="px-6 py-4 border-b">{complaint.complaintType}</td>
              <td className="px-6 py-4 border-b">{complaint.location}</td>
              <td className="px-6 py-4 border-b">{complaint.status}</td>
              <td className="px-6 py-4 border-b">
                {complaint.status !== 'Resolved' ? (
                  <button
                    onClick={() => handleResolve(complaint._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                  >
                    Resolve
                  </button>
                ) : (
                  <span className="text-green-500">Resolved</span>
                )}
                <button
                  onClick={() => handleDelete(complaint._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintManagement;
