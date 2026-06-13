

function SearchFilter({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  return (
    <div className="flex gap-4 mb-5 flex-wrap">
      <input
        type="text"
        placeholder="Search By Title"
        className="border p-2 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}/>

      <select
        className="border p-2 rounded"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}>

        <option value="all">All Status</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        
      </select>

      <select
        className="border p-2 rounded"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="all">All Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}

export default SearchFilter;
