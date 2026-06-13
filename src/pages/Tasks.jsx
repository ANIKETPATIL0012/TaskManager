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
  const tasksPerPage = 6;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://jsonplaceholder.typicode.com/todos");

      const apiData = await res.json();

      const apiTasks = apiData.map((t) => ({
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status: "Completed" } : task,
    );

    setTasks(updated);

    const localOnly = updated.filter((task) => task.type === "local");

    localStorage.setItem("tasks", JSON.stringify(localOnly));
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);

    setTasks(updated);

    const localOnly = updated.filter((task) => task.type === "local");

    localStorage.setItem("tasks", JSON.stringify(localOnly));
  };

  const startEdit = (task) => {
    setEditTask(task);
  };

  const saveEdit = () => {
    const updated = tasks.map((task) =>
      task.id === editTask.id ? editTask : task,
    );

    setTasks(updated);

    const localOnly = updated.filter((task) => task.type === "local");

    localStorage.setItem("tasks", JSON.stringify(localOnly));

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
  const pagesPerGroup = 10;

  const startPage =
    Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;

  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  return (
    <div>
      <Navbar />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        <div className="flex-1 bg-gray-100 min-h-screen p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-5">Tasks</h1>

          {/* Search & Filter */}

          <div className="bg-white p-4 rounded-xl shadow mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Search Task..."
                className="border p-3 rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="border p-3 rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          {/* Edit Task */}

          {editTask && (
            <div className="bg-yellow-100 p-4 rounded-xl mb-5">
              <h2 className="font-bold mb-3">Edit Task</h2>

              <input
                className="border p-3 rounded w-full mb-3"
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    title: e.target.value,
                  })
                }
              />

              <div className="flex gap-2">
                <button
                  onClick={saveEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditTask(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {currentTasks.map((task) => (
                <div key={task.id} className="bg-white p-5 rounded-xl shadow">
                  <h2 className="text-lg font-bold mb-2">{task.title}</h2>

                  <p>
                    Status:
                    <span
                      className={`ml-2 font-medium ${
                        task.status === "Completed"
                          ? "text-green-600"
                          : "text-orange-500"
                      }`}
                    >
                      {task.status}
                    </span>
                  </p>

                  <p>Priority: {task.priority}</p>

                  <p className="text-sm text-gray-500">Type: {task.type}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {task.status !== "Completed" && (
                      <button
                        onClick={() => completeTask(task.id)}
                        className="bg-green-500 text-white px-3 py-2 rounded"
                      >
                        Complete
                      </button>
                    )}

                    {task.type === "local" && (
                      <button
                        onClick={() => startEdit(task)}
                        className="bg-blue-500 text-white px-3 py-2 rounded"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-2 mt-6">
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              disabled={startPage === 1}
              onClick={() =>
                setCurrentPage(Math.max(startPage - pagesPerGroup, 1))
              }
            >
              Prev
            </button>

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const page = startPage + i;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              className="px-3 py-1 bg-gray-300 rounded"
              disabled={endPage === totalPages}
              onClick={() =>
                setCurrentPage(Math.min(startPage + pagesPerGroup, totalPages))
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
