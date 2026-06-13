import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-gray-800 text-white  h-screen-full w-60 p-5">
      <h1 className="text-2xl font-bold mb-5">Task Manager</h1>

      <ul className=" h-screen">
        <li className="mb-3">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="mb-3">
          <Link to="/add-task">Add Tasks</Link>
        </li>
        <li className="mb-3">
          <Link to="/tasks">Tasks</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
