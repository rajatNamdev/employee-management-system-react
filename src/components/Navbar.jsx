import React, {useEffect, useState} from "react";
import * as Icon from "react-bootstrap-icons";
import {Link, useNavigate} from "react-router-dom";
const mystyle = {
	color: "white",
	backgroundColor: "black",
	padding: "10px",
};

const Navbar = () => {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState("");
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user.name) {
			setUserInfo(user);
		}
	}, []);

	const handleLogout = () => {
		// Clear user session (localStorage, context, etc.)
		localStorage.removeItem("user"); // or whatever key you use to store the token
		navigate("/login"); // Redirect to login page
	};
	return (
		<div>
			<nav
				className="bg-dark x.text-light border-gray-200 dark:bg-gray-900 navbar"
				style={mystyle}
			>
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<a
						href="https://flowbite.com/"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<img
							src="https://flowbite.com/docs/images/logo.svg"
							className="h-8"
							alt="Flowbite Logo"
						/>
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							EMS
						</span>
					</a>
					<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
						<Link component={Link} to={`/employeeForm/${userInfo.id}`}>
							{" "}
							<p className="text-white p-3">{userInfo.name}</p>
						</Link>

						<button
							type="button"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={handleLogout}
						>
							<Icon.ArrowRight />
							Logout
						</button>
						<button
							data-collapse-toggle="navbar-cta"
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="navbar-cta"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					</div>
					<div
						className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
						id="navbar-cta"
					></div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
