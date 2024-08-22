import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import Navbar from "./../Navbar";
const AddEmployee = () => {
	const [employeeData, setEmployeeData] = useState({
		name: "",
		email: "",
		mobile: "",
		address: "",
		role: "Employee",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setEmployeeData({...employeeData, [e.target.name]: e.target.value});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3001/employees", employeeData)
			.then(() => {
				alert("Employee added successfully");
				navigate("/employees");
			})
			.catch((error) => console.error("Error adding employee:", error));
	};

	return (
		<>
			{" "}
			<Navbar />
			<div className="flex justify-center items-center h-screen">
				<form className="space-y-4 w-80" onSubmit={handleSubmit}>
					<TextField
						fullWidth
						label="Name"
						name="name"
						variant="outlined"
						value={employeeData.name}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Email"
						name="email"
						variant="outlined"
						value={employeeData.email}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Mobile No."
						name="mobile"
						variant="outlined"
						value={employeeData.mobile}
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						label="Address"
						name="address"
						variant="outlined"
						value={employeeData.address}
						onChange={handleChange}
					/>
					<Button fullWidth variant="contained" color="primary" type="submit">
						Add Employee
					</Button>
				</form>
			</div>
		</>
	);
};

export default AddEmployee;
