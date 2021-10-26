import React, {useContext, useEffect} from "react";
import './App.css'
import {BrowserRouter, Link, Router, useHistory} from "react-router-dom";
import {AuthContext} from '../context/auth.context'
import {Context} from "../index";
import {useRoutes} from "../routes";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../components/loader/Loader";
import {useAuth} from "../hooks/auth.hook";


function App() {
	// const {token, login, logout} = useAuth();
	// console.log('token',token)
	
	
	const {auth} = useContext(Context)
	const [user, loading, error] = useAuthState(auth)
	const isAuthenticated = user && !!user.refreshToken;
	const routes = useRoutes(isAuthenticated);
	
	if (loading || error) {
		return <Loader />
	}
	return (
		<div className="App">
			<AuthContext.Provider
				value={{isAuthenticated, loading}}
				// value={{token, login, logout, isAuthenticated, loading}}
			>
				<BrowserRouter>
					<>{routes}</>
				</BrowserRouter>
			</AuthContext.Provider>
		</div>
	)
	
}

export default App;
