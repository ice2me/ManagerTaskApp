import React, { useContext, useState } from "react";
import './App.css';
import { useRoutes } from "./routes";
import { Context } from "./index";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./components/loader/Loader";
import { AuthContext } from "./context/auth.context";
import { BrowserRouter } from "react-router-dom";

function App() {
	const [switchedColorTheme, setSwitchedColorTheme] = useState(false)
	const switchTheme = (switched) => {
		setSwitchedColorTheme(switched)
	}
	
	const {auth} = useContext(Context)
	const [user, loading, error] = useAuthState(auth)
	const isAuthenticated = user && !!user.refreshToken;
	const routes = useRoutes(isAuthenticated);
	if (loading || error) {
		return <Loader />
	}
	return (
		<div className={
			// 'App'
			switchedColorTheme ? 'App light' : 'App'
		}>
			<AuthContext.Provider
				value={{isAuthenticated, loading, user, auth, switchTheme}}
			>
				<BrowserRouter>
					<>{routes}</>
				</BrowserRouter>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
