import React from 'react';
import { FaUser, FaUsers, FaFileAlt, FaChartPie } from 'react-icons/fa';

const Open = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
    
      <div className="w-64 bg-white p-4 flex flex-col justify-between rounded-l-lg shadow-md">
        <div>
          <div className="text-2xl font-bold text-blue-600 mb-10 pl-2">
            Civic<span className="text-black">EYE</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-black pl-2 px-3 py-2 hover:bg-cyan-500 rounded">
              <FaChartPie />
              <span>Overview</span>
            </div>
            <div className="flex items-center gap-2 text-black pl-2 px-3 py-2 hover:bg-cyan-500 rounded">
              <FaFileAlt />
              <span>Complaints</span>
            </div>
            <div className="flex items-center gap-2 text-black hover:bg-cyan-500 px-3 py-2 rounded">
              <FaUsers />
              <span>User Management</span>
            </div>
            <div className="flex items-center gap-2 text-black hover:bg-cyan-500 pl-2  px-3 py-2 hover:font-semibold rounded">
              <FaFileAlt />
              <span>Reports</span>
            </div>
          </div>
        </div>
        <div className="bg-cyan-600 text-white text-center py-2 rounded mt-10">
          Admin Name
        </div>
      </div>

      
          
      </div>
    
  );
};

export default Open;
