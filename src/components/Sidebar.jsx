import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden w-screen p-4 bg-gray-800 text-white">
        <button onClick={() => setOpen(!open)} className="text-2xl">
          ☰
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-64 bg-gray-800 text-white p-5
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h1 className="text-2xl font-bold mb-8">Task Manager</h1>

        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="block hover:text-blue-400"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/add-task"
              onClick={() => setOpen(false)}
              className="block hover:text-blue-400"
            >
              Add Tasks
            </Link>
          </li>

          <li>
            <Link
              to="/tasks"
              onClick={() => setOpen(false)}
              className="block hover:text-blue-400"
            >
              Tasks
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="block hover:text-blue-400"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
