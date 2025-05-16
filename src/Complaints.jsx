import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // Number of items per page
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/user/allComplaints?page=${page}&limit=${limit}`
        );
        setComplaints(res.data.data);
        setTotalPages(res.data.totalPages); // Make sure backend sends this
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0); // Scroll to top when changing page
    }
  };

  const downloadComplaintAsPDF = (complaint) => {
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Set font size and styles
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Complaint Details", 20, 20);
    
    // Reset font for regular text
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    // Add complaint details
    doc.text(`ID: ${complaint._id}`, 20, 35);
    doc.text(`Date: ${new Date(complaint.createdAt).toLocaleDateString()}`, 20, 45);
    doc.text(`Description: ${complaint.description || "Waste Dumping"}`, 20, 55);
    doc.text(`Location: ${complaint.location}`, 20, 65);
    doc.text(`Reported by: ${complaint.userId?.name || "Anonymous"}`, 20, 75);
    doc.text(`Type: ${complaint.complaintType}`, 20, 85);
    
    // Add additional information if available
    let yPosition = 95;
    
    if (complaint.status) {
      doc.text(`Status: ${complaint.status}`, 20, yPosition);
      yPosition += 10;
    }
    
    if (complaint.resolvedDate) {
      doc.text(`Resolved Date: ${new Date(complaint.resolvedDate).toLocaleDateString()}`, 20, yPosition);
      yPosition += 10;
    }
    
    // Add a footer
    doc.setFontSize(10);
    doc.text("This document was generated automatically.", 20, 280);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 287);
    
    // Save the PDF with a filename based on the complaint ID
    doc.save(`Complaint-${complaint._id}.pdf`);
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div className="bg-white rounded-lg">
      <div className="py-4 px-2 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Complaints</h2>
      </div>

      {complaints.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No complaints found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Uploader
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Type
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint._id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      {complaint.description || "Waste Dumping"}
                    </td>
                    <td className="py-3 px-4">{complaint.location}</td>
                    <td className="py-3 px-4">
                      {complaint.userId?.name || "Anonymous"}
                    </td>
                    <td className="py-3 px-4">{complaint.complaintType}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded text-sm"
                          onClick={() => navigate(`/complaint/${complaint._id}`)}
                        >
                          View
                        </button>
                        <button
                          className="text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
                          title="Download as PDF"
                          onClick={() => downloadComplaintAsPDF(complaint)}
                        >
                          ⬇️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center py-4 border-t">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className={`mx-1 px-3 py-1 rounded ${
                page <= 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              Previous
            </button>
            
            <div className="flex mx-2">
              {[...Array(totalPages).keys()].map((num) => {
                // Show only nearby pages for better UX when there are many pages
                if (
                  num + 1 === 1 ||
                  num + 1 === totalPages ||
                  (num + 1 >= page - 1 && num + 1 <= page + 1)
                ) {
                  return (
                    <button
                      key={num}
                      onClick={() => handlePageChange(num + 1)}
                      className={`mx-1 w-8 h-8 flex items-center justify-center rounded ${
                        page === num + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {num + 1}
                    </button>
                  );
                } else if (
                  (num + 1 === page - 2 && page > 3) ||
                  (num + 1 === page + 2 && page < totalPages - 2)
                ) {
      
                  return (
                    <span
                      key={num}
                      className="mx-1 w-8 h-8 flex items-center justify-center"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className={`mx-1 px-3 py-1 rounded ${
                page >= totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              Next
            </button>
            
            <span className="ml-4 text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Complaints;