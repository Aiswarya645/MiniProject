import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

 const handleSubmit = async (event) => {
  event.preventDefault();

  const userData = {
    ...data,
    userType: "user" // ✅ Add default userType here
  };

  console.log("📤 Submitting registration data:", userData);

  try {
    const response = await axios.post("http://localhost:5000/user/register", userData);
    console.log("Registration Response:", response.data);

    if (response.data.success) {
      alert("Registration successful! Please log in.");
      navigate("/signs"); // ✅ Go to login
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Error submitting data:", error);
    alert("Registration failed. Please try again.");
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[800px] flex items-center border border-gray-300 relative">
        <div className="w-1/2 flex flex-col justify-center items-center pr-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">CIVIC <span className="text-blue-600">EYE</span></h2>
          <p className="mt-4 text-gray-700 font-semibold">Welcome to CivicEye!</p>
          <p className="text-gray-600 text-sm leading-relaxed">Your platform to report, track, and resolve public issues with ease.</p>
        </div>

        <div className="absolute left-1/2 top-10 bottom-10 w-px bg-gray-300"></div>

        <div className="w-1/2 flex flex-col justify-center pl-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">SIGN <span className="text-blue-600">UP</span></h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dob"
              className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border border-gray-400 p-2 w-full rounded-md mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md w-full font-semibold hover:bg-blue-600 transition text-sm"
            >
              SIGN UP
            </button>

            <p className="text-center text-gray-600 mt-4 text-xs">
              Already have an account?{" "}
              <Link to="/signs" className="text-blue-600 font-semibold">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
