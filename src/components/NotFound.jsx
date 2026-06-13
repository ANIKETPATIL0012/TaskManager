import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">

      <h1 className="text-6xl font-bold">
        404
      </h1>

      <p className="mb-4">
        Page Not Found
      </p>

      <Link
        to="/dashboard"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go Dashboard
      </Link>

    </div>
  );
}