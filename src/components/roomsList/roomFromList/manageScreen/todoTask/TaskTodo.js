import React, {useContext, useState} from 'react';
import './TaskTodo.css'
import UserInfo from "../../../../userInfo/UserInfo";
import EditTaskForm from "./editTaskForm/EditTaskForm";
import Delete from '../../../../../images/trashIcon.svg'
import Edit from '../../../../../images/editIcon.svg'
import {AuthContext} from "../../../../../context/auth.context";

const TaskTodo = ({
	deleteTaskLine,
	tasksList,
	parentIdState,
	urlForSaveTodoTask
}) => {
	const [editTodoActive, setEditTodoActive] = useState('')
	const {user} = useContext(AuthContext)
	const [editTask, setEditTask] = useState(false)
	const [taskIdEdit, setTaskIdEdit] = useState('')
	const editTaskHandler = (id) => {
		id && setEditTask(true)
		setTaskIdEdit(id)
	}
	const editCloseTaskHandler = () => {
		setEditTask(false)
	}
	const addValueInpAndSel = (id) => {
		const editTodoActive = tasksList.find(todo => todo.taskId === id)
		setEditTodoActive(editTodoActive)
	}
	return (
		<li>
			{editTask && <EditTaskForm
				editCloseTaskHandler={editCloseTaskHandler}
				parentIdState={parentIdState}
				urlForSaveTodoTask={urlForSaveTodoTask}
				taskIdEdit={taskIdEdit}
				editTodoActive={editTodoActive}
			/>}
			{
				tasksList && tasksList.map(task => {
						return (
							<div
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
											className="todo-task__edit"
											title="Edit task"
											onClick={() => {
												editTaskHandler(task.taskId)
												addValueInpAndSel(task.taskId)
											}}
										>
											<img
												src={Edit}
												alt="Edit"
											/>
										</button>
										{
											(user.email === task.userAddTask.email)
											&&
											<button
												className="todo-task__delete"
												title="Delete task"
												onClick={(() => {
													deleteTaskLine(task.taskId, urlForSaveTodoTask, task.userAddTask)
												})}
												disabled={!tasksList.length >= 1}
											>
												<img
													src={Delete}
													alt="Delete"
												/>
											</button>
										}
										<div className="todo-task__block">
											<UserInfo user={task.userAddTask} />
										</div>
									</div>
								</div>
							</div>
						)
					}
				)}
		</li>
	)
};
export default TaskTodo;