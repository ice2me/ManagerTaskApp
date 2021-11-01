import React, {useCallback, useContext, useEffect, useState} from 'react';
import './Urgently.css'
import TodoTask from "../todoTask/TodoTask";
import exit from '../../../images/arrowExit.svg'
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../context/auth.context";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../../index";
import AddTaskForm from "../todoTask/addTaskForm/AddTaskForm";

const Urgently = () => {
	const [taskListValue, setTaskListValue] = useState([])
	const [pushBlock, setPushBlock] = useState(false)
	const {user} = useContext(AuthContext)
	const history = useHistory()
	
	const {auth, firestore} = useContext(Context)
	
	const [tasksList, loading] = useCollectionData(
		firestore.collection('roomTask/1635406920867threeroom/test').orderBy('taskId', 'desc')
	)
	
	
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
	// console.log('taskListValue', taskListValue)
	// const addNewTaskLineHandler = (value, valueSelect) => {
	// 	setAddNewTaskLine(addNewTaskLine.concat({
	// 		id: Date.now(),
	// 		task: value,
	// 		statusProgress: valueSelect,
	// 		user: user.displayName
	// 	}))
	// 	// console.log(addNewTaskLine)
	// }
	
	//
	// useEffect((value, valueSelect)=> {
	// 	setTaskListValue(taskListValue.concat({
	// 		id: Date.now(),
	// 		task: value,
	// 		statusProgress: valueSelect,
	// 		user: user.displayName
	// 	}))
	// }, [tasksList])
	
	useEffect(() => {}, [taskListValue])
	
	const deleteTaskLine = (id) => {
		firestore.collection('roomTask/1635406920867threeroom/test').doc(id).delete()
	}
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
				<h1 className="urgently-name">Urgently</h1>
			</div>
			<button
				style={{width: '80%', marginBottom: 20}}
				className="todo-task__delete"
				onClick={showPushBlock}
			>
				add new task
			</button>
			{pushBlock && <AddTaskForm closePushBlock={closePushBlock} />}
			<ul className="urgently-ul__state">
				<TodoTask
					tasksList={taskListValue}
					deleteTaskLine={deleteTaskLine}
					loading={loading}
				/>
			</ul>
			{/*<ul className="urgently-ul__finish">*/}
			{/*	<TodoTask />*/}
			{/*</ul>*/}
		</div>
	);
};

export default Urgently;