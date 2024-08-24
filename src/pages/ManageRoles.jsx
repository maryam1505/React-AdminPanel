import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";
import feather from "feather-icons";
import { Link } from "react-router-dom";

const ManageRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    feather.replace();
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:5001/roles");
        setRoles(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const deleteRole = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/delete_role/${id}`);
      setRoles(roles.filter((role) => role.id !== id));
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      deleteRole(id);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Roles</h2>
        <Link to={"/create_role"}>
          <button type="button" className="btn btn-primary">
            Add Role
          </button>
        </Link>
      </div>
      <div className="shadow-lg">
        <table className="table table-responsive ">
          <thead className="table-head">
            <tr className="text-white">
              <th scope="col" className="text-white">
                ID
              </th>
              <th scope="col" className="text-white">
                Title
              </th>
              <th scope="col" className="text-white">
                Description
              </th>
              <th scope="col" className="text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {roles.length > 0 ? (
              roles.map((role) => (
                <tr key={role.id}>
                  <th scope="row"> {role.id} </th>
                  <td>{role.title}</td>
                  <td>{role.description}</td>
                  <td>
                    <div onClick={() => confirmDelete(role.id)}>
                      <i
                        className="text-danger align-middle cursor-pointer"
                        data-feather="trash"
                      ></i>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No roles found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoles;
