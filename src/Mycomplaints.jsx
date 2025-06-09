import React, { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = "http://localhost:5000";

const Mycomplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://miniproject-t63v.onrender.com/user/mycomplaints/${userId}`);
        if (response.data.success) {
          setComplaints(response.data.complaints);
        } else {
          setError("Failed to fetch complaints.");
        }
      } catch (err) {
        setError(err.message || "Error fetching complaints.");
      }
      setLoading(false);
    };

    fetchComplaints();
  }, []);

  if (loading) return <div>Loading complaints...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (complaints.length === 0) return <div>No complaints found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-3xl font-bold mb-8 text-center">My Complaints</h2>
      <ul className="space-y-8">
        {complaints.map((complaint) => {
          const fileUrl = complaint.file ? `${backendUrl}/uploads/${complaint.file}` : null;
          const isVideo = fileUrl && /\.(mp4|webm|ogg)$/i.test(fileUrl);

          return (
            <li key={complaint._id} className="border p-4 rounded shadow bg-gray-50 flex flex-row items-start gap-6">
              <div className="flex-1 min-w-[250px]">
                <p><strong>Description:</strong> {complaint.description}</p>
                <p><strong>Type:</strong> {complaint.complaintType}</p>
                <p><strong>Location:</strong> {complaint.location}</p>
                <p><strong>Reported On:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex-shrink-0 max-w-[180px] max-h-[140px] overflow-hidden rounded border border-gray-300">
                {fileUrl && isVideo ? (
                  <video
                    controls
                    src={fileUrl}
                    className="w-full h-full object-cover"
                  />
                ) : fileUrl ? (
                  <img
                    src={fileUrl}
                    alt="Complaint media"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 p-4">No media</div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Mycomplaints;

