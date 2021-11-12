import React, {useContext, useEffect} from 'react';
import google from '../../images/google.svg'
import './Login.css'
import {useAuth} from "../../hooks/auth.hook";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../index";
import {AuthContext} from "../../context/auth.context";

const Login = () => {
	const {login, token} = useAuth();
	// const {user} = useContext(AuthContext)
	// const {firestore} = useContext(Context)
	
	useEffect(() => {localStorage.clear()}, [])
	
	// const [userEmail] = useCollectionData(firestore.collection('groupUsers').orderBy('createdAt', 'desc'))
	//
	// console.log(userEmail)
	// console.log(user)
	// const addDateNewUser = (id) => {
	// 	firestore.collection('groupUsers').doc(id).update({
	// 		createdAt: Date.now(),
	// 		userId: user.uid,
	// 		userEmail: user.email,
	// 		userName: user.displayName,
	// 		photoURL: user.photoURL
	// 	}).then(res => res)
	// }
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
				{/*{token && addDateNewUser('1636727347381ice2me1989@gmail.com')}*/}
			</div>
		</>
	
	);
};

export default Login;