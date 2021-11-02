import React, {useEffect, useState} from 'react';
import './TodoTask.css'
import Loader from "../../loader/Loader";
import UserInfo from "../../userInfo/UserInfo";

const TodoTask = ({deleteTaskLine, tasksList, loading}) => {
	const [valueSelect, setValueSelect] = useState()
	
	useEffect(() => {}, [valueSelect])
	
	//todo toggle loader-----------------------------------
	if (loading) {
		return <Loader />
	}
	return (
		<li>
			{
				tasksList && tasksList.map(task =>
					<div
						className="todo-task"
						key={task.taskId}
					>
						<div className="todo-task__wrapper">
							<p className="todo-task__title">{loading || task.taskValue}</p>
							<div className="todo-task__progress">
								<select
									onChange={e => setValueSelect(e.target.value)}
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
							onClick={(() => {deleteTaskLine(task.taskId)})}
							disabled={!tasksList.length >= 1}
						>
							del
						</button>
					</div>
				)}
		</li>
	)
};

export default TodoTask;