import React, { useEffect, useState } from 'react';
import axios from 'axios';

const View = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);      

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://miniproject-t63v.onrender.com/user/getUserComplaints');
        setComplaints(res.data);
      } catch (err) {
        setError('Failed to fetch complaints');
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);  
      }
    };
    fetchData();
  }, []);

  
  if (loading) {
    return <div className="text-center text-xl">Loading complaints...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-100">
      {complaints.map((item) => (
        <div key={item._id} className="bg-white p-5 shadow-lg rounded-lg hover:shadow-xl transition duration-200">
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Type:</strong> {item.complaintType}</p>
          <p><strong>Location:</strong> {item.location}</p>

          {item.file && item.file.endsWith('.jpg') && (
            <img
              src={`http://localhost:5000/uploads/${item.file}`}
              alt="Complaint Proof"
              className="w-full h-48 object-cover rounded mt-3"
            />
          )}

          {item.file && item.file.endsWith('.mp4') && (
            <video controls className="w-full h-48 object-cover rounded mt-3">
              <source src={`http://localhost:5000/uploads/${item.file}`} type="video/mp4" />
            </video>
          )}

          {!item.file && (
            <p className="text-red-500 mt-2">No proof uploaded</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default View;
