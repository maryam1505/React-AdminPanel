import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import ManageRoles from "./pages/ManageRoles";
import ManageUsers from "./pages/ManageUsers";
import CreateUser from "./pages/CreateUser";
import CreateRole from "./pages/CreateRole";
import UpdateUser from "./pages/UpdateUser";
import ViewUser from "./pages/ViewUser";
import ManageFiles from "./pages/ManageFiles";
import Updatefile from "./pages/Updatefile";
import UploadFile from "./pages/UploadFile";
import Approvals from "./pages/Approvals";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="*"
          element={
            <div className="wrapper">
              <Sidebar />
              <div className="main">
                <Navbar />
                <main className="content">
                  <div className="container-fluid p-0">
                    <ToastContainer />
                    <Routes>
                      <Route
                        path="/"
                        element={<ProtectedRoute element={Dashboard} />}
                      />
                      <Route
                        path="/manage_roles"
                        element={<ProtectedRoute element={ManageRoles} />}
                      />
                      <Route
                        path="/create_role"
                        element={<ProtectedRoute element={CreateRole} />}
                      />
                      <Route
                        path="/manage_files"
                        element={<ProtectedRoute element={ManageFiles} />}
                      />
                      <Route
                        path="/upload_file"
                        element={<ProtectedRoute element={UploadFile} />}
                      />
                      <Route
                        path="/update_file/:id"
                        element={<ProtectedRoute element={Updatefile} />}
                      />
                      <Route
                        path="/approvals"
                        element={<ProtectedRoute element={Approvals} />}
                      />
                      <Route
                        path="/manage_users"
                        element={<ProtectedRoute element={ManageUsers} />}
                      />
                      <Route
                        path="/create_user"
                        element={<ProtectedRoute element={CreateUser} />}
                      />
                      <Route
                        path="/update_user/:id"
                        element={<ProtectedRoute element={UpdateUser} />}
                      />
                      <Route
                        path="/view_user/:id"
                        element={<ProtectedRoute element={ViewUser} />}
                      />
                    </Routes>
                  </div>
                </main>
                <Footer />
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
