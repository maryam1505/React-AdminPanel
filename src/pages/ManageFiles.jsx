import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import feather from "feather-icons";
import Loader from "../common/Loader";
import axios from "axios";

const ManageFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    feather.replace();
  });

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:5001/files");
        setFiles(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

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
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {files.length > 0 ? (
              files.map((file, index) => (
                <tr key={file.id}>
                  <td className="fw-bolder" scope="row">{index + 1}</td>
                  <td></td>
                  <td>{file.file_name}</td>
                  <td>{file.file_format}</td>
                  <td>{file.uploaded_by}</td>
                  <td className="text-capitalize text-success">{file.status}</td>
                  <td>action</td>
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
