import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Dashboard from "./pages/Dashboard";
import ManageRoles from "./pages/ManageRoles";
import ManageUsers from "./pages/ManageUsers";
import CreateUser from "./pages/CreateUser";
import CreateRole from "./pages/CreateRole";
import UpdateUser from "./pages/UpdateUser";

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <div className="container-fluid p-0">
            <ToastContainer/>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/manage_roles" element={<ManageRoles />} />
              <Route path="/create_role" element={<CreateRole />} />
              <Route path="/manage_users" element={<ManageUsers />} />
              <Route path="/create_user" element={<CreateUser />} />
              <Route path="/update_user/:id" element={<UpdateUser />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
