import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./components/login/Login";
import ManageScreen from "./components/manageScreen/ManageScreen";
import RoomsList from "./components/roomsList/RoomsList";
import Delegate from "./components/manageScreen/delegate/Delegate";
import Delete from "./components/manageScreen/delete/Delete";
import NoUrgently from "./components/manageScreen/noUrgently/NoUrgently";
import Urgently from "./components/manageScreen/urgently/Urgently";

export const useRoutes = (isAuthenticated) => {
	// console.log('isAuthenticated',isAuthenticated)
	if(isAuthenticated){
		return (
			<Switch>
				<Route path="/roomsList" component={RoomsList}/>
				<Route path='/manageScreen/:id' component={ManageScreen}/>
				<Route path="/delegate" component={Delegate}/>
				<Route path="/delete" component={Delete}/>
				<Route path="/noUrgently" component={NoUrgently}/>
				<Route path="/urgently" component={Urgently}/>
				<Redirect to="/roomsList" component={RoomsList} />
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