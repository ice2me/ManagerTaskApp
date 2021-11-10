import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./components/login/Login";
import ManageScreen from "./components/roomsList/roomFromList/manageScreen/ManageScreen";
import RoomsList from "./components/roomsList/RoomsList";
// import Delegate from "./components/manageScreen/delegate/Delegate";
// import Delete from "./components/manageScreen/delete/Delete";
import NoUrgently from "./components/roomsList/roomFromList/manageScreen/noUrgently/NoUrgently";
import Urgently from "./components/roomsList/roomFromList/manageScreen/urgently/UrgentlyCopy";

export const useRoutes = (isAuthenticated) => {
	// console.log('isAuthenticated',isAuthenticated)
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