import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {
	Button,
	TextField,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
} from "@mui/material";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		mobile: "",
		address: "",
		role: "Employee",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3001/users", formData)
			.then(() => {
				alert("Registration successful");
				navigate("/");
			})
			.catch((error) => console.error("Error registering user:", error));
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<form className="space-y-4 w-80" onSubmit={handleSubmit}>
				<TextField
					fullWidth
					label="Name"
					name="name"
					variant="outlined"
					value={formData.name}
					onChange={handleChange}
				/>
				<TextField
					fullWidth
					label="Email"
					name="email"
					variant="outlined"
					value={formData.email}
					onChange={handleChange}
				/>
				<TextField
					fullWidth
					label="Password"
					name="password"
					type="password"
					variant="outlined"
					value={formData.password}
					onChange={handleChange}
				/>
				<TextField
					fullWidth
					label="Mobile No."
					name="mobile"
					variant="outlined"
					value={formData.mobile}
					onChange={handleChange}
				/>
				<TextField
					fullWidth
					label="Address"
					name="address"
					variant="outlined"
					value={formData.address}
					onChange={handleChange}
				/>
				<FormControl fullWidth>
					<InputLabel>Role</InputLabel>
					<Select name="role" value={formData.role} onChange={handleChange}>
						<MenuItem value="Admin">Admin</MenuItem>
						<MenuItem value="Employee">Employee</MenuItem>
					</Select>
				</FormControl>
				<Button fullWidth variant="contained" color="primary" type="submit">
					Register
				</Button>
			</form>
		</div>
	);
};

export default Register;
