import axios from "axios";
import React, { useEffect, useState } from "react";

const Usermanagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user/allUsers");
        setUsers(res.data.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center py-6">Loading users...</p>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <div className="px-4 py-3 border-b">
        <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
      </div>

      {users.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No users found.</p>
      ) : (
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Address</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID Proof</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Reports</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{user.name || "—"}</td>
                <td className="px-4 py-3 text-sm">{user.email || "—"}</td>
                <td className="px-4 py-3 text-sm">{user.number || "—"}</td>
                <td className="px-4 py-3 text-sm">{user.address || "—"}</td>
                <td className="px-4 py-3 text-sm">{user.idProof || "—"}</td>
                <td className="px-4 py-3 text-sm">{user.reports || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Usermanagement;

