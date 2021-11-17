import React, {useEffect} from 'react';
import google from '../../images/google.svg'
import './Login.css'
import {useAuth} from "../../hooks/auth.hook";

const Login = () => {
	const {login} = useAuth();

	useEffect(() => {localStorage.clear()}, [])

	
	return (
		<>
			<div className="login">
				<h1 className="login-name">
					Log in to your account
				</h1>
				<button
					className="login-button"
					onClick={() => {
						login()
					}}
				>
					<img
						className="login-img"
						src={google}
						alt="google"
					/>
					Log in with Google
				</button>
			</div>
		</>
	
	);
};

export default Login;