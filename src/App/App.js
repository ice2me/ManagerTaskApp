import React, {useContext} from "react";
import './App.css'
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from '../context/auth.context'
import {Context} from "../index";
import {useRoutes} from "../routes";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../components/loader/Loader";

function App() {
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
				value={{isAuthenticated, loading, user, auth}}
			>
				<BrowserRouter>
					<>{routes}</>
				</BrowserRouter>
			</AuthContext.Provider>
		</div>
	)
}

export default App;
