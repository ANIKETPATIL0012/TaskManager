import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [form, setForm] = useState({
    id: currentUser?.id,
    name: currentUser?.name,
    email: currentUser?.email,
    password: currentUser?.password,
  });

  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const updated = users.map((u) => (u.id === form.id ? form : u));

    localStorage.setItem("users", JSON.stringify(updated));

    localStorage.setItem("loggedInUser", JSON.stringify(form));

    alert("Profile updated");
    setEdit(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        <div className="flex-1 flex justify-center p-3 sm:p-4 md:p-8">
          <div className="bg-white w-full max-w-2xl mb-32 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
              My Profile
            </h1>

            <div className="mb-4">
              <label className="block font-medium mb-2 text-sm sm:text-base">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                disabled={!edit}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-sm sm:text-base"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2 text-sm sm:text-base">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                disabled={!edit}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-sm sm:text-base"
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-2 text-sm sm:text-base">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                disabled={!edit}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-sm sm:text-base"
              />
            </div>

            {!edit ? (
              <button
                onClick={() => setEdit(true)}
                className="w-full md:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={save}
                className="w-full md:w-auto bg-green-500 text-white px-6 py-3 rounded-lg"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
