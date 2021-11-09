import React, {useContext, useEffect, useState} from 'react';
import './ManageScreen.css'
import {Router, useHistory} from "react-router-dom";
import UserInfo from "../../../userInfo/UserInfo";
import Urgently from "./urgently/Urgently";
import NoUrgently from "./noUrgently/NoUrgently";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../../../index";

const statusProgress = {statusProgress: 'finish'}

const ManageScreen = ({parentIdState, closeUrgentlyModal}) => {
	const [urgentlyComponent, setUrgentlyComponent] = useState(false)
	const [noUrgentlyComponent, setNoUrgentlyComponent] = useState(false)
	const [statusFinishProgress, setStatusFinishProgress] = useState([])
	const [statusAnotherProgress, setStatusAnotherProgress] = useState([])
	const {firestore} = useContext(Context)
	const history = useHistory()
	
	const urlForSaveTodoTask = `/roomTask/${parentIdState}/urgently`
	
	const [tasksList = [], loading] = useCollectionData(firestore.collection(urlForSaveTodoTask).orderBy('taskId', 'desc'))
	
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
	
	const deleteTaskLine = (taskId) => {
		firestore.collection(`/roomTask/${parentIdState}/urgently`).doc(taskId).delete()
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
						title='Open urgently tasks list'
						onClick={() => {
							setUrgentlyComponent(true)
						}}
					>
						urgently
					</button>
					{urgentlyComponent && <Urgently
						statusFinishProgress={statusFinishProgress}
						statusAnotherProgress={statusAnotherProgress}
						parentIdState={parentIdState}
						urlForSaveTodoTask={urlForSaveTodoTask}
						deleteTaskLine={deleteTaskLine}
						closeTaskComponent={closeTaskComponent}
					/>}
					<button
						className="manageScreen-link"
						title='Open no urgently tasks list'
						onClick={() => {
							setNoUrgentlyComponent(true)
						}}
					>
						no urgently
					</button>
					{noUrgentlyComponent && <NoUrgently
						statusFinishProgress={statusFinishProgress}
						statusAnotherProgress={statusAnotherProgress}
						parentIdState={parentIdState}
						urlForSaveTodoTask={urlForSaveTodoTask}
						deleteTaskLine={deleteTaskLine}
						closeTaskComponent={closeTaskComponent}
					/>}
				</div>
			</Router>
			<div className="manageScreen-footer">
				<button
					className="manageScreen-exit"
					title='Go back'
					onClick={closeUrgentlyModal}
				>Go back
				</button>
				<UserInfo />
			</div>
		</div>
	);
};

export default ManageScreen;