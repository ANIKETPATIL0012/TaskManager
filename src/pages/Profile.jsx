import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || {
      name: "",
      email: "",
      password: "",
    };

    setUser(savedUser);
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));

    alert("Profile Updated Successfully");
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-5">Profile</h1>

          <div className="bg-white p-6 rounded shadow max-w-xl">
            <label>Name</label>
            <input
              name="name"
              value={user.name}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />

            <label>Email</label>
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />

            <label>Password</label>
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />

            <button
              onClick={saveProfile}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
