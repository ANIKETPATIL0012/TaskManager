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

    alert("Profile Updated");
    setIsEditing(false);
  };

  return (
    <div>
      <Navbar />

      <div className="flex bg-gray-100 min-h-screen">
        <Sidebar />
        <div className=" bg-gray-100 m-6">
          <div className="bg-white p-6 rounded-xl shadow-lg w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

            <div className="space-y-4">
              <div>
                <label className="font-medium">Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                />
              </div>

              <div>
                <label className="font-medium">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                />
              </div>

              <div>
                <label className="font-medium">Password</label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={saveProfile}
                  className="flex-1 bg-green-500 text-white py-2 rounded"
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
