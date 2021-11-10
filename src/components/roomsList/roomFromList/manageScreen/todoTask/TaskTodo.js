import React, {useState} from 'react';
import './TaskTodo.css'
import UserInfo from "../../../../userInfo/UserInfo";
import EditTaskForm from "./editTaskForm/EditTaskForm";
import Delete from '../../../../../images/trashIcon.svg'
import Edit from '../../../../../images/editIcon.svg'

const TaskTodo = ({
					  deleteTaskLine,
					  tasksList,
					  parentIdState,
					  urlForSaveTodoTask,
					  taskIdEdit,
					  editTask,
					  editTaskHandler,
					  editCloseTaskHandler
				  }) => {
	
	const [editTodoActive, setEditTodoActive] = useState('')
	
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
						return <div
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
									<p
										className="todo-task__title"
										title={`Status Task => ${task.statusProgress}`}
									>{task && task.statusProgress}
									</p>
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
					}
				)}
		</li>
	)
};
export default TaskTodo;