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
    <div>
      <Navbar />

      <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
        <Sidebar />

        <div className="flex-1 p-4 md:p-6 flex justify-center">
          <div className="bg-white p-5 md:p-8 rounded-xl shadow-lg w-full max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
              Add New Task
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                type="text"
                placeholder="Task Title"
                className="border p-3 w-full rounded-lg"
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Task Description"
                rows="4"
                className="border p-3 w-full rounded-lg"
                onChange={handleChange}
                required
              />

              <select
                name="priority"
                className="border p-3 w-full rounded-lg"
                onChange={handleChange}
              >
                <option value="Low">Low Priority</option>

                <option value="Medium">Medium Priority</option>

                <option value="High">High Priority</option>
              </select>

              <input
                name="dueDate"
                type="date"
                className="border p-3 w-full rounded-lg"
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
