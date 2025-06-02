import React from "react";

const Contact = () => {
  return (
    <div className="font-serif text-base text-gray-800 relative">
      <div className="bg-blue-600 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg mt-3 max-w-3xl mx-auto">
          Have questions or need assistance? We're here to help!
        </p>
      </div>

      <section className="py-12 px-6 text-center max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
        <p className="text-gray-700">
          Whether you're facing an issue or have suggestions, reach out to us through any of the channels below.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto py-12 px-6 text-center">
        <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">
          <h3 className="text-2xl font-semibold mb-2">Support Email</h3>
          <p className="mb-2">Need help with complaints or have inquiries?</p>
          <h4 className="text-cyan-600 font-bold">support@civiceye.com</h4>
        </div>
        <div className="bg-white border p-6 rounded shadow-sm border-cyan-600">
          <h3 className="text-2xl font-semibold mb-2">Helpline</h3>
          <p className="mb-2">Call us for immediate assistance.</p>
          <h4 className="text-cyan-600 font-bold">+123 546 6799</h4>
        </div>
      </section>

      <footer className="bg-black text-white mt-10 px-10 py-6 text-sm text-center">
        <p>© CivicEYE 2025 | Empowering Citizens, Improving Communities.</p>
      </footer>
    </div>
  );
};

export default Contact;
