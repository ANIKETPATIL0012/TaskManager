import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem("currentUser", JSON.stringify(formData));

    localStorage.setItem("user", JSON.stringify(formData));

    alert("Profile Updated Successfully");

    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        <div className="flex-1 p-4 md:p-6 lg:p-8 flex justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-5 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
              My Profile
            </h1>

            <div className="space-y-5">
              <div>
                <label className="block font-medium mb-2">Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 outline-none ${
                    isEditing
                      ? "focus:ring-2 focus:ring-blue-400"
                      : "bg-gray-100"
                  }`}
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 outline-none ${
                    isEditing
                      ? "focus:ring-2 focus:ring-blue-400"
                      : "bg-gray-100"
                  }`}
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Password</label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 outline-none ${
                    isEditing
                      ? "focus:ring-2 focus:ring-blue-400"
                      : "bg-gray-100"
                  }`}
                />
              </div>
            </div>

            <div className="mt-8">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={saveProfile}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
