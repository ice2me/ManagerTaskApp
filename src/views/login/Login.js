import React, {useEffect} from 'react';
import google from '../../images/google.svg'
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
				<div className="login-wrapper">
					
					<button
						title="Log in with Google"
						onClick={() => {
							login()
						}}
					>
						<img
							className="login-img"
							src={google}
							alt="google"
						/>
					</button>
				</div>
			</div>
		</>
	);
};

export default Login;