import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import './ManageScreen.css'
import {Router, useHistory, useLocation} from "react-router-dom";
import UserInfo from "../../../userInfo/UserInfo";
import Urgently from "./urgently/Urgently";
import NoUrgently from "./noUrgently/NoUrgently";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../../../index";

const statusProgress = {statusProgress: 'finish'}

const ManageScreen = ({id, closeUrgentlyModal}) => {
	const [urgentlyComponent, setUrgentlyComponent] = useState(false)
	const [noUrgentlyComponent, setNoUrgentlyComponent] = useState(false)
	const [statusFinishProgress, setStatusFinishProgress] = useState([])
	const [statusAnotherProgress, setStatusAnotherProgress] = useState([])
	const [newData, setNewData] = useState(false)

	const {firestore} = useContext(Context)
	const history = useHistory()
	const manageUri = useLocation()
	
	const customStringUrl = manageUri.pathname.split('/').slice(-2).join('/')
	const linkSaveTask = `roomTask/${customStringUrl}`
	const [tasksList = [], loading] = useCollectionData(firestore.collection(linkSaveTask).orderBy('taskId', 'desc'))
	const setNewDataHandler = () => {
		// setNewData(true)
	}
	const toggleUrl = (value) => {
		const url = manageUri.pathname ? `${manageUri.pathname}${value}` : '/manageScreen'
		history.push(url)
		sessionStorage.setItem('url', url)
	}
	// const urgentlyHandler()
	const filterTasksList = () => {
		//
		const resultAnother = tasksList.filter(item => {
			return item.statusProgress !== statusProgress.statusProgress
		})
		const resultFinish = tasksList.filter(item => {
			return item.statusProgress === statusProgress.statusProgress
		})
		//
		setStatusAnotherProgress(resultAnother);
		setStatusFinishProgress(resultFinish)
	}
	
	useEffect(() => {
		if (!loading) filterTasksList()
	}, [tasksList])
	
	// useEffect(() => {
	// 	filterTasksList()
	// 	console.log('new data=============', tasksList)
	// }, [newData, setNewData, tasksList])
	//
	
	const deleteTaskLine = (id) => {
		firestore.collection(linkSaveTask).doc(id).delete()
	}
	
	const closeTaskComponent = () => {
		setUrgentlyComponent(false)
		history.goBack()
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
						// loading={!loading}
						deleteTaskLine={deleteTaskLine}
						closeTaskComponent={closeTaskComponent}
						// customStringUrl={customStringUrl}
					/>}
					<button
						className="manageScreen-link"
						onClick={() => {
							setNoUrgentlyComponent(true)
							// toggleUrl('/noUrgently')
						}}
					>
						no urgently
					</button>
					{noUrgentlyComponent && <NoUrgently
						// statusFinishProgress={statusFinishProgress}
						// statusAnotherProgress={statusAnotherProgress}
						// linkSaveTask={linkSaveTask}
						// loading={!loading}
						// deleteTaskLine={deleteTaskLine}
						// closeTaskComponent={closeTaskComponent}
						// customStringUrl={customStringUrl}
					/>}
				</div>
			</Router>
			<div className="manageScreen-footer">
				<button
					className="manageScreen-exit"
					onClick={closeUrgentlyModal}
				>exit
				</button>
				<UserInfo />
			</div>
		</div>
	);
};

export default ManageScreen;