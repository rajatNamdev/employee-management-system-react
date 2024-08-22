import React from "react";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Unauthorized = () => {
	const navigate = useNavigate();

	return (
		<div className="flex justify-center items-center h-screen flex-col">
			<h1 className="text-3xl mb-4">Unauthorized Access</h1>
			<Button variant="contained" color="primary" onClick={() => navigate("/")}>
				Go to Login
			</Button>
		</div>
	);
};

export default Unauthorized;
