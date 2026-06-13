import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("Please signup first");
      return;
    }

    if (
      email === storedUser.email &&
      password === storedUser.password
    ) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify(storedUser)
      );

  
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-3 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full border p-3 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 text-white p-3 rounded">
          Login
        </button>

        <p className="mt-4 text-center">
          Create Account?
          <Link to="/signup" className="text-blue-500 ml-2">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
