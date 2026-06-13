import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await API.get("/todos");

      const formatted = res.data.slice(0, 40).map((t) => ({
        id: t.id,
        title: t.title,
        description: "API Task",
        priority: "Medium",
        dueDate: "N/A",
        status: t.completed ? "Completed" : "Pending",
      }));

      setTasks(formatted);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status: "Completed" } : task,
    );

    setTasks(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
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
          <h1 className="text-3xl font-bold mb-5">Tasks Page</h1>

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

          {loading ? (
            <p>Loading API data...</p>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-5">
                {currentTasks.map((task) => (
                  <div key={task.id} className="bg-white p-5 rounded shadow">
                    <h2 className="text-xl font-bold">{task.title}</h2>

                    <p className="mt-2">Status: {task.status}</p>

                    <p>Priority: {task.priority}</p>

                    <div className="flex gap-2 mt-4">
                      {task.status !== "Completed" && (
                        <button
                          onClick={() => completeTask(task.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Complete
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
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
