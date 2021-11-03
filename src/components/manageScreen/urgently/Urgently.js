import React, {useCallback, useContext, useEffect, useState} from 'react';
import './Urgently.css'
import TodoTask from "../todoTask/TodoTask";
import exit from '../../../images/arrowExit.svg'
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../../index";
import AddTaskForm from "../todoTask/addTaskForm/AddTaskForm";


const Urgently = ({closeTaskComponent, customStringUrl}) => {
	const [statusFinishProgress, setStatusFinishProgress] = useState([])
	const [statusAnotherProgress, setStatusAnotherProgress] = useState([])
	const [pushBlock, setPushBlock] = useState(false)
	const {firestore} = useContext(Context)
	const linkSaveTask = `roomTask/${customStringUrl}`
	
	
	const [tasksList = [], loading] = useCollectionData(
		firestore.collection(linkSaveTask).orderBy('taskId', 'desc')
	)
	
	const deleteTaskLine = (id) => {
		firestore.collection(linkSaveTask).doc(id).delete()
	}
	
	const resultFiltered = useCallback(() => {
		const statusProgress = {statusProgress: 'finish'}
		const resultFinish = tasksList.filter(item => {
			return item.statusProgress === statusProgress.statusProgress
		})
		const resultAnother = tasksList.filter(item => {
			return item.statusProgress !== statusProgress.statusProgress
		})
		return (setStatusFinishProgress(resultFinish), setStatusAnotherProgress(resultAnother))
	}, [tasksList])
	
	
	useEffect(() => {
		resultFiltered()
	}, [tasksList])
	
	
	const showPushBlock = () => {
		setPushBlock(true)
	}
	const closePushBlock = () => {
		setPushBlock(false)
	}
	
	return (
		<div className="urgently">
			<div className="urgently-header">
				<button
					className="urgently-exit"
					onClick={closeTaskComponent}
				>
					<img
						src={exit}
						alt="eit"
					/>
				</button>
				<h1 className="urgently-name">Urgently</h1>
			</div>
			{pushBlock
				?
				<AddTaskForm
					closePushBlock={closePushBlock}
					linkForSave={linkSaveTask}
				/>
				:
				<button
					style={{width: '80%', marginBottom: 20}}
					className="todo-task__delete"
					onClick={showPushBlock}
				>
					add new task
				</button>
			}
			<ul className="urgently-ul__state">
				<TodoTask
					tasksList={statusAnotherProgress}
					deleteTaskLine={deleteTaskLine}
					loading={loading}
					closePushBlock={closePushBlock}
					linkForSave={linkSaveTask}
				/>
			</ul>
			<ul className="urgently-ul__finish">
				<TodoTask tasksList={statusFinishProgress} />
			</ul>
		</div>
	);
};

export default Urgently;