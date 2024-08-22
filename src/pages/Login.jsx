import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, TextField} from "@mui/material";

const Login = ({setIsAuthenticated, setUserRole}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.get(`http://localhost:3001/users?email=${email}&password=${password}`)
			.then((response) => {
				if (response.data.length > 0) {
					const user = response.data[0];
					setIsAuthenticated(true);
					setUserRole(user.role);
					localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
					navigate("/employees");
				} else {
					alert("Invalid email or password");
				}
			})
			.catch((error) => console.error("Error logging in:", error));
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<form className="space-y-4 w-80" onSubmit={handleSubmit}>
				<TextField
					fullWidth
					label="Email"
					variant="outlined"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					fullWidth
					label="Password"
					variant="outlined"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button fullWidth variant="contained" color="primary" type="submit">
					Login
				</Button>
				<Button
					fullWidth
					variant="outlined"
					onClick={() => navigate("/register")}
				>
					Register
				</Button>
			</form>
		</div>
	);
};

export default Login;
