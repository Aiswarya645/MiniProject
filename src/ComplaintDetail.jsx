import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ComplaintDetail = () => {
  const { complaintId } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`https://miniproject-t63v.onrender.com/user/complaint/${complaintId}`);
        console.log("📥 Complaint Data:", res.data);

        setComplaint(res.data);
      } catch (err) {
        console.error("Error fetching complaint:", err);
        setError("Failed to load complaint. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [complaintId]);

  const handleApprove = async () => {
    try {
      const res = await axios.put(`https://miniproject-t63v.onrender.com/user/approve/${complaintId}`);
      toast.success("Complaint Approved!");
      setComplaint(res.data); 
    } catch (err) {
      console.error("Error approving complaint:", err);
      toast.error("Failed to approve the complaint.");
    }
  };

  const handleReject = async () => {
    try {
      const res = await axios.put(`https://miniproject-t63v.onrender.com/user/reject/${complaintId}`);
      toast.success("Complaint Rejected!");
      setComplaint(res.data); 
    } catch (err) {
      console.error("Error rejecting complaint:", err);
      toast.error("Failed to reject the complaint.");
    }
  };

  const handleResolve = async () => {
    try {
      const res = await axios.put(`https://miniproject-t63v.onrender.com/user/resolve/${complaintId}`);
      toast.success("Complaint Resolved!");
      setComplaint(res.data); 
    } catch (err) {
      console.error("Error resolving complaint:", err);
      toast.error("Failed to resolve the complaint.");
    }
  };

  if (loading) return <p className="text-center py-6 text-lg font-semibold">Loading complaint details...</p>;
  if (error) return <p className="text-center py-6 text-lg font-semibold text-red-500">{error}</p>;
  if (!complaint) return <p className="text-center py-6 text-lg font-semibold text-red-500">Complaint not found.</p>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Complaint Details</h2>

      <div className="bg-gray-100 p-4 rounded-md">

        <p className="text-lg"><strong>Description:</strong> {complaint.description}</p>
        <p className="text-lg"><strong>Location:</strong> {complaint.location}</p>
        <p className="text-lg"><strong>Status:</strong>
          <span className={`ml-2 font-bold ${complaint.status === 'Approved' ? 'text-green-500' : complaint.status === 'Rejected' ? 'text-red-500' : complaint.status === 'Resolved' ? 'text-blue-500' : 'text-yellow-500'}`}>
            {complaint.status}
          </span>
        </p>
      </div>

      <div className="mt-6 flex gap-4 justify-center">
        <button onClick={handleApprove} className="bg-green-600 text-white py-2 px-6 rounded-md font-semibold hover:bg-green-700 transition">
          Approve
        </button>
        <button onClick={handleReject} className="bg-red-600 text-white py-2 px-6 rounded-md font-semibold hover:bg-red-700 transition">
          Reject
        </button>
        <button onClick={handleResolve} className="bg-blue-600 text-white py-2 px-6 rounded-md font-semibold hover:bg-blue-700 transition">
          Resolve
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ComplaintDetail;
