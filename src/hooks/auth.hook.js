import {useCallback, useEffect, useContext, useState} from 'react';
import firebase from "firebase/compat";
import {Context} from "../index";
import {useHistory} from "react-router-dom";

const storageName = 'userData';

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const navigate = useHistory()
	
	const {auth} = useContext(Context)
	
	const login = useCallback(async () => {
		const provider = new firebase.auth.GoogleAuthProvider()
		const {user} = await auth.signInWithPopup(provider)
		
		setToken(user.refreshToken)
		localStorage.setItem(storageName, JSON.stringify({
			userId: user.uid, token: user.refreshToken
		}))
		navigate.push('/rooms')
	}, [])
	
	const logout = useCallback(() => {
		setToken(null)
		auth.signOut()
		localStorage.removeItem(storageName);
	}, []);
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))
		data && setToken(data.token)
	}, [token, setToken, login])
	return {login, logout, token}
}