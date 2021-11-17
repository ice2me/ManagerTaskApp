import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./components/login/Login";
import RoomsList from "./components/roomsList/RoomsList";

export const useRoutes = (isAuthenticated) => {
	if(isAuthenticated){
		return (
			<Switch>
				<Route path="/roomsList" component={RoomsList}/>
				<Redirect to="/roomsList" component={RoomsList} exact/>
			</Switch>
		)
	}
	else{
		return (
		<Switch>
			<Route path="/" exact component={Login}/>
			<Redirect from='/' to='/' />
		</Switch>
		)
	}
	
}