import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";
import feather from "feather-icons";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

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
        console.error("Failed to delete user:", response.data);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  useEffect(() => {
    feather.replace();
  });

  const confirmDelete = (id) => {
    console.log("Delete confirmed for user:", id);
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(users)) {
    return <p>No Users Available.</p>;
  }
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
                ID
              </th>
              <th scope="col" className="text-white">
                Profile
              </th>
              <th scope="col" className="text-white">
                First Name
              </th>
              <th scope="col" className="text-white">
                Last Name
              </th>
              <th scope="col" className="text-white">
                Father/Husband Name
              </th>
              <th scope="col" className="text-white">
                Date of birth
              </th>
              <th scope="col" className="text-white">
                Age in Yrs
              </th>
              <th scope="col" className="text-white">
                Designation
              </th>
              <th scope="col" className="text-white">
                Department
              </th>
              <th scope="col" className="text-white">
                Country
              </th>
              <th scope="col" className="text-white">
                City
              </th>
              <th scope="col" className="text-white">
                Address
              </th>
              <th scope="col" className="text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
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
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.guardian}</td>
                  <td>{formatDate(user.dob)}</td>
                  <td>{user.age}</td>
                  <td>{user.designation}</td>
                  <td>{user.department}</td>
                  <td>{user.country}</td>
                  <td>{user.city}</td>
                  <td>{user.address}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to={`/update_user/${user.id}`}>
                        <i
                          className="text-primary align-middle cursor-pointer"
                          data-feather="edit"
                        />
                      </Link>
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
                <td colSpan="13" className="text-center text-muted">
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
