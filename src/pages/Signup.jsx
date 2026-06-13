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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Signup successful");
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-96 shadow rounded-xl">

        <h1 className="text-2xl font-bold mb-4">Signup</h1>

        <input name="name" placeholder="Name" className="w-full border p-2 mb-3"
          onChange={handleChange} />

        <input name="email" placeholder="Email" className="w-full border p-2 mb-3"
          onChange={handleChange} />

        <input type="password" name="password" placeholder="Password"
          className="w-full border p-2 mb-3" onChange={handleChange} />

        <input type="password" name="confirmPassword" placeholder="Confirm Password"
          className="w-full border p-2 mb-3" onChange={handleChange} />

        <button className="w-full bg-green-500 text-white p-2">
          Signup
        </button>

        <p className="mt-3 text-center">
          Already have account? <Link to="/" className="text-blue-500">Login</Link>
        </p>

      </form>
    </div>
  );
};

export default Signup;