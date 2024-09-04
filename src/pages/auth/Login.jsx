import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import jwt_decode from "jwt-decode";

// const token = localStorage.getItem("authToken");
// if (token) {
//   const decodedToken = jwt_decode(token);
//   console.log("User Roles:", decodedToken.roles);
// }

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:5001/auth/login", {
        email: values.email,
        password: values.password,
      });
      const { token } = response.data;
      localStorage.setItem("authToken", token);

      // Redirect to the dashboard
      navigate("/");
    } catch (error) {
      toast.error("Invalid Cridentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Welcome back!</h1>
                <p className="lead">Sign in to your account to continue</p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      validationSchema={LoginSchema}
                      onSubmit={handleSubmit} 
                    >
                      {({ isSubmitting, touched, errors }) => (
                        <Form>
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <Field
                              type="email"
                              name="email"
                              className={`form-control form-control-lg ${touched.email && errors.email && "border-danger mb-2"}`}
                              placeholder="Enter your email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="form-label">Password</label>
                            <Field
                              type="password"
                              name="password"
                              className={`form-control form-control-lg ${touched.password && errors.password && "border-danger mb-2"}`}
                              placeholder="Enter your password"
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="d-grid gap-2 mt-3">
                            <button
                              type="submit"
                              className="btn btn-lg btn-primary"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Signing in..." : "Sign in"}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
