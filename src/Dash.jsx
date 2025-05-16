import React, { useState } from "react";
import { MdOutlineViewCarousel } from "react-icons/md";
import { BsPersonFillUp } from "react-icons/bs";
import { MdFeedback } from "react-icons/md";
import Complaints from "./Complaints";

import Overvier from "./Overvier";
import Usermanagement from "./Usermanagement";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-72 h-full flex-shrink-0 overflow-y-auto">
        <h1 className="font-semibold text-3xl py-3 px-2 text-center">
          Civic<span className="text-sky-500">EYE</span>
        </h1>

        <div className="mt-10 px-6 flex flex-col gap-2">
          <div
            className={`flex items-center gap-3 p-3 cursor-pointer rounded transition-all ${
              activeTab === "overview"
                ? "bg-sky-500 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <MdOutlineViewCarousel size={28} />
            <h1 className="text-xl">Overvier</h1>
          </div>

          <div
            className={`flex items-center gap-3 p-3 cursor-pointer rounded transition-all ${
              activeTab === "complaints"
                ? "bg-sky-500 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("complaints")}
          >
            <BsPersonFillUp size={28} />
            <h1 className="text-xl">Complaints</h1>
          </div>

          <div
            className={`flex items-center gap-3 p-3 cursor-pointer rounded transition-all ${
              activeTab === "userManagement"
                ? "bg-sky-500 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("userManagement")}
          >
            <BsPersonFillUp size={28} />
            <h1 className="text-xl">User Management</h1>
          </div>

          <div
            className={`flex items-center gap-3 p-3 cursor-pointer rounded transition-all ${
              activeTab === "feedback"
                ? "bg-sky-500 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("feedback")}
          >
            <MdFeedback size={28} />
            <h1 className="text-xl">Feedback</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 flex">
        <div className="max-w-4xl mx-auto rounded-2xl py-6 px-4 w-full">
          {activeTab === "overview" && <Overvier/>}
          {activeTab === 'userManagement' && <Usermanagement/>}
          {activeTab === "complaints" && <Complaints />}
          {activeTab === "feedback" && (
            <p className="text-lg text-gray-700">
              Feedback section coming soon...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;