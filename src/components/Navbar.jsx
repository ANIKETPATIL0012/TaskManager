import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-gray-300 shadow p-4 flex justify-between">
      <h1>Dashboard</h1>
      <button onClick={logout}className="bg-red-500 text-white px-3 py-1">
        Logout
      </button>

    </div>
  );
}

export default Navbar;