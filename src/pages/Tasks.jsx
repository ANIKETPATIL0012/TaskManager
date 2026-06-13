import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const [editTask, setEditTask] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const apiData = await res.json();

      const apiTasks = apiData.slice(0, 15).map((t) => ({
        id: t.id,
        title: t.title,
        description: "API Task",
        priority: "Medium",
        dueDate: "N/A",
        status: t.completed ? "Completed" : "Pending",
        type: "api",
      }));

      const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      const formattedLocal = localTasks.map((t) => ({
        ...t,
        type: "local",
      }));

      setTasks([...formattedLocal, ...apiTasks]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, status: "Completed" } : t,
    );

    setTasks(updated);

    const onlyLocal = updated.filter((t) => t.type === "local");
    localStorage.setItem("tasks", JSON.stringify(onlyLocal));
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);

    setTasks(updated);

    const onlyLocal = updated.filter((t) => t.type === "local");
    localStorage.setItem("tasks", JSON.stringify(onlyLocal));
  };

  const startEdit = (task) => {
    setEditTask(task);
  };

  const saveEdit = () => {
    const updated = tasks.map((t) => (t.id === editTask.id ? editTask : t));

    setTasks(updated);

    const onlyLocal = updated.filter((t) => t.type === "local");
    localStorage.setItem("tasks", JSON.stringify(onlyLocal));

    setEditTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" ? true : task.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-5">
            Tasks Page 
          </h1>

          <div className="bg-white p-4 rounded shadow mb-5">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Search Task..."
                className="border p-2 rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="border p-2 rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          {editTask && (
            <div className="bg-yellow-100 p-4 mb-5 rounded">
              <h2 className="font-bold mb-2">Edit Task</h2>

              <input
                className="border p-2 w-full mb-2"
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    title: e.target.value,
                  })
                }
              />

              <button
                onClick={saveEdit}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditTask(null)}
                className="ml-2 bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          )}

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {currentTasks.map((task) => (
                <div key={task.id} className="bg-white p-5 rounded shadow">
                  <h2 className="text-xl font-bold">{task.title}</h2>

                  <p>Status: {task.status}</p>
                  <p>Priority: {task.priority}</p>

                  <p className="text-sm text-gray-500">Type: {task.type}</p>

                  <div className="flex gap-2 mt-4">
                    {task.status !== "Completed" && (
                      <button
                        onClick={() => completeTask(task.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Complete
                      </button>
                    )}

                    {task.type === "local" && (
                      <button
                        onClick={() => startEdit(task)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-6 gap-2">
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
