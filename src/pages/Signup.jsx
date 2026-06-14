import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(
      (u) => u.email.toLowerCase() === form.email.toLowerCase(),
    );

    if (exists) {
      alert("User already exists");
      return;
    }

    const newUser = {
      id: Date.now(),
      ...form,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful");
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-5 text-center">Signup</h1>

        <input
          name="name"
          placeholder="Name"
          className="w-full border p-3 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-green-500 text-white p-3 rounded">
          Signup
        </button>

        <p className="text-center mt-3">
          Already have account?
          <Link to="/" className="text-blue-600 ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
