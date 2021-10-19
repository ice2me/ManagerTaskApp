import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./components/login/Login";
import ManageScreen from "./components/manageScreen/ManageScreen";
import AddRoom from "./components/addRoom/AddRoom";
import RoomsList from "./components/roomsList/RoomsList";
import Delegate from "./components/manageScreen/delegate/Delegate";
import Delete from "./components/manageScreen/delete/Delete";
import NoUrgently from "./components/manageScreen/noUrgently/NoUrgently";
import Urgently from "./components/manageScreen/urgently/Urgently";

export const useRoutes = () => {
	return (
		<Switch>
			<Route path="/" exact component={Login}/>
			<Route path="/manageScreen" component={ManageScreen}/>
			{/*<Route path="/addRoom" component={AddRoom}/>*/}
			<Route path="/roomsList" component={RoomsList}/>
			<Route path="/delegate" component={Delegate}/>
			<Route path="/delete" component={Delete}/>
			<Route path="/noUrgently" component={NoUrgently}/>
			<Route path="/urgently" component={Urgently}/>
			<Redirect from='/' to='/' />
		</Switch>
	)
}