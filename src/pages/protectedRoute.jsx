import React from "react";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children, isAuthenticated, role, requiredRole}) => {
	if (!isAuthenticated) {
		return <Navigate to="/" />;
	}
	if (requiredRole && role !== requiredRole) {
		return <Navigate to="/unauthorized" />;
	}
	return children;
};

export default ProtectedRoute;
