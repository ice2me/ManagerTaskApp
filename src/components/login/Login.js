import React, {useContext} from 'react';
import google from '../../images/google.svg'
import './Login.css'
import {Context} from "../../index";
import firebase from "firebase/compat";

const Login = () => {
	const {auth} = useContext(Context)
	const login = async () => {
		const provider = new firebase.auth.GoogleAuthProvider()
		const {user} = await auth.signInWithPopup(provider)
	}
	return (
		<div className='login'>
			<h1 className='login-name'>
				Log in to your account
			</h1>
			<button className='login-button' onClick={login}>
				<img
					className='login-img'
					src={google}
					alt="google"
				/>
				Log in with Google
			</button>
		</div>
	);
};

export default Login;