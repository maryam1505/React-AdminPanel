import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRole = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    title: Yup.string().required("Role Title is required"),
    description: Yup.string().required("Description is required"),
  });

  const initialValues = {
    title: "",
    description: "",
  };

  const handleSubmit = async (values) => {
    console.log("Submitting values:", values);
    try {
      const response = await axios.post(
        "http://localhost:5001/create_role",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      toast.success("Role created successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Response Error:", error.response.data);
        toast.error("Oops! Something went wrong");
      } else if (error.request) {
        console.error("Request Error:", error.request);
        toast.error("Oops! Something went wrong");
      } else {
        console.error("Error:", error.message);
        toast.error("Oops! Something went wrong");
      }
    } finally {
      navigate("/manage_roles");
    }
  };

  return (
    <div className="container col-6 bg-white shadow px-5 pb-4">
      <div className="d-flex justify-content-center align-items-center mb-4 pt-4">
        <h2 className="fw-bold">Create New Role</h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="row g-3" encType="multipart/form-data">
            <div className="col-12">
              <label
                htmlFor="title"
                className="form-label d-flex justify-content-between"
              >
                Title
                <ErrorMessage
                  name="title"
                  component="span"
                  className="text-danger small"
                />
              </label>
              <Field
                type="text"
                name="title"
                placeholder="Role title"
                className={`form-control ${
                 ( errors.title && touched.title) && "border-danger"
                }`}
              />
            </div>
            <div className="col-12">
              <label
                htmlFor="description"
                className="form-label d-flex justify-content-between"
              >
                Description
                <ErrorMessage
                  name="description"
                  component="span"
                  className="text-danger small"
                />
              </label>
              <Field
                as="textarea"
                name="description"
                placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Est qui odit suscipit."
                className={`form-control resize-none ${
                  (errors.description && touched.description) && "border-danger"
                }`}
              />
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary">
                Create Role
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateRole;
