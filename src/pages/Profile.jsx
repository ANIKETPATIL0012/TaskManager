import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // update users list
    users = users.map((u) =>
      u.id === loggedInUser.id ? { ...u, ...formData } : u,
    );

    localStorage.setItem("users", JSON.stringify(users));

    // update current session
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ ...loggedInUser, ...formData }),
    );

    alert("Profile Updated Successfully");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex flex-col md:flex-row flex-1">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 flex justify-center p-4">
          <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow">
            <h1 className="text-2xl font-bold text-center mb-6">My Profile</h1>

            <input
              name="name"
              value={formData.name}
              disabled={!isEditing}
              onChange={handleChange}
              className="w-full border p-3 mb-3 rounded"
            />

            <input
              name="email"
              value={formData.email}
              disabled={!isEditing}
              onChange={handleChange}
              className="w-full border p-3 mb-3 rounded"
            />

            <input
              name="password"
              type="password"
              value={formData.password}
              disabled={!isEditing}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <button
              onClick={() => (isEditing ? saveProfile() : setIsEditing(true))}
              className={`w-full p-3 text-white rounded ${
                isEditing ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
