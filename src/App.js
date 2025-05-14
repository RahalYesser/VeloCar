import { useEffect } from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

import Landing from "./views/Landing.js";
import Login from "./views/auth/Login.js";
import Register from "./views/auth/Register.js";
import Profile from "./views/Profile.js";
import New from "./views/New.js";
import Used from "./views/Used.js";
import Forum from "./views/Forum.js";
import Admin from "./layouts/Admin.js";
import Auth from "./layouts/Auth.js";
import Dashboard from "./views/admin/Dashboard.js";
import Contacts from "./views/admin/Contacts.js";
import Feedbacks from "./views/admin/Feedbacks.js";
import Cars from "./views/admin/Cars.js";
import Car from "./views/Car.js";
import AdminForum from "./views/admin/Forum.js";
import Settings from "./views/admin/Settings.js";
import Orders from "./views/admin/Orders.js";
import Users from "./views/admin/Users.js";
import AdminCategories from "./views/admin/Categories.js";

function App() {
  useEffect(() => {
    // Remove currentUser from localStorage when the window is closed
    const handleUnload = () => {
      localStorage.removeItem("currentUser");
    };

    // Event listener for unloading the window (i.e., closing the tab/window)
    window.addEventListener("unload", handleUnload);

    // Clean up event listener when the component is unmounted
    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/new" element={<New />} />
        <Route path="/used" element={<Used />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/car/:id" element={<Car />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="forum" element={<AdminForum />} />
          <Route path="feedbacks" element={<Feedbacks />} />
          <Route path="orders" element={<Orders />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="carsCategories" element={<AdminCategories />} />

          <Route path="cars" element={<Cars />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
