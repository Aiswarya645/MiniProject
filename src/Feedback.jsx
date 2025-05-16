import React, { useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!feedback) {
      setError("Feedback is required");
      return;
    }

    try {
      // Replace the URL below with your actual backend API URL
      const response = await axios.post("http://localhost:5000/api/feedback", {
        feedback,
      });

      if (response.status === 201) {
        setMessage("Feedback added successfully");
        setFeedback(""); // Clear feedback input field after successful submission
      }
    } catch (err) {
      setError("Error submitting feedback. Please try again later.");
      console.error("Error adding feedback:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Submit Feedback</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none mb-4"
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Write your feedback here..."
            rows="5"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
          >
            Submit Feedback
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-600 text-center font-medium">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
