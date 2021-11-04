import React, {useCallback, useContext, useEffect, useState} from 'react';
import './manageScreen.css'
import {Router, useHistory, useLocation} from "react-router-dom";
import UserInfo from "../userInfo/UserInfo";
import Urgently from "./urgently/Urgently";
import Delegate from "./delegate/Delegate";
import NoUrgently from "./noUrgently/NoUrgently";
import Delete from "./delete/Delete";
import AddRoom from "../addRoom/AddRoom";
import {logDOM} from "@testing-library/react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../index";

const statusProgress = {statusProgress: 'finish'}

const ManageScreen = () => {
	const [urgentlyComponent, setUrgentlyComponent] = useState(false)
	const [noUrgentlyComponent, setNoUrgentlyComponent] = useState(false)
	// const [delegateComponent, setDelegateComponent] = useState(false)
	// const [deleteComponent, setDeleteComponent] = useState(false)
	const [statusFinishProgress, setStatusFinishProgress] = useState([])
	const [statusAnotherProgress, setStatusAnotherProgress] = useState([])
	const {firestore} = useContext(Context)
	const history = useHistory()
	const manageUri = useLocation()
	
	const customStringUrl = manageUri.pathname.split('/').slice(-2).join('/')
	const linkSaveTask = `roomTask/${customStringUrl}`
	
	const [tasksList = [], loading] = useCollectionData(firestore.collection(linkSaveTask).orderBy('taskId', 'desc'))
	
	
	const toggleUrl = (value) => {
		const url = manageUri.pathname ? `${manageUri.pathname}${value}` : '/manageScreen'
		return history.push(url)
	}
	
	const filterTasksList = () => {
		const resultAnother = tasksList.filter(item => {
			return item.statusProgress !== statusProgress.statusProgress
		})
		const resultFinish = tasksList.filter(item => {
			return item.statusProgress === statusProgress.statusProgress
		})
		return (setStatusAnotherProgress(resultAnother), setStatusFinishProgress(resultFinish))
	}
	const tasks = useCallback(() => {
		filterTasksList()
	}, [tasksList.length > 0])
	
	useEffect(() => {
		tasks()
	}, [tasksList.length > 0])
	
	console.log(statusAnotherProgress)
	
	const deleteTaskLine = (id) => {
		firestore.collection(linkSaveTask).doc(id).delete()
	}
	
	const closeTaskComponent = () => {
		history.goBack()
		setUrgentlyComponent(false)
		setNoUrgentlyComponent(false)
		// setDelegateComponent(false)
		// setDeleteComponent(false)
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
							toggleUrl('/urgently')
						}}
					>
						urgently
					</button>
					{urgentlyComponent && <Urgently
						statusFinishProgress={statusFinishProgress}
						statusAnotherProgress={statusAnotherProgress}
						linkSaveTask={linkSaveTask}
						loading={!loading}
						deleteTaskLine={deleteTaskLine}
						closeTaskComponent={closeTaskComponent}
						customStringUrl={customStringUrl}
					/>}
					{/*<button*/}
					{/*	className="manageScreen-link"*/}
					{/*	onClick={() => {*/}
					{/*		setDelegateComponent(true)*/}
					{/*		toggleUrl('/delegate')*/}
					{/*	}}*/}
					{/*>*/}
					{/*	Delegate*/}
					{/*</button>*/}
					{/*{delegateComponent && <Delegate*/}
					{/*	closeTaskComponent={closeTaskComponent}*/}
					{/*	customStringUrl={customStringUrl}*/}
					{/*/>}*/}
					<button
						className="manageScreen-link"
						onClick={() => {
							setNoUrgentlyComponent(true)
							toggleUrl('/noUrgently')
						}}
					>
						no urgently
					</button>
					{noUrgentlyComponent && <NoUrgently
						statusFinishProgress={statusFinishProgress}
						statusAnotherProgress={statusAnotherProgress}
						linkSaveTask={linkSaveTask}
						loading={!loading}
						deleteTaskLine={deleteTaskLine}
						closeTaskComponent={closeTaskComponent}
						customStringUrl={customStringUrl}
					/>}
					
					{/*<button*/}
					{/*	className="manageScreen-link"*/}
					{/*	onClick={() => {*/}
					{/*		setDeleteComponent(true)*/}
					{/*		toggleUrl('/delete')*/}
					{/*	}}*/}
					{/*>*/}
					{/*	Delete*/}
					{/*</button>*/}
					{/*{deleteComponent && <Delete*/}
					{/*	closeTaskComponent={closeTaskComponent}*/}
					{/*	customStringUrl={customStringUrl}*/}
					{/*/>}*/}
				
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