import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

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
    localStorage.setItem("loggedInUser", JSON.stringify(formData));
    localStorage.setItem("users", JSON.stringify([formData]));

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

        <div className="flex-1 p-4 md:p-6 flex justify-center">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow p-5 md:p-8">
            <h1 className="text-2xl font-bold text-center mb-6">My Profile</h1>

            <div className="space-y-4">
              <input
                name="name"
                value={formData.name}
                disabled={!isEditing}
                onChange={handleChange}
                className="w-full border p-3 rounded bg-gray-50"
              />

              <input
                name="email"
                value={formData.email}
                disabled={!isEditing}
                onChange={handleChange}
                className="w-full border p-3 rounded bg-gray-50"
              />

              <input
                name="password"
                type="password"
                value={formData.password}
                disabled={!isEditing}
                onChange={handleChange}
                className="w-full border p-3 rounded bg-gray-50"
              />
            </div>

            <button
              onClick={() => (isEditing ? saveProfile() : setIsEditing(true))}
              className={`w-full mt-6 p-3 rounded text-white ${
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
