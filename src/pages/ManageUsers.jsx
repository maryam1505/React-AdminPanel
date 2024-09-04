import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";
import feather from "feather-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    feather.replace();
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/users/get");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/users/delete/${id}`
      );
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        setError("Failed to delete user:", response.data);
      }
    } catch (error) {
      setError("Error deleting user:", error);
    }
  };


  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {(error)}</div>;
  
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Users</h2>
        <Link to={"/create_user"}>
          <button type="button" className="btn btn-primary">
            Add User
          </button>
        </Link>
      </div>
      <div className="table-responsive shadow-lg bg-white">
        <table className="table">
          <thead className="table-head">
            <tr className="text-white">
              <th scope="col" className="text-white">
                Sr. No.
              </th>
              <th scope="col" className="text-white">
                Profile
              </th>
              <th scope="col" className="text-white">
                Full Name
              </th>
              <th scope="col" className="text-white">
                Email
              </th>
              <th scope="col" className="text-white">
                Designation
              </th>
              <th scope="col" className="text-white">
                Department
              </th>
              <th scope="col" className="text-white">
                Status
              </th>
              <th scope="col" className="text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  {/* Sr. No */}
                  <td className="fw-bolder" scope="row">
                    {index + 1}
                  </td>
                  {/* Profile image */}
                  <td>
                    {" "}
                    <div className="size-3rem">
                      <img
                        src={`http://localhost:5001/uploads/${user.image}`}
                        alt={user.fname}
                        className="image-fluid image-size rounded-circle"
                      />
                    </div>
                  </td>
                  {/* F Name */}
                  <td>
                    {user.fname} {user.lname}
                  </td>
                  {/* Email */}
                  <td>{user.email}</td>
                  {/* Designation */}
                  <td>{user.designation}</td>
                  {/* Ddepartment */}
                  <td>{user.department}</td>
                  {/* Status */}
                  <td className="text-capitalize text-success">{user.status}</td>
                  {/* Action */}
                  <td>
                    <div className="d-flex gap-2 align-items-center">
                      {/* User Profile */}
                      <Link to={`/view_user/${user.id}`}>
                        <i
                          className="align-middle cursor-pointer text-dark"
                          data-feather="eye"
                        />
                      </Link>

                      {/* Edit User */}
                      <Link to={`/update_user/${user.id}`}>
                        <i
                          className="text-primary align-middle cursor-pointer"
                          data-feather="edit"
                        />
                      </Link>
                      {/* Delete User */}
                      <div onClick={() => confirmDelete(user.id)}>
                        <i
                          className="text-danger align-middle cursor-pointer"
                          data-feather="trash"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No users found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
