import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const UploadFile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);

      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile) {
      toast.warning("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("uploaded_by", userId);

    try {
      const response = await axios.post(
        "http://localhost:5001/upload_file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("File uploaded successfully!");

        setFileName("");
        setFilePreview(null);
        setSelectedFile(null);

        navigate("/manage_files");
      } else {
        toast.error("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("There was an error uploading the file!", error);
      toast.error("There was an error uploading the file!");
    }
  };

  return (
    <div className="container col bg-white shadow px-5 pb-4">
      <div className="d-flex justify-content-center align-items-center mb-4 pt-4">
        <h2 className="fw-bold">Upload File</h2>
      </div>
      <div className="d-flex justify-content-center">
        <form action="" encType="multipart/form-data">
          <div className="file-canvas mb-5">
            <div
              className="file-cover h-100 w-100 cursor-pointer"
              onClick={handleClick}
            >
              {filePreview ? (
                <div className="text-center h-100 w-100">
                  <img
                    src={filePreview}
                    alt="File Preview"
                    className="img-fluid h-100 w-100 object-fit-cover"
                  />
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <p className="text-muted fs-2">
                    {fileName ? fileName : "Click Here to Upload File"}
                  </p>
                </div>
              )}
            </div>
          </div>
          <input
            type="file"
            className="d-none"
            id="uploadFile"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUploadFile}
            >
              Upload File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadFile;
