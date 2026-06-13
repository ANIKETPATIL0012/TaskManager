import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/todos");

      const apiTasks = res.data.slice(0, 6).map((t) => ({
        id: t.id,
        title: t.title,
        status: t.completed ? "Completed" : "Pending",
        source: "api",
      }));

      const localTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

      setTasks([...localTasks, ...apiTasks]);
    } catch (err) {
      console.log(err);
    }
  };

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-5">
            Dashboard
          </h1>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-blue-500 text-white p-6 rounded shadow">
              <h2>Total Tasks</h2>
              <h1 className="text-4xl">{total}</h1>
            </div>

            <div className="bg-green-500 text-white p-6 rounded shadow">
              <h2>Completed</h2>
              <h1 className="text-4xl">{completed}</h1>
            </div>

            <div className="bg-red-500 text-white p-6 rounded shadow">
              <h2>Pending</h2>
              <h1 className="text-4xl">{pending}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}