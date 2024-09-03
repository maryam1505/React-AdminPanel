import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({element: Component, ...rest }) => {
    // return <Component {...rest} />;
    return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/auth/login" />;
}

export default ProtectedRoute;