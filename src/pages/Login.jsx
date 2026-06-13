
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      alert("Please signup first");
      return;
    }

    if (email === user.email && password === user.password) {
      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard");   // ✅ DASHBOARD OPEN
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 w-96 shadow rounded-xl">

        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 text-white p-2">
          Login
        </button>

        <p className="mt-3 text-center">
          New user? <Link to="/signup" className="text-blue-500">Signup</Link>
        </p>

      </form>
    </div>
  );
};

export default Login;