import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    alert("Signup Successful");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-96"
      >

        <h2 className="text-2xl font-bold mb-4 text-center">
          Signup
        </h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-green-500 text-white p-2 rounded">
          Signup
        </button>

        <p className="mt-3 text-center">
          Already have account?
          <Link to="/" className="text-blue-500 ml-1">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Signup;
