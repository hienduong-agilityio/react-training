import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Layout from "./layouts/Layout";
import UserLayout from "./layouts/UserLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SignedOut>
              <Layout />
            </SignedOut>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="register" element={""} />
        <Route
          path="dashboard"
          element={
            <SignedIn>
              <UserLayout />
            </SignedIn>
          }
        >
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
