import React, { useContext } from 'react';
import trashIcon from '../../images/trashIcon.svg'
import editTask from '../../images/editTaskIcon.svg'
import userPhoto from "../../images/user.png";
import { AuthContext } from "../../context/auth.context";

const Task = ({ task, deleteTask, id, toggleModalEditTask, addValueInpAndSel }) => {
	const { user } = useContext(AuthContext)
	return (
		<li className="manageScreen__body-li">
			<p title={task.taskValue}>
				{task.taskValue}
			</p>
			<span>
				{task.statusProgress}
			</span>
			<div className="manageScreen__body-li__buttons">
				<button
					className="manageScreen__body-li__addUser type"
					title="edit task"
					onClick={() => {
						toggleModalEditTask(true)
						addValueInpAndSel(id)
					}}
				>
					<img
						src={editTask}
						alt="edit task"
					/>
				</button>
				{
					!(user.email === task.userAddTask.email) ? <button
						className="manageScreen__body-li__delete type hide"
					>
						<img
							src={trashIcon}
							alt="delete"
						/>
					</button> : <button
						className="manageScreen__body-li__delete type"
						onClick={() => deleteTask(id)}
						title="delete task"
					>
						<img
							src={trashIcon}
							alt="delete"
						/>
					</button>
				}
				<div
					className="manageScreen__body-li__user"
					title={`${task.userAddTask.displayName} add this task`}
				>
					<img
						src={task.userAddTask.photoURL ? task.userAddTask.photoURL : userPhoto}
						alt="AV"
					/>
					<div className="manageScreen__body-li__edit">
						<div>
							<span>add task: {task.userAddTask.displayName}</span>
							<img
								src={task.userAddTask.photoURL ? task.userAddTask.photoURL : userPhoto}
								alt="AV"
							/>
						</div>
						<div>
							<span>edit task: {task.userEditTask.displayName ? task.userEditTask.displayName : '-'}</span>
							<img
								src={task.userEditTask.photoURL ? task.userEditTask.photoURL : userPhoto}
								alt="AV"
							/>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export default Task;