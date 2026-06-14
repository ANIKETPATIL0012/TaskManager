import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    let users =
      JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(
      (u) =>
        u.email.trim().toLowerCase() ===
        form.email.trim().toLowerCase()
    );

    if (exists) {
      alert("User already exists");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Signup successful");
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-5 text-center">
          Signup
        </h1>

        <input
          name="name"
          placeholder="Name"
          className="w-full border p-3 mb-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
          required
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