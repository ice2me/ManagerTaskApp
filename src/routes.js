import * as React from "react";
import Login from "./views/login/Login";
import RoomsList from "./views/listRooms/ListRooms";
import { Redirect, Route, Switch } from "react-router-dom";

export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route
					path="/rooms"
					component={RoomsList}
				/>
				<Redirect
					to="/rooms"
					component={RoomsList}
					exact
				/>
			</Switch>
		)
	} else {
		return (
			<Switch>
				<Route
					path="https://task-manager-42.herokuapp.com/"
					exact
					component={Login}
				/>
				<Redirect
					from="https://task-manager-42.herokuapp.com/"
					to="https://task-manager-42.herokuapp.com/"
				/>
			</Switch>
		)
	}
	
}