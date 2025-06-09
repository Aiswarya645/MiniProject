import React, { useState, useEffect } from "react";
import axios from "axios";

const Feedback = () => {
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("https://miniproject-t63v.onrender.com/user/getfeedback");
        setAllFeedbacks(response.data);
      } catch (err) {
        console.error("Failed to fetch feedbacks", err);
      }
    };
    fetchFeedbacks();
  }, []);

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "No date available" : date.toLocaleString();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4">All Feedback</h3>
        {allFeedbacks.length === 0 ? (
          <p className="text-gray-600 text-center">No feedback available.</p>
        ) : (
          <ul className="space-y-4 max-h-64 overflow-y-auto">
            {allFeedbacks.map((fb) => (
              <li key={fb._id} className="border p-4 rounded-md bg-gray-50">
                {fb.message}
                <div className="text-sm text-gray-400 mt-1">{formatDate(fb.submittedAt)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Feedback;
