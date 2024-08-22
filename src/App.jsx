import React, {useState, useEffect} from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDetails from "./components/Employee/EmployeeDetails";
import AddEmployee from "./components/Admin/AddEmployee";
import ProtectedRoute from "./pages/protectedRoute";
import Unauthorized from "./pages/Unauthorize";
import EmployeeList from "./components/Admin/EmployeeList";
import Navbar from "./components/Navbar";
import EmployeeForm from "./components/Admin/EmployeeForm";
const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userRole, setUserRole] = useState(null);

	useEffect(() => {
		// Check if the user is logged in (you might check localStorage or context)
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			setIsAuthenticated(true);
			setUserRole(user.role);
		}
	}, []);

	return (
		<>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<Login
								setIsAuthenticated={setIsAuthenticated}
								setUserRole={setUserRole}
							/>
						}
					/>
					<Route path="/register" element={<Register />} />
					<Route path="/employees" element={<EmployeeList />} />
					<Route path="/navBar" element={<Navbar />} />
					<Route path="/employeeForm/:id" element={<EmployeeForm />} />
					<Route
						path="/employee/:id"
						element={
							<ProtectedRoute
								isAuthenticated={isAuthenticated}
								role={userRole}
								requiredRole="Admin"
							>
								<EmployeeDetails />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/add-employee"
						element={
							<ProtectedRoute
								isAuthenticated={isAuthenticated}
								role={userRole}
								requiredRole="Admin"
							>
								<AddEmployee />
							</ProtectedRoute>
						}
					/>
					<Route path="/unauthorized" element={<Unauthorized />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
