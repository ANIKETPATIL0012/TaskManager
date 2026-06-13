import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
      id: Date.now(),
      ...task,
    };

    const updatedTasks = [...oldTasks, newTask];

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    navigate("/tasks");
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <div className="bg-white p-6 rounded shadow max-w-3xl">
            <h1 className="text-2xl font-bold mb-5">Add New Task</h1>

            <form onSubmit={handleSubmit}>
              <input
                name="title"
                type="text"
                placeholder="Title"
                className="border p-2 w-full mb-4 rounded"
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                className="border p-2 w-full mb-4 rounded"
                onChange={handleChange}
                required
              />

              <select
                name="priority"
                className="border p-2 w-full mb-4 rounded"
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <input
                name="dueDate"
                type="date"
                className="border p-2 w-full mb-4 rounded"
                onChange={handleChange}
                required
              />

              <button className="bg-blue-500 text-white px-5 py-2 rounded">
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
