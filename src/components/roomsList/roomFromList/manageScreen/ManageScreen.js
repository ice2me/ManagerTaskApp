import React, {useContext, useEffect, useState} from 'react';
import './ManageScreen.css'
import {Router, useHistory} from "react-router-dom";
import UserInfo from "../../../userInfo/UserInfo";
import Urgently from "./urgently/Urgently";
import NoUrgently from "./noUrgently/NoUrgently";
import Finish from "./finish/Finish";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../../../index";
import {AuthContext} from "../../../../context/auth.context";
import exit from "../../../../images/exit.svg";

const statusProgress = {statusProgress: 'finish'}

const ManageScreen = ({parentIdState, closeUrgentlyModal}) => {
	const [statusFinishProgress, setStatusFinishProgress] = useState([])
	const [statusAnotherProgress, setStatusAnotherProgress] = useState([])
	const [pushFinishProgress, setPushFinishProgress] = useState(false)
	const [urgentlyComponent, setUrgentlyComponent] = useState(false)
	const [noUrgentlyComponent, setNoUrgentlyComponent] = useState(false)
	const [finish, setFinish] = useState(false)
	const [urlForMangeTasks, setUrlForMangeTasks] = useState('/urgently')
	const {firestore} = useContext(Context)
	const history = useHistory()
	const {user} = useContext(AuthContext)
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
	const deleteTaskLine = (taskId, url, userInf = '') => {
		console.log(url, taskId, userInf)
		if ((user.email || user.displayName) === (userInf.email || userInf.displayName)) {
			firestore.collection(url).doc(taskId).delete()
		}
	}
	const closeTaskComponent = () => {
		setUrgentlyComponent(false)
		setNoUrgentlyComponent(false)
		setFinish(false)
		history.goBack()
	}
	
	useEffect(() => {
		urlBuild('/urgently')
		setPushFinishProgress(true)
	}, [loading])
	useEffect(() => {
		urlBuild('/noUrgently')
		setPushFinishProgress(true)
	}, [pushFinishProgress])
	return (
		<div className="manageScreen">
			<h1 className="manageScreen-name">Task management</h1>
			<Router history={history}>
				<div className="manageScreen-wrapper">
					<button
						className="manageScreen-link__urgently"
						title="Open urgently tasks list"
						onClick={() => {
							setUrgentlyComponent(true)
							urlBuild('/urgently')
						}}
					>
						urgently
					</button>
					{urgentlyComponent && <Urgently
						statusAnotherProgress={statusAnotherProgress}
						parentIdState={parentIdState}
						urlForSaveTodoTask={urlForMangeTasks}
						deleteTaskLine={deleteTaskLine}
						closeTaskComponent={closeTaskComponent}
						loading={loading}
					/>}
					<button
						className="manageScreen-link__nourgently"
						title="Open no urgently tasks list"
						onClick={() => {
							setNoUrgentlyComponent(true)
							urlBuild('/noUrgently')
						}}
					>
						no urgently
					</button>
					{noUrgentlyComponent && <NoUrgently
						statusAnotherProgress={statusAnotherProgress}
						parentIdState={parentIdState}
						urlForSaveTodoTask={urlForMangeTasks}
						deleteTaskLine={deleteTaskLine}
						closeTaskComponent={closeTaskComponent}
						loading={loading}
					/>}
				</div>
				<div className="manageScreen-wrapper">
					<button
						className="manageScreen-link__finish"
						title="Open urgently tasks list"
						onClick={() => {
							setFinish(true)
							
						}}
					>
						finish
					</button>
					{finish && <Finish
						statusFinishProgress={statusFinishProgress}
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
					<img
						src={exit}
						alt="exit"
					/>
				</button>
				<UserInfo user={user} />
			</div>
		</div>
	);
};

export default ManageScreen;