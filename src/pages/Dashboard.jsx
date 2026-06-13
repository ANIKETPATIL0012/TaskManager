import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/todos");

      const apiTasks = res.data.map((t) => ({
        id: t.id,
        title: t.title,
        status: t.completed ? "Completed" : "Pending",
        source: "api",
      }));

      const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      setTasks([...localTasks, ...apiTasks]);
    } catch (err) {
      console.log(err);
    }
  };

  const total = tasks.length;

  const completed = tasks.filter((task) => task.status === "Completed").length;

  const pending = tasks.filter((task) => task.status === "Pending").length;

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        <div className="flex-1 bg-gray-100 min-h-screen p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-medium">Total Tasks</h2>

              <h1 className="text-3xl md:text-4xl font-bold mt-2">{total}</h1>
            </div>

            <div className="bg-green-500 text-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-medium">Completed</h2>

              <h1 className="text-3xl md:text-4xl font-bold mt-2">
                {completed}
              </h1>
            </div>

            <div className="bg-red-500 text-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-medium">Pending</h2>

              <h1 className="text-3xl md:text-4xl font-bold mt-2">{pending}</h1>
            </div>
          </div>

          <div className="mt-8 bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Recent Tasks</h2>

            <div className="space-y-3">
              {tasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className="border p-3 rounded-lg flex justify-between items-center"
                >
                  <span className="truncate">{task.title}</span>

                  <span
                    className={`font-medium ${
                      task.status === "Completed"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
