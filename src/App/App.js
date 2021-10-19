import React, {useContext} from "react";
import './App.css'
import {BrowserRouter, Link} from "react-router-dom";
import {Context} from "../index";
import {useRoutes} from "../routes";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../components/loader/Loader";
import RoomsList from "../components/roomsList/RoomsList";


function App() {
	const {auth} = useContext(Context)
	const routes = useRoutes()
	const [user, loading, error] = useAuthState(auth)
	
	const exitLogin = () => auth.signOut()
	
	if (loading) {
		return <Loader />
	}
	return user ?
		(
			<div className="App">
				<BrowserRouter>
					<RoomsList
						exitLogin={exitLogin}
						loginUserInfo={user}
					/>
				</BrowserRouter>
			</div>
		)
		:
		(
			<div className="App">
				<BrowserRouter>
					<div>{routes}</div>
				</BrowserRouter>
			</div>
		)
}

export default App;
