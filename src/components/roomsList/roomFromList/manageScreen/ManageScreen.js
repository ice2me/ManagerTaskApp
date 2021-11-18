import React, { useContext, useEffect, useState} from 'react';
import './ManageScreen.css'
import {Router, useHistory} from "react-router-dom";
import UserInfo from "../../../userInfo/UserInfo";
import Urgently from "./urgently/Urgently";
import NoUrgently from "./noUrgently/NoUrgently";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../../../index";

const statusProgress = {statusProgress: 'finish'}

const ManageScreen = ({parentIdState, closeUrgentlyModal}) => {
	const [statusFinishProgress, setStatusFinishProgress] = useState([])
	const [statusAnotherProgress, setStatusAnotherProgress] = useState([])
	
	const [urgentlyComponent, setUrgentlyComponent] = useState(false)
	const [noUrgentlyComponent, setNoUrgentlyComponent] = useState(false)
	
	const [urlForMangeTasks, setUrlForMangeTasks] = useState('/urgently')
	const {firestore} = useContext(Context)
	const history = useHistory()
	
	const urlBuild = (url) => {
		return setUrlForMangeTasks(`/roomTask/${parentIdState}${url}`)
	}
	
	const [tasksList = [], loading] = useCollectionData(firestore.collection(urlForMangeTasks).orderBy('taskId', 'desc'))
	
	const filterTasksList = () => {
		const resultAnother = tasksList.filter(item => {
			return item.statusProgress !== statusProgress.statusProgress
		})
		const resultFinish = tasksList.filter(item => {
			return item.statusProgress === statusProgress.statusProgress
		})
		setStatusAnotherProgress(resultAnother);
		setStatusFinishProgress(resultFinish)
	}
	
	useEffect(() => {
		if (!loading) filterTasksList()
	}, [tasksList])
	
	const deleteTaskLine = (taskId, url) => {
		firestore.collection(url).doc(taskId).delete()
	}
	
	const closeTaskComponent = () => {
		setUrgentlyComponent(false)
		setNoUrgentlyComponent(false)
		history.goBack()
	}
	
	return (
		<div className="manageScreen">
			<h1 className="manageScreen-name">Task management</h1>
			<Router history={history}>
				<div className="manageScreen-wrapper">
					<button
						className="manageScreen-link"
						title="Open urgently tasks list"
						onClick={() => {
							setUrgentlyComponent(true)
							urlBuild('/urgently')
						}}
					>
						urgently
					</button>
					{urgentlyComponent && <Urgently
						statusFinishProgress={statusFinishProgress}
						statusAnotherProgress={statusAnotherProgress}
						parentIdState={parentIdState}
						urlForSaveTodoTask={urlForMangeTasks}
						deleteTaskLine={deleteTaskLine}
						closeTaskComponent={closeTaskComponent}
						loading={loading}
					/>}
					<button
						className="manageScreen-link"
						title="Open no urgently tasks list"
						onClick={() => {
							setNoUrgentlyComponent(true)
							urlBuild('/noUrgently')
						}}
					>
						no urgently
					</button>
					{noUrgentlyComponent && <NoUrgently
						statusFinishProgress={statusFinishProgress}
						statusAnotherProgress={statusAnotherProgress}
						parentIdState={parentIdState}
						urlForSaveTodoTask={urlForMangeTasks}
						deleteTaskLine={deleteTaskLine}
						closeTaskComponent={closeTaskComponent}
						loading={loading}
					/>}
				</div>
			</Router>
			<div className="manageScreen-footer">
				<button
					className="manageScreen-exit"
					title="Go back"
					onClick={closeUrgentlyModal}
				>Go back
				</button>
				<UserInfo />
			</div>
		</div>
	);
};

export default ManageScreen;