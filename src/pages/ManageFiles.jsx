import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import feather from "feather-icons";
import Loader from "../common/Loader";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ManageFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState(null);

  // Initilize Feature Icons
  useEffect(() => {
    feather.replace();
  }, []);

  // Fetch Files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:5001/files/get");
        setFiles(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // Fetching roles From Token
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userRoles = decodedToken.roles.map((role) => ({
          id: role.id,
          title: role.title,
        }));
        setRoles(userRoles);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

  }, []);

  const handleStatusChange = (newStatus, fileId, roleId) => {
    const ApiData = newStatus === "approved"
      ? { status: newStatus, role_id: roleId, user_id: userId }
      : { status: newStatus };
      
    // Call your API to update the status
    axios
      .put(`http://localhost:5001/files/update/${fileId}`, ApiData)
      .then((response) => {
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileId ? { ...file, status: newStatus } : file
          )
        );
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Failed to update status", error);
      });
  };

  if (loading) return <Loader />;
  if (error) return toast.error(error);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Files</h2>
        <Link to={"/upload_file"}>
          <button type="button" className="btn btn-primary">
            Upload File
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
                Preview
              </th>
              <th scope="col" className="text-white">
                File Name
              </th>
              <th scope="col" className="text-white">
                File Format
              </th>
              <th scope="col" className="text-white">
                Uploaded By
              </th>
              <th scope="col" className="text-white">
                Status
              </th>
              <th scope="col" className="text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {files.length > 0 ? (
              files.map((file, index) => (
                <tr key={file.id}>
                  <td className="fw-bolder" scope="row">
                    {index + 1}
                  </td>
                  <td>
                    <div className="size-3rem">
                      <img
                        src={`http://localhost:5001/${file.file_path}`}
                        alt={file.file_name}
                        className="image-fluid image-size rounded-2"
                      />
                    </div>
                  </td>
                  <td>{file.file_name}</td>
                  <td>{file.file_format}</td>
                  <td>{file.uploaded_by}</td>
                  {/* Status */}
                  <td
                    className={`text-capitalize ${
                      file.status === "pending"
                        ? "text-primary"
                        : file.status === "approved"
                        ? "text-success"
                        : file.status === "suspend"
                        ? "text-warning"
                        : "text-danger"
                    }`}
                  >
                    {file.status}
                  </td>
                  {/* Actions */}
                  <td>
                    <div className="d-flex gap-2 align-items-center">
                      {/* Update Status Icons */}
                      {roles.some((role) => role.title === "Admin") && (
                        <div className="d-flex gap-1 align-items-center">
                          {/* Pending Icon */}
                          <div
                            onClick={() =>
                              handleStatusChange("pending", file.id)
                            }
                            className={`${
                              file.status === "pending" && "d-none"
                            }`}
                          >
                            <i
                              className={`text-primary align-middle cursor-pointer ${
                                file.status === "pending" && "d-none"
                              }`}
                              data-feather="clock"
                              title="Mark as Pending"
                            />
                          </div>

                          {/* Approved Icon */}
                          {roles.map((role) => (
                            <div
                              key={role.id}
                              onClick={() =>
                                handleStatusChange("approved", file.id, role.id)
                              }
                              className={`${
                                file.status === "approved" && "d-none"
                              }`}
                            >
                              <i
                                className={`text-success align-middle cursor-pointer ${
                                  file.status === "approved" && "d-none"
                                }`}
                                data-feather="check-circle"
                                title={`Mark as Approved by ${role.title}`}
                              />
                            </div>
                          ))}

                          {/* Suspend Icon */}
                          <div
                            onClick={() =>
                              handleStatusChange("suspend", file.id)
                            }
                            className={`${
                              file.status === "suspend" && "d-none"
                            }`}
                          >
                            <i
                              className={`text-warning align-middle cursor-pointer ${
                                file.status === "suspend" && "d-none"
                              }`}
                              data-feather="alert-circle"
                              title="Mark as Suspend"
                            />
                          </div>

                          {/* Rejected Icon */}
                          <div
                            onClick={() =>
                              handleStatusChange("rejected", file.id)
                            }
                            className={`${
                              file.status === "rejected" && "d-none"
                            }`}
                          >
                            <i
                              className={`text-danger align-middle cursor-pointer ${
                                file.status === "rejected" && "d-none"
                              }`}
                              data-feather="x-circle"
                              title="Mark as Rejected"
                            />
                          </div>
                        </div>
                      )}

                      {/* Update File */}
                      <Link to={`/update_file/${file.id}`}>
                        <i
                          className="text-primary align-middle cursor-pointer"
                          data-feather="edit"
                        />
                      </Link>

                      {/* Delete File */}
                      <div>
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
                <td colSpan="7" className="text-center text-muted">
                  No files uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFiles;
