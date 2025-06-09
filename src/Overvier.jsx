import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#4E73DF", "#F6C23E", "#E74A3B", "#36B9CC"];

const Overvier = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const now = new Date();
  const currentYear = now.getFullYear();

  
  const [currentMonthIndex, setCurrentMonthIndex] = useState(now.getMonth());

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("https://miniproject-t63v.onrender.com/user/allComplaints");
        setComplaints(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  
  const barData = monthNames.map((month, index) => {
    const monthComplaints = complaints.filter((c) => {
      const d = new Date(c.createdAt);
      return d.getMonth() === index && d.getFullYear() === currentYear;
    });
    return { name: month, value: monthComplaints.length };
  });

  const currentMonth = monthNames[currentMonthIndex];

  
  const monthComplaints = complaints.filter((c) => {
    const d = new Date(c.createdAt);
    return d.getMonth() === currentMonthIndex && d.getFullYear() === currentYear;
  });

  
  const approvedComplaints = monthComplaints.filter(
    (c) => c.status?.toLowerCase() === "approved"
  );
  const pendingComplaints = monthComplaints.filter(
    (c) => c.status?.toLowerCase() === "pending"
  );
  const rejectedComplaints = monthComplaints.filter(
    (c) => c.status?.toLowerCase() === "rejected"
  );

  
  const getPieDataForMonth = (monthIndex) => {
    const monthComplaints = complaints.filter((c) => {
      const d = new Date(c.createdAt);
      return d.getMonth() === monthIndex && d.getFullYear() === currentYear;
    });

    const locationCount = {};
    monthComplaints.forEach((c) => {
      const loc = c.location || "Unknown";
      locationCount[loc] = (locationCount[loc] || 0) + 1;
    });

    return Object.entries(locationCount).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const pieData = getPieDataForMonth(currentMonthIndex);

  
  const nextMonth = () => {
    if (currentMonthIndex < monthNames.length - 1)
      setCurrentMonthIndex((prev) => prev + 1);
  };

  const prevMonth = () => {
    if (currentMonthIndex > 0) setCurrentMonthIndex((prev) => prev - 1);
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div className="p-6 bg-blue-50 min-h-screen space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Welcome, Admin Name</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "This Month", value: monthComplaints.length, icon: "📅" },
          { label: "Verified Cases", value: approvedComplaints.length, icon: "✔️" },
          { label: "Pending", value: pendingComplaints.length, icon: "⏱️" },
          { label: "Rejected", value: rejectedComplaints.length, icon: "📋" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow flex flex-col items-center text-center"
          >
            <div className="text-gray-500">{item.label}</div>
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-lg">{item.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Month Review</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4E73DF" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center mt-2 text-sm text-gray-500">
            <strong>{barData[currentMonthIndex]?.value || 0}</strong> complaints this
            month
          </p>
          <div className="text-center mt-2">
            <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded text-sm hover:bg-blue-200">
              Details
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={prevMonth}
              disabled={currentMonthIndex === 0}
              className="text-sm text-blue-600 hover:underline disabled:text-gray-400"
            >
              ◀ Prev
            </button>
            <h2 className="text-lg font-semibold">
              {currentMonth} {currentYear}
            </h2>
            <button
              onClick={nextMonth}
              disabled={currentMonthIndex === monthNames.length - 1}
              className="text-sm text-blue-600 hover:underline disabled:text-gray-400"
            >
              Next ▶
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overvier;
