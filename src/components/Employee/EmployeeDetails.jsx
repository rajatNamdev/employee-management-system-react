import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
const EmployeeDetails = () => {
	const {id} = useParams();
	const [employee, setEmployee] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Fetch employee details from API
		axios
			.get(`http://localhost:3001/employees/${id}`)
			.then((response) => setEmployee(response.data))
			.catch((error) =>
				console.error("Error fetching employee details:", error)
			);
	}, [id]);

	const handleEdit = () => {
		axios
			.put(`http://localhost:3001/employees/${id}`, employee)
			.then(() => {
				alert("Employee details updated");
				navigate("/employees");
			})
			.catch((error) =>
				console.error("Error updating employee details:", error)
			);
	};

	if (!employee) return <div>Loading...</div>;

	return (
		<div className="space-y-4">
			<h2>Employee Details</h2>
			<TextField
				fullWidth
				label="Name"
				value={employee.name}
				onChange={(e) => setEmployee({...employee, name: e.target.value})}
			/>
			<TextField
				fullWidth
				label="Email"
				value={employee.email}
				onChange={(e) => setEmployee({...employee, email: e.target.value})}
			/>
			<TextField
				fullWidth
				label="Mobile No."
				value={employee.mobile}
				onChange={(e) => setEmployee({...employee, mobile: e.target.value})}
			/>
			<TextField
				fullWidth
				label="Address"
				value={employee.address}
				onChange={(e) => setEmployee({...employee, address: e.target.value})}
			/>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				onClick={handleEdit}
			>
				Save Changes
			</Button>
		</div>
	);
};

export default EmployeeDetails;
