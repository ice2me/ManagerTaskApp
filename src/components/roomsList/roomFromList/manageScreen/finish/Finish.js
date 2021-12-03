import React, {useContext, useEffect, useState} from 'react';
import '../urgently/Urgently.css'
import exit from '../../../../../images/arrowExit.svg'
import Loader from "../../../../loader/Loader";
import UserInfo from "../../../../userInfo/UserInfo";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../../../../index";
import Delete from "../../../../../images/trashIcon.svg";

const statusProgress = {statusProgress: 'finish'}
const Finish = ({
	closeTaskComponent,
	deleteTaskLine,
	parentIdState,
}) => {
	const {firestore} = useContext(Context)
	const [statusFinishProgress, setStatusFinishProgress] = useState([])
	const [statusFinishProgressNo, setStatusFinishProgressNo] = useState([])
	const [updateDelete, setUpdateDelete] = useState(false)
	const [tasksListUrgently = [], loading] = useCollectionData(firestore.collection(`/roomTask/${parentIdState}/urgently`).orderBy('taskId', 'desc'))
	const [tasksListNoUrgently = []] = useCollectionData(firestore.collection(`/roomTask/${parentIdState}/noUrgently`).orderBy('taskId', 'desc'))
	const filterTasksList = () => {
		const resultFinishU = tasksListUrgently.filter(item => {
			return item.statusProgress === statusProgress.statusProgress
		})
		const resultFinishN = tasksListNoUrgently.filter(item => {
			return item.statusProgress === statusProgress.statusProgress
		})
		setStatusFinishProgress(resultFinishU)
		setStatusFinishProgressNo(resultFinishN)
	}
	useEffect(() => {
		if (!loading) filterTasksList()
		setUpdateDelete(true)
	}, [tasksListUrgently.length > 0, tasksListNoUrgently.length > 0])
	const allFinisTask = [...statusFinishProgress, ...statusFinishProgressNo]
	const teh = allFinisTask.map(item=> item.taskId)[0]
	const delTask = () => {
		firestore.collection(`/roomTask/${parentIdState}/urgently`).doc(teh).delete()
		firestore.collection(`/roomTask/${parentIdState}/noUrgently`).doc(teh).delete()
		setUpdateDelete(false)
	}
	useEffect(() => {
		setUpdateDelete(true)
	}, [updateDelete])
	return (
		<div className="urgently">
			<div className="urgently-header">
				<button
					className="urgently-exit"
					onClick={closeTaskComponent}
				>
					<img
						src={exit}
						alt="exit"
						title="Exit"
					/>
				</button>
				<h1 className="urgently-name">Finish</h1>
			</div>
			<h2 className="title-ul"></h2>
			<ul className="urgently-ul__finish">
				{!loading ? allFinisTask && allFinisTask.map(task => {
						return <li
							key={task.taskId}
							className="todo-task__container"
						>
							<div
								className="todo-task"
							>
								<div
									className="todo-task__wrapper"
								>
									<p
										className="todo-task__title"
										title={task.taskValue}
									> {task.taskValue}
									</p>
									<div className="todo-task__progress">
										<p
											className="todo-task__title todo-task__title-progress"
											title={`Status Task => ${task.statusProgress}`}
										>
											{task && task.statusProgress}
										</p>
									</div>
								</div>
								<div
									className="todo-task__wrapper"
								>
									<button
										className="todo-task__delete"
										title="Delete task"
										onClick={(async() => {
											delTask()
											setUpdateDelete(true)
										})}
									>
										<img
											src={Delete}
											alt="Delete"
										/>
									</button>
									<div className="todo-task__block">
										<UserInfo user={task.userAddTask} />
									</div>
								</div>
							</div>
						</li>
					}
				) : <Loader />}
			</ul>
		</div>
	)
		;
};

export default Finish;