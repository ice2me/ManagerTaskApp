import React, {useState} from 'react';
import './TaskTodo.css'
import UserInfo from "../../../../userInfo/UserInfo";
import AddTaskForm from "./addTaskForm/AddTaskForm";

const TaskTodo = ({
					  deleteTaskLine,
					  tasksList,
					  showEditMenu
				  }) => {
	
	return (
		<li>
			{
				tasksList && tasksList.map(task => {
						return < div
							className="todo-task"
							key={task.taskId}
						>
							< div
								className="todo-task__wrapper"
							>
								< p
									className="todo-task__title"
								> {task.taskValue}
								</p>
								<div className="todo-task__progress">
									<select
										onChange={(e) => {
											// setValueSelect(e.target.value)
										}}
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
								className="todo-task__delete"
								onClick={() => {showEditMenu(task.taskId, task.taskValue, task.statusProgress)}}
							>
								edit
							</button>
							<button
								className="todo-task__delete"
								onClick={(() => {deleteTaskLine(task.taskId)})}
								disabled={!tasksList.length >= 1}
							>
								del
							</button>
						</div>
					}
				)}
		</li>
	)
};
export default TaskTodo;