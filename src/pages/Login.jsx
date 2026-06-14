import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password === password,
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-5 text-center">Login</h1>

        <input
          className="w-full border p-3 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-4 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 text-white p-3 rounded">
          Login
        </button>

        <p className="text-center mt-3">
          No account?
          <Link to="/signup" className="text-blue-600 ml-1">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
