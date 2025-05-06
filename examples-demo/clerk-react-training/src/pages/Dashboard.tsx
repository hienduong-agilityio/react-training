import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <>
      <nav className="flex items-center justify-between bg-white shadow px-6 py-4">
        <Link className="text-xl font-semibold text-gray-800" to="#">
          Dashboard
        </Link>
        <UserButton />
      </nav>

      <main className="flex h-[75vh] w-full items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-700">User Dashboard</h1>
      </main>
    </>
  );
};

export default Dashboard;
