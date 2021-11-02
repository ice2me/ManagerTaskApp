import React, {useCallback, useEffect, useState} from 'react';
import './manageScreen.css'
import {Router, useHistory, useLocation} from "react-router-dom";
import UserInfo from "../userInfo/UserInfo";
import Urgently from "./urgently/Urgently";
import Delegate from "./delegate/Delegate";
import NoUrgently from "./noUrgently/NoUrgently";
import Delete from "./delete/Delete";


const ManageScreen = () => {
	const [urgentlyComponent, setUrgentlyComponent] = useState(false)
	const [noUrgentlyComponent, setNoUrgentlyComponent] = useState(false)
	const [delegateComponent, setDelegateComponent] = useState(false)
	const [deleteComponent, setDeleteComponent] = useState(false)
	const history = useHistory()
	const manageUri = useLocation()
	
	// const pointUri = manageUri.pathname ? `${manageUri.pathname}/urgently` : '/manageScreen'
	
	const toggleUrl = (value) => {
		console.log(value)
		return manageUri.pathname ? `${manageUri.pathname}${value}` : '/manageScreen'
	}
	
	
	const customStringUrl = manageUri.pathname.split('/').slice(-2).join('/')
	
	
	
	const closeTaskComponent = () => {
		history.goBack()
		setUrgentlyComponent(false)
		setNoUrgentlyComponent(false)
		setDelegateComponent(false)
		setDeleteComponent(false)
		
	}
	return (
		<div className="manageScreen">
			<h1 className="manageScreen-name">Task management</h1>
			<Router history={history}>
				<div className="manageScreen-wrapper">
					<button
						className="manageScreen-link"
						onClick={() => {
							setUrgentlyComponent(true)
							history.push(`${manageUri.pathname}/urgently`)
							toggleUrl('/urgently')
						}}
					>
						urgently
					</button>
					{urgentlyComponent && <Urgently
						closeTaskComponent={closeTaskComponent}
						customStringUrl={customStringUrl}
					/>}
					<button
						className="manageScreen-link"
						onClick={() => {
							setDelegateComponent(true)
							history.push(`${manageUri.pathname}/delegate`)
							toggleUrl('/delegate')
						}}
					>
						Delegate
					</button>
					{delegateComponent && <Delegate
						closeTaskComponent={closeTaskComponent}
						customStringUrl={customStringUrl}
					/>}
					<button
						className="manageScreen-link"
						onClick={() => {
							setNoUrgentlyComponent(true)
							history.push(`${manageUri.pathname}/noUrgently`)
							toggleUrl('/noUrgently')
						}}
					>
						no urgently
					</button>
					{noUrgentlyComponent && <NoUrgently
						closeTaskComponent={closeTaskComponent}
						customStringUrl={customStringUrl}
					/>}
					
					<button
						className="manageScreen-link"
						onClick={() => {
							setDeleteComponent(true)
							history.push(`${manageUri.pathname}/delete`)
							toggleUrl('/delete')
						}}
					>
						Delete
					</button>
					{deleteComponent && <Delete
						closeTaskComponent={closeTaskComponent}
						customStringUrl={customStringUrl}
					/>}
				
				</div>
			</Router>
			<div className="manageScreen-footer">
				<button
					className="manageScreen-exit"
					onClick={() => history.goBack()}
				>exit
				</button>
				<UserInfo />
			</div>
		</div>
	)
		;
};

export default ManageScreen;