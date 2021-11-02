import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import '../urgently/Urgently.css'
import TodoTask from "../todoTask/TodoTask";
import exit from '../../../images/arrowExit.svg'
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../context/auth.context";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../../index";
import AddTaskForm from "../todoTask/addTaskForm/AddTaskForm";

const linkSaveTask = 'roomTask/1635853195348tworoom/noUrgently'

const NoUrgently = () => {
	const [taskListValue, setTaskListValue] = useState([])
	const [statusFinishProgress, setStatusFinishProgress] = useState([])
	const [statusAnotherProgress, setStatusAnotherProgress] = useState([])
	const [pushBlock, setPushBlock] = useState(false)
	const {user} = useContext(AuthContext)
	const history = useHistory()
	const {auth, firestore} = useContext(Context)
	
	
	const [tasksList = [], loading] = useCollectionData(
		firestore.collection(linkSaveTask).orderBy('taskId', 'desc')
	)
	
	const deleteTaskLine = (id) => {
		firestore.collection(linkSaveTask).doc(id).delete()
	}
	
	const resultFiltered = () => {
		const statusProgress = {statusProgress: 'finish'}
		const resultFinish = tasksList.filter(item => {
			return item.statusProgress === statusProgress.statusProgress
		})
		const resultAnother = tasksList.filter(item => {
			return item.statusProgress !== statusProgress.statusProgress
		})
		return (setStatusFinishProgress(resultFinish), setStatusAnotherProgress(resultAnother))
	}
	useEffect(() => {
		resultFiltered()
	}, [tasksList])
	
	const goBackButton = () => {
		history.goBack()
	}
	
	
	useEffect(async () => {
		await setTaskListValue(tasksList)
	}, [tasksList])
	
	
	const showPushBlock = () => {
		setPushBlock(true)
	}
	const closePushBlock = () => {
		setPushBlock(false)
	}
	
	useEffect(() => {}, [taskListValue])
	
	
	return (
		<div className="urgently">
			<div className="urgently-header">
				<button
					className="urgently-exit"
					onClick={goBackButton}
				>
					<img
						src={exit}
						alt="eit"
					/>
				</button>
				<h1 className="urgently-name">NoUrgently</h1>
			</div>
			<button
				style={{width: '80%', marginBottom: 20}}
				className="todo-task__delete"
				onClick={showPushBlock}
			>
				add new task
			</button>
			{pushBlock && <AddTaskForm
				closePushBlock={closePushBlock}
				linkForSave={linkSaveTask}
			/>}
			<ul className="urgently-ul__state">
				<TodoTask
					tasksList={statusAnotherProgress}
					deleteTaskLine={deleteTaskLine}
					loading={loading}
				/>
			</ul>
			<ul className="urgently-ul__finish">
				<TodoTask tasksList={statusFinishProgress} />
			</ul>
		</div>
	);
};

export default NoUrgently;