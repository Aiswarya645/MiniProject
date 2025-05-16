import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { LuBookmarkCheck } from "react-icons/lu";
import { BsExclamationOctagonFill } from "react-icons/bs";
import { GrAchievement } from "react-icons/gr";
import { GiAnvilImpact } from "react-icons/gi";
import img from './waste.jpg';
import img1 from './p1.jpg';
import img2 from './p2.jpg';
import { Link } from "react-router-dom";


const CivicE = () => {
  return (
    <div className="font-serif text-base text-gray-800 relative">
      
      <nav className="flex justify-between items-center px-10 py-4 border-b shadow-sm bg-white">
        <h2 className="text-3xl font-bold text-blue-600">
          Civic<span className="text-black">EYE</span>
        </h2>
        <div className="flex items-center space-x-8 relative group">
          <p className="cursor-pointer hover:underline">Home</p>
         
          <p className="cursor-pointer hover:underline">About</p>
          <p className="cursor-pointer hover:underline">Contact</p>
          
          <div className="cursor-pointer relative group">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile"className="w-10 h-10 rounded-full border-2 border-cyan-500" />
            
       
            <div className="absolute top-12 right-0 bg-white border shadow-lg rounded-md px-6 py-4 w-64 hidden group-hover:block z-50">
            <Link to='/profile'>
              <button className="font-semibold text-gray-800 text-lg mb-4">Profile </button>
              </Link>
              <ul className="space-y-3 text-left text-gray-700">
                <li className="cursor-pointer hover:text-blue-600">Delete Account</li>
                <li className="cursor-pointer hover:text-blue-600">Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-96 overflow-hidden rounded-2xl mt-4 mx-10">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={3000} showArrows={false}>
          <div className="h-96">
            <img src={img} alt="slide-1" className="object-cover w-full h-full" />
          </div>
          <div className="h-96">
            <img src={img1} alt="slide-2" className="object-cover w-full h-full" />
          </div>
          <div className="h-96">
            <img src={img2} alt="slide-3" className="object-cover w-full h-full" />
          </div>
        </Carousel>
      </div>

      <div className="w-full h-96 bg-black text-white flex flex-col items-center justify-center text-center px-4 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold">Make Your Voice Heard!</h1>
        <h2 className="text-2xl md:text-3xl mt-3">Report Problems, Help Your City, and</h2>
        <h2 className="text-2xl md:text-3xl mt-2">Earn Rewards!</h2>
        <button className="mt-6 bg-blue-500 px-6 py-2 rounded-xl hover:bg-blue-600">Sign up</button>
      </div>

      <section className="bg-white py-12 px-6 text-center mt-12">
        <h2 className="text-2xl font-bold mb-10">Complaint Reports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          <div className="border p-6 rounded shadow text-center">
            <LuBookmarkCheck className="text-3xl mb-2 mx-auto" />
            <h4 className="font-semibold">Complaints</h4>
            <h4 className="font-semibold">Registered</h4>
            <p className="text-2xl font-bold">1002</p>
          </div>
          <div className="border p-6 rounded shadow text-center">
            <BsExclamationOctagonFill className="text-3xl mb-2 mx-auto" />
            <h4 className="font-semibold">Reports</h4>
            <h4 className="font-semibold">Filed</h4>
            <p className="text-2xl font-bold">992</p>
          </div>
          <div className="border p-6 rounded shadow text-center">
            <GrAchievement className="text-3xl mb-2 mx-auto" />
            <h4 className="font-semibold">Rewards</h4>
            <h4 className="font-semibold">Distributed</h4>
            <p className="text-2xl font-bold">886</p>
          </div>
          <div className="border p-6 rounded shadow text-center">
            <GiAnvilImpact className="text-3xl mb-2 mx-auto" />
            <h4 className="font-semibold">Impact</h4>
            <h4 className="font-semibold">Made</h4>
            <p className="text-2xl font-bold">---</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12 px-6 text-center max-w-6xl mx-auto rounded-lg mt-12">
        <h2 className="text-2xl font-bold mb-6">What We Do</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">
            You Register the Complaint
          </div>
          <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">
            Our Team Verifies & Forwards
          </div>
          <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">
            The Responsible Authorities Process the Complaint
          </div>
          <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">
            Your Incentive is Processed & Received
          </div>
        </div>
      </section>

      <section className="py-12 px-6 text-center max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6">What Our Users Have to Say</h2>
        <div className="border p-6 rounded shadow mx-auto">
          <p>"This is an awesome website,</p>
          <p>simplifying the complaint</p>
          <p>registration process."</p>
          <p className="mt-2 font-bold">- Joimon</p>
        </div>
      </section>

      <section className="py-10 px-6 max-w-4xl mx-auto text-center mt-12">
        <textarea
          className="w-full border p-4 rounded-md resize-none"
          rows="5"
          placeholder="Write your feedback"
        />
        <button className="mt-4 bg-blue-500 px-6 py-2 text-white rounded hover:bg-blue-600">
          Submit
        </button>
      </section>

      <section className="flex flex-col md:flex-row gap-6 justify-evenly px-6 pb-12 text-center mt-12">
        <div className="bg-white border p-6 rounded shadow-sm border-cyan-600 flex-1">
          <h3 className="text-2xl font-semibold mb-2">Support Mail</h3>
          <p className="mb-2">For any assistance or enquiries about reporting issues or using Civic Eye, feel free to reach out to us.</p>
          <h4 className="text-cyan-600 font-bold">support@civiceye.com</h4>
        </div>
        <div className="bg-white border p-6 rounded shadow-sm border-cyan-600 flex-1">
          <h3 className="text-2xl font-semibold mb-2">Make A Call</h3>
          <p className="mb-2">Need immediate assistance or have any questions? Our team will guide you through.</p>
          <h4 className="text-cyan-600 font-bold">+123 546 6799</h4>
        </div>
      </section>
      <footer className="bg-black text-white mt-10 px-10 py-6 text-sm">
  <div className="grid grid-cols-3 gap-10">
   
    <div>
      <h3 className="font-semibold border-l-4 border-cyan-500 pl-2 mb-3">Phone Numbers</h3>
      <p className="mb-1"><span className="font-medium">Military</span><br />(123) 456-7890<br />(123) 456-7540</p>
      <p className="mt-3 mb-1"><span className="font-medium">State Police</span><br />(123) 456-7891</p>
      <p className="mt-3"><span className="font-medium">Fire Department</span><br />(123) 456-7892</p>
    </div>

   
    <div>
      <h3 className="font-semibold border-l-4 border-cyan-500 pl-2 mb-3">Contact Info</h3>
      <div className="flex items-center mb-2">
        
      </div>
     <div>
     <ul className="space-y-2 list-disc list-inside text-cyan-400">
        <li>Home</li>
        <li>Sofrroncs@gmail.com</li>
        <li></li>
       
      </ul>
     </div>
     
    </div>

    
    <div>
      <h3 className="font-semibold border-l-4 border-cyan-500 pl-2 mb-3">Quick links</h3>
      <ul className="space-y-2 list-disc list-inside text-cyan-400">
        <li>Home</li>
        <li>Complaints</li>
        <li>Register</li>
        <li>Login</li>
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
