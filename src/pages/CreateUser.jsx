import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const CreateUser = () => {
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);
  /* Form Validation using Formik and Yup */
  const formik = useFormik({
    initialValues: {
      profilePic: null,
      fname: "",
      lname: "",
      guardian: "",
      age: "",
      dob: "",
      designation: "",
      department: "",
      country: "",
      city: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      profilePic: Yup.mixed()
        .required("Profile picture is required")
        .test(
          "fileType",
          "Unsupported file format",
          (value) =>
            !value ||
            (value &&
              ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(
                value.type
              ))
        ),
      fname: Yup.string().required("First name is required"),
      lname: Yup.string().required("Last name is required"),
      guardian: Yup.string().required("Guardian name is required"),
      age: Yup.number()
        .min(1, "Age must be greater than zero")
        .required("Age is required"),
      dob: Yup.date().required("Date of birth is required"),
      designation: Yup.string().required("Designation is required"),
      department: Yup.string().required("Department is required"),
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
      address: Yup.string().required("Address is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();
      formData.append("image", values.profilePic);
      formData.append("fname", values.fname);
      formData.append("lname", values.lname);
      formData.append("guardian", values.guardian);
      formData.append("age", values.age);
      formData.append("dob", values.dob);
      formData.append("designation", values.designation);
      formData.append("department", values.department);
      formData.append("country", values.country);
      formData.append("city", values.city);
      formData.append("address", values.address);
      formData.append("email", values.email);
      formData.append("password", values.password);

      try {
        const response = await axios.post(
          "http://localhost:5001/users/create",
          formData
        );
        console.log("User created successfully:", response.data);
        toast.success("User created successfully!");
        resetForm();
        setProfilePic(null);
      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("Failed to create user.");
      } finally {
        setSubmitting(false);
        navigate("/manage_users");
      }
    },
  });

  /* File change Handler */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("profilePic", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container col- bg-white shadow px-5 pb-4">
      <div className="d-flex justify-content-center align-items-center mb-4 pt-4">
        <h2 className="fw-bold">Create New User</h2>
      </div>
      <form
        className="row g-3"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        {/* Profile Pic */}
        <div className="col-12 mb-3 d-flex justify-content-center align-items-center flex-column">
          <div className="size-7rem mb-2">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="image-size rounded-circle"
              />
            ) : (
              <svg
                className="image-size"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            id="profilePic"
            className="d-none"
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`btn btn-light mb-2 ${
              formik.touched.profilePic && formik.errors.profilePic
                ? "border-danger"
                : "border"
            }`}
            onClick={() => document.getElementById("profilePic").click()}
          >
            Change
          </button>
          {formik.touched.profilePic && formik.errors.profilePic && (
            <div className="text-danger small">{formik.errors.profilePic}</div>
          )}
        </div>

        {/* Personal Info */}
        <div className="col-md-6">
          <label
            htmlFor="fname"
            className="form-label d-flex justify-content-between"
          >
            First Name{" "}
            {formik.touched.fname && formik.errors.fname && (
              <span className="text-danger small">{formik.errors.fname}</span>
            )}
          </label>
          <input
            type="text"
            id="fname"
            placeholder="Abc"
            className={`form-control ${
              formik.touched.fname && formik.errors.fname && "border-danger"
            }`}
            {...formik.getFieldProps("fname")}
          />
        </div>
        <div className="col-md-6">
          <label
            htmlFor="lname"
            className="form-label d-flex justify-content-between"
          >
            Last Name
            {formik.touched.lname && formik.errors.lname && (
              <span className="text-danger small">{formik.errors.lname}</span>
            )}
          </label>
          <input
            type="text"
            id="lname"
            placeholder="Xyz"
            className={`form-control ${
              formik.touched.lname && formik.errors.lname && "border-danger"
            }`}
            {...formik.getFieldProps("lname")}
          />
        </div>
        <div className="col-6">
          <label
            htmlFor="guardian"
            className="form-label d-flex justify-content-between"
          >
            <div>
              Guardian Name{" "}
              <span className="text-muted text-sm">(Father / Husband)</span>
            </div>
            {formik.touched.guardian && formik.errors.guardian && (
              <span className="text-danger small">
                {formik.errors.guardian}
              </span>
            )}
          </label>
          <input
            type="text"
            id="guardian"
            placeholder="Guardian Name"
            className={`form-control ${
              formik.touched.guardian &&
              formik.errors.guardian &&
              "border-danger"
            }`}
            {...formik.getFieldProps("guardian")}
          />
        </div>
        <div className="col-6">
          <label
            htmlFor="email"
            className="form-label d-flex justify-content-between"
          >
            <div>Email</div>
            {formik.touched.email && formik.errors.email && (
              <span className="text-danger small">{formik.errors.email}</span>
            )}
          </label>
          <input
            type="email"
            id="email"
            placeholder="user@gmail.com"
            className={`form-control ${
              formik.touched.email && formik.errors.email && "border-danger"
            }`}
            {...formik.getFieldProps("email")}
          />
        </div>
        
        <div className="col-6">
          <label
            htmlFor="password"
            className="form-label d-flex justify-content-between"
          >
            <div>Password</div>
            {formik.touched.password && formik.errors.password && (
              <span className="text-danger small">
                {formik.errors.password}
              </span>
            )}
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className={`form-control ${
              formik.touched.password &&
              formik.errors.password &&
              "border-danger"
            }`}
            {...formik.getFieldProps("password")}
          />
        </div>

        <div className="col-6">
          <label
            htmlFor="confirmPassword"
            className="form-label d-flex justify-content-between"
          >
            <div>Confirm Password</div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <span className="text-danger small">
                  {formik.errors.confirmPassword}
                </span>
              )}
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            className={`form-control ${
              formik.touched.confirmPassword &&
              formik.errors.confirmPassword &&
              "border-danger"
            }`}
            {...formik.getFieldProps("confirmPassword")}
          />
        </div>

        <div className="col-md-6">
          <label
            htmlFor="age"
            className="form-label d-flex justify-content-between"
          >
            Age
            {formik.touched.age && formik.errors.age && (
              <span className="text-danger small">{formik.errors.age}</span>
            )}
          </label>
          <input
            type="number"
            id="age"
            placeholder="12"
            className={`form-control ${
              formik.touched.age && formik.errors.age && "border-danger"
            }`}
            {...formik.getFieldProps("age")}
          />
        </div>
        <div className="col-md-6">
          <label
            htmlFor="dob"
            className="form-label d-flex justify-content-between"
          >
            Date of Birth
            {formik.touched.dob && formik.errors.dob && (
              <span className="text-danger small">{formik.errors.dob}</span>
            )}
          </label>
          <input
            type="date"
            id="dob"
            className={`form-control ${
              formik.touched.dob && formik.errors.dob && "border-danger"
            }`}
            {...formik.getFieldProps("dob")}
          />
        </div>
        <div className="col-md-6">
          <label
            htmlFor="designation"
            className="form-label d-flex justify-content-between"
          >
            Designation
            {formik.touched.designation && formik.errors.designation && (
              <span className="text-danger small">
                {formik.errors.designation}
              </span>
            )}
          </label>
          <input
            type="text"
            id="designation"
            placeholder="Designation"
            className={`form-control ${
              formik.touched.designation &&
              formik.errors.designation &&
              "border-danger"
            }`}
            {...formik.getFieldProps("designation")}
          />
        </div>
        <div className="col-6">
          <label
            htmlFor="department"
            className="form-label d-flex justify-content-between"
          >
            Department
            {formik.touched.department && formik.errors.department && (
              <span className="text-danger small">
                {formik.errors.department}
              </span>
            )}
          </label>
          <input
            type="text"
            id="department"
            placeholder="Department"
            className={`form-control ${
              formik.touched.department &&
              formik.errors.department &&
              "border-danger"
            }`}
            {...formik.getFieldProps("department")}
          />
        </div>

        {/* Location */}
        <div className="col-6">
          <label
            htmlFor="country"
            className="form-label d-flex justify-content-between"
          >
            Country
            {formik.touched.country && formik.errors.country && (
              <span className="text-danger small">{formik.errors.country}</span>
            )}
          </label>
          <input
            type="text"
            id="country"
            placeholder="Country"
            className={`form-control ${
              formik.touched.country && formik.errors.country && "border-danger"
            }`}
            {...formik.getFieldProps("country")}
          />
        </div>
        <div className="col-6">
          <label
            htmlFor="city"
            className="form-label d-flex justify-content-between"
          >
            City
            {formik.touched.city && formik.errors.city && (
              <span className="text-danger small">{formik.errors.city}</span>
            )}
          </label>
          <input
            type="text"
            id="city"
            placeholder="City"
            className={`form-control ${
              formik.touched.city && formik.errors.city && "border-danger"
            }`}
            {...formik.getFieldProps("city")}
          />
        </div>
        <div className="col-12">
          <label
            htmlFor="address"
            className="form-label d-flex justify-content-between"
          >
            Address
            {formik.touched.address && formik.errors.address && (
              <span className="text-danger small">{formik.errors.address}</span>
            )}
          </label>
          <textarea
            type="text"
            id="address"
            placeholder="Your Address"
            className={`form-control resize-none ${
              formik.touched.address && formik.errors.address && "border-danger"
            }`}
            {...formik.getFieldProps("address")}
          />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
