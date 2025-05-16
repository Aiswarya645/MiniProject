import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { LuBookmarkCheck } from "react-icons/lu";
import { BsExclamationOctagonFill } from "react-icons/bs";
import { GrAchievement } from "react-icons/gr";
import { GiAnvilImpact } from "react-icons/gi";
import img from './waste.jpg'
import img1 from './p1.jpg'
import img2 from './p2.jpg'
import img3 from './img1.jpg.jpg'
import { Link } from "react-router-dom";

const Civic = () => {

  

  return (
    <div className="font-serif text-base">

    
      <nav className="flex justify-between items-center px-10 py-4 border-b shadow-sm">
        <h2 className="text-3xl font-bold text-blue-600">
          Civic<span className="text-black">EYE</span>
        </h2>
        <div className="flex items-center space-x-10">
        <Link to='/civicE'>
          <p className="cursor-pointer hover:font-semibold">Home</p>
          </Link>
          <p className="cursor-pointer hover:font-semibold">About</p>
          <p className="cursor-pointer hover:font-semibold">Contact</p>
          
          <Link to='/signs'>
          <button className="bg-gray-200 px-5 py-2 rounded-md hover:bg-gray-300">Login</button>
          </Link>
        </div>
      </nav>

      <div className="h-96 overflow-hidden rounded-2xl">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
          showArrows={false}
        >
          <div className="h-96">
            <img src={img} className="object-cover w-full h-full" />
          </div>
          <div className="h-96">
            <img src={img1} className="object-cover w-full h-full" />
          </div>
          <div className="h-96">
            <img src={img2} className="object-cover w-full h-full" />
          </div>
        </Carousel>
      </div>

      <div className="w-full h-96 bg-black text-white flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Make Your Voice Heard!</h1>
        <h2 className="text-3xl md:text-4xl mt-3">Report Problems, Help Your City, and</h2>
        <h2 className="text-3xl md:text-4xl mt-2">Earn Rewards!</h2>
        <Link to='/sign'>
      <button className="mt-6 bg-blue-500 px-6 py-2 rounded-xl text-white hover:bg-blue-600">Sign Up</button>
      
          </Link>
      </div>
      

      <div className="bg-white py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-10">Complaint Reports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          <div className="border p-6 rounded shadow text-center">
            <LuBookmarkCheck className="mx-auto text-3xl mb-2" />
            
            <h4 className="font-semibold">Registered</h4>
            <p className="text-2xl font-bold">1002</p>
          </div>
          <div className="border p-6 rounded shadow text-center">
            <BsExclamationOctagonFill className="mx-auto text-3xl mb-2" />
            <h4 className="font-semibold">Reports</h4>
            <h4 className="font-semibold">Filed</h4>
            <p className="text-2xl font-bold">992</p>
          </div>
          <div className="border p-6 rounded shadow text-center">
            <GrAchievement className="mx-auto text-3xl mb-2" />
            <h4 className="font-semibold">Rewards</h4>
            <h4 className="font-semibold">Distributed</h4>
            <p className="text-2xl font-bold">886</p>
          </div>
          <div className="border p-6 rounded shadow text-center">
            <GiAnvilImpact className="mx-auto text-3xl mb-2" />
            <h4 className="font-semibold">Impact</h4>
            <h4 className="font-semibold">Made</h4>
            <p className="text-2xl font-bold">......</p>
          </div>
        </div>
      </div>

     
      <div className="bg-gray-100 py-12 px-6 text-center max-w-6xl mx-auto rounded-lg">
        <h2 className="text-2xl font-bold mb-6">What We Do</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">You <br /> Register the Complaint</div>
          <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">Our Team <br /> Verifies & Forwards</div>
          <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">Authorities <br /> Process the Complaint</div>
          <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">You Receive <br /> Your Incentive</div>
        </div>
      </div>

      
      <div className="py-12 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">What Our Users Have to Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-6 rounded shadow">
            <p>"This is an awesome website,</p>
            <p>simplifying the complaint</p>
            <p>registration process."</p>
            <p className="mt-2 font-bold">- Joimon</p>
          </div>
          <div className="border p-6 rounded shadow">
            <p>"This is an awesome website,</p>
            <p>simplifying the complaint</p>
            <p>registration process."</p>
            <p className="mt-2 font-bold">- Joimon</p>
          </div>
        </div>
      </div>

      
      <div className="py-10 px-6 max-w-4xl mx-auto text-center">
        <textarea
          className="w-full border p-4 rounded-md resize-none"
          rows="5"
          placeholder="Write your feedback"
        />
        <button className="mt-4 bg-blue-500 px-6 py-2 text-white rounded hover:bg-blue-600">
          Submit
        </button>
      </div>
      <div className="flex justify-evenly">
      <div className="bg-white border p-6 rounded shadow-sm border-cyan-600 flex flex-col justify-evenly">
      <img src={img3} className="h-40 w-40" />
        <h3 className="text-3xl">Mail support</h3>
        <p>For any assistance or enquiries about  reporting issues or <br></br>using Civic eye,feel free to reach out to us </p>
        <h4 className="text-cyan-600 font-bold">support@civiceye.com</h4>
      </div>
        <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">
        <img src={img3} className="h-40 w-40" />
         <h3 className="text-3xl">Make a Call</h3>
         <p>Need immediate assistance or having any questions about <br></br>using civic eye ,and our team will quide you through</p>
         <h4 className="text-cyan-600 font-bold">+123 546 6799</h4>
        </div>
    </div>
    <footer className="bg-black text-white mt-10 px-10 py-6 text-sm  ">
  <div className="grid grid-cols-3 gap-10" >
   
    <div >
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
        <li>Softronics</li>
        <li> +(123) 456-7892</li>
        <li>Sofrroncs@gmail.com</li>
        
       
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

export default Civic;
