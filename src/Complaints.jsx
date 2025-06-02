import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const Complaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`http://localhost:5000/user/allComplaints?page=${page}&limit=${limit}`);
        setComplaints(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
        setError("Failed to load complaints. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [page, limit]);

  const handleComplaintClick = (complaintId) => {
    navigate(`/complaint/${complaintId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const downloadComplaintAsPDF = (complaint) => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Complaint Details", 20, 20);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      doc.text(`ID: ${complaint._id}`, 20, 35);
      doc.text(`Date: ${new Date(complaint.createdAt).toLocaleDateString()}`, 20, 45);

      const descriptionLines = doc.splitTextToSize(`Description: ${complaint.description || "No description"}`, 170);
      doc.text(descriptionLines, 20, 55);
      doc.text(`Location: ${complaint.location || "No location"}`, 20, 65 + descriptionLines.length * 10);

      doc.text(`Reported by: ${complaint.userId && complaint.userId.name ? complaint.userId.name : "Anonymous"}`, 20, 75 + descriptionLines.length * 10);
      doc.text(`Type: ${complaint.complaintType || "Unknown"}`, 20, 85 + descriptionLines.length * 10);

      let yPosition = 95 + descriptionLines.length * 10;

      if (complaint.status) {
        doc.text(`Status: ${complaint.status}`, 20, yPosition);
        yPosition += 10;
      }

      if (complaint.resolvedDate) {
        doc.text(`Resolved Date: ${new Date(complaint.resolvedDate).toLocaleDateString()}`, 20, yPosition);
        yPosition += 10;
      }

      doc.setFontSize(10);
      doc.text("This document was generated automatically.", 20, 280);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 287);

      doc.save(`Complaint-${complaint._id}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("Something went wrong while generating the PDF.");
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="py-4 px-2 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Complaints</h2>
      </div>

      {error && <p className="text-center text-red-500 py-4">{error}</p>}

      {complaints.length === 0 && !loading && !error ? (
        <p className="text-center py-10 text-gray-500">No complaints found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Uploader</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr
                    key={complaint._id}
                    className="border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => handleComplaintClick(complaint._id)}
                  >
                    <td className="px-4 py-3">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{complaint.description || "No description"}</td>
                    <td className="px-4 py-3">{complaint.location || "No location"}</td>
                    <td className="px-4 py-3">
                      {complaint.userId && complaint.userId.name ? complaint.userId.name : "Anonymous"}
                    </td>
                    <td className="px-4 py-3">{complaint.complaintType || "Unknown"}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // ✅ Prevent row navigation
                          downloadComplaintAsPDF(complaint);
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center py-4 border-t">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 mx-1 px-3 py-1 rounded"
            >
              Previous
            </button>

            <span className="ml-4 text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 mx-1 px-3 py-1 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Complaints;
