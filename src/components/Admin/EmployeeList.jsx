import React, {useState, useEffect} from "react";
import Navbar from "./../Navbar";
import axios from "axios";
import {
	Button,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TablePagination,
} from "@mui/material";
import {Edit, Delete} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";

const EmployeeList = () => {
	const [employees, setEmployees] = useState([]);
	const [rows, rowchange] = useState([]);
	const [page, pagechange] = useState(0);
	const [rowperpage, rowperpagechange] = useState(5);
	const navigate = useNavigate();

	const columns = [
		{id: "id", name: "Id"},
		{id: "name", name: "Name"},
		{id: "email", name: "Email"},
		{id: "mobile", name: "Phone"},
		{id: "edit", name: "Edit"},
		{id: "delete", name: "Delete"},
	];

	useEffect(() => {
		fetch("http://localhost:3001/employees")
			.then((resp) => resp.json())
			.then((resp) => {
				rowchange(resp);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);

	const handleDelete = (id) => {
		const user = localStorage.getItem("user"); // Save user to localStorage
		console.log("user", user);
		if (user.role !== "Admin") {
			navigate("/unauthorized");
			return;
		}
		axios
			.delete(`http://localhost:3001/employees/${id}`)
			.then(() => {
				setEmployees(employees.filter((employee) => employee.id !== id));
				rowchange(rows.filter((employee) => employee.id !== id));
			})
			.catch((error) => console.error("Error deleting employee:", error));
	};

	const handlechangepage = (event, newpage) => {
		pagechange(newpage);
	};

	const handleRowsPerPage = (event) => {
		rowperpagechange(+event.target.value);
		pagechange(0);
	};

	return (
		<div style={{textAlign: "center"}}>
			<Navbar />
			<h1>Employee List</h1>
			<Button
				variant="contained"
				color="primary"
				onClick={() => navigate("/add-employee")}
			>
				Add Employee
			</Button>
			<Paper sx={{width: "90%", marginLeft: "5%"}}>
				<TableContainer sx={{maxHeight: 450}}>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										style={{backgroundColor: "black", color: "white"}}
										key={column.id}
									>
										{column.name}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows &&
								rows
									.slice(page * rowperpage, page * rowperpage + rowperpage)
									.map((row, i) => {
										return (
											<TableRow key={i}>
												{columns &&
													columns.slice(0, -2).map((column, i) => {
														let value = row[column.id];
														return <TableCell key={value}>{value}</TableCell>;
													})}
												<TableCell>
													<IconButton
														component={Link}
														to={`/employee/${row.id}`}
													>
														<Edit />
													</IconButton>
												</TableCell>
												<TableCell>
													<IconButton
														onClick={() => handleDelete(row.id)}
														disb="true"
													>
														<Delete />
													</IconButton>
												</TableCell>
											</TableRow>
										);
									})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					rowsPerPage={rowperpage}
					page={page}
					count={rows.length}
					component="div"
					onPageChange={handlechangepage}
					onRowsPerPageChange={handleRowsPerPage}
				/>
			</Paper>
		</div>
	);
};

export default EmployeeList;
