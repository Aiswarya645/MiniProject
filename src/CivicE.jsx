import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { LuBookmarkCheck } from "react-icons/lu";
import { BsExclamationOctagonFill } from "react-icons/bs";
import { GrAchievement } from "react-icons/gr";
import { GiAnvilImpact } from "react-icons/gi";
import { useState } from "react";
import axios from "axios";
import img from './waste.jpg';
import img1 from './p1.jpg';
import img2 from './p2.jpg';
import img3 from './img1.jpg.jpg';
import { FaTrash, FaBullhorn, FaCarCrash, FaEllipsisH } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRef } from "react";


const CivicE = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [token, setToken] = useState(null);

  const dropdownRef = useRef();
 useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Token:", storedToken);
    setToken(storedToken);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/sign');
  };

  const handleDeleteAccount = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const res = await axios.delete('https://miniproject-t63v.onrender.com/user/delete', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(res.data.message);
    
  } catch (error) {
    console.error('Error deleting account:', error);
  }
};


  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setMessage('Please enter some feedback before submitting.');
      return;
    }
    try {
      await axios.post('https://miniproject-t63v.onrender.com/user/feedback', { message: feedback });
      setMessage('Feedback submitted successfully!');
      setFeedback('');
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setMessage('Error submitting feedback. Please try again.');
    }
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      
      <nav className="flex justify-between items-center px-10 py-4 border-b shadow bg-white">
        <h2 className="text-3xl font-bold text-blue-600">
          Civic<span className="text-black">EYE</span>
        </h2>
        <div className="flex items-center space-x-8 relative">
          <p className="cursor-pointer hover:underline">Home</p>
          <Link to='/about'>
            <p className="cursor-pointer hover:underline">About</p>
          </Link>
          <Link to='/contact'>
            <p className="cursor-pointer hover:underline">Contact</p>
          </Link>

          
          <div className="relative" ref={dropdownRef}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-cyan-500 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute top-12 right-0 bg-white border shadow-lg rounded-md px-6 py-4 w-64 z-50">
                <Link to='/profile'>
                  <button className="font-semibold text-gray-800 text-lg mb-4">Profile</button>
                </Link>
                <ul className="space-y-3 text-left text-gray-700">
                  <li
                    className="cursor-pointer hover:text-blue-600"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </li>
                  <li
                    className="cursor-pointer hover:text-blue-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>



     <div className="w-full mt-1">
  <div className="w-full h-[380px] overflow-hidden rounded-xl">
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
      showArrows={false}
    >
      {[img, img1, img2].map((src, i) => (
        <div key={i} className="w-full h-[380px]">
          <img
            src={src}
            alt={`slide-${i}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </Carousel>
  </div>
</div>



    
<section className="mt-10 mb-12 text-center max-w-6xl mx-auto">
  <h2 className="text-2xl font-bold mb-6">Register Complaints</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
  { label: 'Waste Dumping', icon: <FaTrash size={24} /> },
  { label: 'Public Nuisance', icon: <FaBullhorn size={24} /> },
  { label: 'Traffic Violations', icon: <FaCarCrash size={24} /> },
  { label: 'Illegeal Construction', icon: <FaEllipsisH size={24} /> }
].map((item, index) => (
  <Link to="/register" key={index}>
    <div className="border border-gray-300 bg-white p-4 rounded shadow hover:shadow-md cursor-pointer">
      <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mb-3 text-xl">
        {item.icon}
      </div>
      <p className="font-semibold">{item.label}</p>
    </div>
  </Link>
))}

  </div>
</section>

      <section className="py-12 px-6 mt-10 text-center">
        <h2 className="text-2xl font-bold mb-10">Complaint Reports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[{
            Icon: LuBookmarkCheck,
            title1: "Complaints",
            title2: "Registered",
            count: "1002"
          }, {
            Icon: BsExclamationOctagonFill,
            title1: "Reports",
            title2: "Filed",
            count: "992"
          }, {
            Icon: GrAchievement,
            title1: "Rewards",
            title2: "Distributed",
            count: "886"
          }].map(({ Icon, title1, title2, count }, idx) => (
            <div key={idx} className="border p-4 rounded shadow text-center bg-white">
              <Icon className="text-3xl mb-2 mx-auto text-black" />
              <h4 className="font-semibold">{title1}</h4>
              <h4 className="font-semibold">{title2}</h4>
              <p className="text-2xl font-bold">{count}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 px-6 text-center max-w-6xl mx-auto rounded-lg mt-12 shadow">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["You Register the Complaint", "Our Team Verifies & Forwards", "The Authorities Process the Complaint", "You Receive Your Incentive"].map((step, idx) => (
            <div key={idx} className="bg-gray-50 border border-cyan-600 p-6 rounded shadow-sm">
              {step}
            </div>
          ))}
        </div>
      </section>

     <section className="py-12 px-6 text-center max-w-4xl mx-auto mt-12">
  <h2 className="text-2xl font-bold mb-6">What Our Users Say</h2>
  <Carousel
    autoPlay
    infiniteLoop
    showThumbs={false}
    showStatus={false}
    interval={3000}
    showArrows={false}
  >
    {[
      { name: 'Joimon', feedback: 'This is an awesome website simplifying the complaint registration process.' },
      { name: 'Anjali', feedback: 'A great initiative to help keep our city clean!' },
      { name: 'Rahul', feedback: 'Simple, fast, and effective complaint resolution platform.' },
    ].map((user, i) => (
      <div key={i} className="border p-6 rounded shadow bg-white">
        <p className="italic text-lg">"{user.feedback}"</p>
        <p className="mt-4 font-bold">- {user.name}</p>
      </div>
    ))}
  </Carousel>
</section>


      <div className="py-10 px-6 max-w-4xl mx-auto text-center">
        <textarea
          className="w-full border p-4 rounded-md resize-none"
          rows="5"
          placeholder="Write your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-500 px-6 py-2 text-white rounded hover:bg-blue-600"
          onClick={handleFeedbackSubmit}
        >
          Submit
        </button>
        {message && (
          <p className={`mt-2 text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>

 <section className="flex flex-col md:flex-row gap-8 justify-center px-6 pb-20 mt-16">
  {[{
    title: "Support Mail",
    desc: "For any assistance or enquiries, reach out to us.",
    contact: "support@civiceye.com"
  }, {
    title: "Make A Call",
    desc: "Need help? Our team will guide you.",
    contact: "+123 546 6799"
  }].map(({ title, desc, contact }, i) => (
    <div
      key={i}
      className="bg-white border border-cyan-600 rounded-xl shadow-md flex items-center p-6 w-full max-w-2xl min-h-[180px]"
    >
      
      <img
        src={img3}
        alt={title}
        className="h-32 w-32 object-cover mr-6 border border-gray-300"
      />

      
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-base text-gray-700 mb-2">{desc}</p>
        <span className="text-cyan-600 font-semibold text-base">{contact}</span>
      </div>
    </div>
  ))}
</section>




       <footer className="bg-black text-white mt-10 px-10 py-6 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
       
        <div>
          <h3 className="font-semibold border-l-4 border-cyan-500 pl-2 mb-3">Phone Numbers</h3>
          <p>
            <span className="font-medium">Military</span><br />
            (123) 456-7890<br />
            (123) 456-7540
          </p>
          <p className="mt-3">
            <span className="font-medium">State Police</span><br />
            (123) 456-7891
          </p>
          <p className="mt-3">
            <span className="font-medium">Fire Department</span><br />
            (123) 456-7892
          </p>
        </div>

        
        <div>
          <h3 className="font-semibold border-l-4 border-cyan-500 pl-2 mb-3">Contact Info</h3>
          <ul className="space-y-2 list-disc list-inside text-cyan-400">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <a href="mailto:sofrroncs@gmail.com" className="hover:underline">sofrroncs@gmail.com</a>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold border-l-4 border-cyan-500 pl-2 mb-3">Quick Links</h3>
          <ul className="space-y-2 list-disc list-inside text-cyan-400">
            <li>
              <Link to="/civic" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/register" className="hover:underline">Complaints</Link>
            </li>
            <li>
              <Link to="/sign" className="hover:underline">Register</Link>
            </li>
            <li>
              <Link to="/signs" className="hover:underline">Login</Link>
            </li>
          </ul>
        </div>
      </div>

      
      <div className="text-center text-gray-400 mt-6 text-xs">
        © CivicEye 2025 | Empowering Citizens, Improving Communities.
      </div>
    </footer>
    </div>
  );
};

export default CivicE;
