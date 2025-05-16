import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-20 text-center text-gray-800 font-serif">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">About Our Platform</h2>
      <p className="text-lg max-w-3xl mx-auto leading-relaxed">
        Our mission is to create a transparent and efficient communication channel between the public
        and authorities. Whether you're reporting issues, giving feedback, or looking to make your voice heard — 
        this platform empowers you to take action and be part of the solution.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded shadow border-t-4 border-blue-500">
          <h4 className="text-xl font-semibold mb-2">Transparency</h4>
          <p className="text-sm">All submitted reports are visible, trackable, and handled fairly by the team.</p>
        </div>
        <div className="bg-white p-6 rounded shadow border-t-4 border-green-500">
          <h4 className="text-xl font-semibold mb-2">Participation</h4>
          <p className="text-sm">Every citizen can raise issues and give feedback to improve public services.</p>
        </div>
        <div className="bg-white p-6 rounded shadow border-t-4 border-yellow-500">
          <h4 className="text-xl font-semibold mb-2">Impact</h4>
          <p className="text-sm">Your voice matters — every action contributes to a better city and community.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
