import React from "react";

const About = () => {
  return (
    <div className="font-serif text-base text-gray-800 relative">
      <div className="bg-blue-600 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold">About CivicEYE</h1>
        <p className="text-lg mt-3 max-w-3xl mx-auto">
          Empowering citizens to report issues, take action, and improve their communities.
        </p>
      </div>

      <section className="py-12 px-6 text-center max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
        <p className="text-gray-700">
          CivicEYE is a user-centric platform designed to simplify complaint registration. 
          We aim to enhance communication between citizens and authorities, ensuring every issue 
          is addressed efficiently.
        </p>
      </section>

      <section className="bg-gray-100 py-12 px-6 text-center max-w-6xl mx-auto rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">
            <p className="font-semibold">You Register a Complaint</p>
          </div>
          <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">
            <p className="font-semibold">Our Team Verifies & Forwards</p>
          </div>
          <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">
            <p className="font-semibold">Authorities Address the Issue</p>
          </div>
          <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">
            <p className="font-semibold">You Receive Your Incentive</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 text-center max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6">Why Choose CivicEYE?</h2>
        <ul className="space-y-4 text-gray-700">
          <li>✔ Streamlined complaint process</li>
          <li>✔ Verified issue forwarding</li>
          <li>✔ Direct communication with responsible authorities</li>
          <li>✔ Rewards for active participation</li>
        </ul>
      </section>

      <section className="bg-blue-600 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold">Join Us & Make a Difference!</h2>
        <p className="text-lg mt-3 max-w-3xl mx-auto">
          CivicEYE is committed to creating better communities, one report at a time.
        </p>
        <button className="mt-6 bg-white text-blue-600 font-bold px-6 py-2 rounded-xl hover:bg-gray-200">
          Get Started
        </button>
      </section>

      <footer className="bg-black text-white mt-10 px-10 py-6 text-sm text-center">
        <p>© CivicEYE 2025 | Empowering Citizens, Improving Communities.</p>
      </footer>
    </div>
  );
};

export default About;
