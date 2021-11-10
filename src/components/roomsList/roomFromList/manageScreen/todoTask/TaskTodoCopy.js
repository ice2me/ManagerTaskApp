import React, {useState} from 'react';
import './TaskTodo.css'
import UserInfo from "../../../../userInfo/UserInfo";
import EditTaskForm from "./editTaskForm/EditTaskForm";
import Delete from '../../../../../images/trashIcon.svg'
import Edit from '../../../../../images/editIcon.svg'
import {Draggable} from "react-beautiful-dnd";

const TaskTodo = ({
					  deleteTaskLine,
					  tasksList,
					  parentIdState,
					  urlForSaveTodoTask
				  }) => {
	const [editTask, setEditTask] = useState(false)
	const [taskIdEdit, setTaskIdEdit] = useState('')
	const [editTodoActive, setEditTodoActive] = useState('')
	
	const editTaskHandler = (id) => {
		setEditTask(true)
		setTaskIdEdit(id)
	}
	
	const editCloseTaskHandler = () => {
		setEditTask(false)
	}
	
	const addValueInpAndSel = (id) => {
		const editTodoActive = tasksList.find(todo => todo.taskId === id)
		setEditTodoActive(editTodoActive)
	}
	
	const getItemStyle = (isDragging, draggableStyle) => ({
		// some basic styles to make the items look a bit nicer
		userSelect: "none",
		
		// change background colour if dragging
		background: isDragging ? "#ffffff" : "transparent",
		boxShadow: isDragging ? "0px 4px 48px rgba(23, 6, 34, 0.16)" : "none",
		
		// styles we need to apply on draggables
		...draggableStyle
	});
	
	
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
				tasksList && tasksList.map((task, index) => {
						return <Draggable
							key={task.taskId}
							draggableId={task.taskId.toString()}
							index={index}
						>
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									style={getItemStyle(
										snapshot.isDragging,
										provided.draggableProps.style
									)}
								>
									<div
										className="todo-task"
										key={task.taskId}
									>
										< div
											className="todo-task__wrapper"
										>
											< p
												className="todo-task__title"
												title={task.taskValue}
											> {task.taskValue}
											</p>
											
											<div className="todo-task__progress">
												<select
													disabled={true}
													title={`Status Task => ${task.statusProgress}`}
													value={task && task.statusProgress}
												>
													<option value="waiting">
														Waiting
													</option>
													<option value="progress">
														Progress
													</option>
													<option value="finish">
														Finish
													</option>
												</select>
											</div>
										</div>
										<div className="todo-task__block">
											<UserInfo />
										</div>
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
										<button
											className="todo-task__delete"
											title="Delete task"
											onClick={(() => {
												deleteTaskLine(task.taskId, urlForSaveTodoTask)
											})}
											disabled={!tasksList.length >= 1}
										>
											<img
												src={Delete}
												alt="Delete"
											/>
										</button>
									</div>
								</div>
							)}
						</Draggable>
					}
				)}
		</li>
	)
};
export default TaskTodo;