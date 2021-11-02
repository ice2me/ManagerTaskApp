import React, {useContext, useState} from 'react';
import './manageScreen.css'
import {Link, Router, useHistory} from "react-router-dom";
import {AuthContext, RoomContext} from "../../context/auth.context";
import UserInfo from "../userInfo/UserInfo";


const ManageScreen = ({id}) => {
	const {user, auth} = useContext(AuthContext)
	// console.log(id)
	// const {roomId, task, createdTask} = useContext(RoomContext)
	// console.log(roomId, task, createdTask)
	
	const history = useHistory()
	const goBackButton = () => {
		history.goBack()
	}
	
	return (
		<div className="manageScreen">
			<h1 className="manageScreen-name">Task management</h1>
			<Router history={history}>
				<div className="manageScreen-wrapper">
					<Link
						to="/urgently"
						className="manageScreen-link"
					>
						urgently
					</Link>
					<Link
						to="/delegate"
						className="manageScreen-link"
					>
						delegate
					</Link>
					<Link
						to="/noUrgently"
						className="manageScreen-link"
					>
						no urgently
					</Link>
					<Link
						to="/delete"
						className="manageScreen-link"
					>
						delete
					</Link>
				
				</div>
			</Router>
			<div className="manageScreen-footer">
				<button
					className="manageScreen-exit"
					onClick={goBackButton}
				>exit
				</button>
				<UserInfo/>
			</div>
		</div>
	)
		;
};

export default ManageScreen;