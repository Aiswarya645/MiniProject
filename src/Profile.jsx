import React from "react";


const Profile = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 w-auto">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[900px] flex items-center border border-gray-300 relative gap-8 w-80">
       
        <div className="w-1/2 flex flex-col  pr-6 justify-start  gap-8">
        <h2 className="text-4xl font-bold  text-gray-800 w-1/2 flex ">CIVIC <span className="text-blue-600">EYE</span></h2>
          <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-7"></h1>
         
        
          
          <input type="text" placeholder="Full Name" className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <input type="text" placeholder="Mobile Number" className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <input type="email" placeholder="Email" className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="date" placeholder="Date of Birth" className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

          
          <button className="bg-blue-500 text-white py-2 rounded-md w-full font-semibold hover:bg-blue-600 transition text-sm">Edit</button>
          
        </div>
        
      
        <div className="absolute left-1/2 top-10 bottom-10 w-px bg-gray-300"></div>
        
      
        <div className="w-1/2 flex flex-col justify-center pl-6 gap-8">
         
          
          <input type="text" placeholder="State" className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <select className="border border-gray-400 p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2">
  <option value="">Select District</option>
  <option value="">Calicut</option>
  <option value="">Kannur</option>
  <option value="">Trissur</option>
  <option value="">Trivandram</option>
  <option value="">Malappuram</option>
  <option value="">Kollam</option>
  <option value="">Kollam</option>
  <option value="">Kottayam</option>
</select>

          <input type="text" placeholder="Address" className="border border-gray-400 p-7 w-full rounded-md  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Id proof" className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <input type="text" placeholder="ID Proof Number" className="border border-gray-400 p-2 w-full rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

          
          <button className="bg-blue-500 text-white py-2 rounded-md w-full font-semibold hover:bg-blue-600 transition text-sm">Submit</button>
        </div>
        
      </div>

     
    </div>
  );
};

export default Profile;