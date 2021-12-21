import React, { useContext, useEffect, useState } from 'react';
import UserInfo from "../userInfo/UserInfo";
import AddTask from "../addTask/AddTask";
import Task from "../task/Task";
import { Context } from "../../index";
import { useCollectionData } from "react-firebase-hooks/firestore";
import EditTask from "../editTask/EditTask";

const ManageScreenTasks = ({ closeRoomModal, user, roomChecked }) => {
	const [showModalAddTask, setShowModalAddTask] = useState(false)
	const [showModalEditTask, setShowModalEditTask] = useState(false)
	const [editTodoActive, setEditTodoActive] = useState('')
	
	const { firestore } = useContext(Context)
	const tehUid = roomChecked.map(item => (
		item.uid
	))
	
	
	const [tasksList = [], loading] = useCollectionData(firestore.collection(`roomTask/${tehUid.toString()}/tasks`).orderBy('taskId', 'desc'))
	const [filteredTask, setFilteredTask] = useState(tasksList)
	
	
	useEffect(() => {
		setFilteredTask(tasksList)
	}, [tasksList])
	
	
	const toggleModalEditTask = (way) => {
		setShowModalEditTask(way)
	}
	const addValueInpAndSel = (id) => {
		const editTodoActive = tasksList.find(todo => todo.taskId === id)
		setEditTodoActive(editTodoActive)
	}
	const tasksListFilteredStatusProgress = (status) => {
		setFilteredTask(tasksList.filter(item => status === item.statusProgress))
	}
	
	const deleteTask = (id) => {
		firestore.collection(`roomTask/${tehUid.toString()}/tasks`).doc(id).delete()
	}
	
	const toggleModalAddTask = (way) => {
		setShowModalAddTask(way)
	}
	return (
		<div className="manageScreen">
			<div className="manageScreen__header">
				<h1 className="manageScreen__name">Tasks</h1>
				<div className="manageScreen__add-rooms">
					<button
						className="manageScreen__add-rooms__button"
						onClick={() => setShowModalAddTask(true)}
					>
						Add task
					</button>
					{showModalAddTask && <AddTask
						closeRoomModal={toggleModalAddTask}
					/>}
					{showModalEditTask && <EditTask
						closeRoomModal={toggleModalEditTask}
						editTodoActive={editTodoActive}
					/>}
				</div>
				<div className="manageScreen__filtered-rooms">
					<button
						onClick={() => setFilteredTask(tasksList)}
						title="all list task"
					>
						All
					</button>
					<button
						onClick={() => tasksListFilteredStatusProgress('wait')}
						title="wait list task"
					>
						Wait
					</button>
					<button
						onClick={() => tasksListFilteredStatusProgress('progress')}
						title="progress list task"
					>
						Progress
					</button>
					<button
						onClick={() => tasksListFilteredStatusProgress('finish')}
						title="finish list task"
					>
						Finish
					</button>
				</div>
			</div>
			<div className="manageScreen__body">
				<ul>
					{!loading && filteredTask.map(task => <Task
						deleteTask={deleteTask}
						task={task}
						key={task.taskId}
						id={task.taskId}
						toggleModalEditTask={toggleModalEditTask}
						addValueInpAndSel={addValueInpAndSel}
					/>)}
				</ul>
			</div>
			<div className="list-rooms__info">
				<button
					onClick={closeRoomModal}
				>
					Exit
				</button>
				<UserInfo userInfo={user} />
			</div>
		</div>
	);
};

export default ManageScreenTasks;